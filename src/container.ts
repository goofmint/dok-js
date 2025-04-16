import Base from "./base";
import { ContainerJson } from "./container.d";
import Http, { HttpJson } from "./http";
import { DokPaln } from "./dok.d";

class Container extends Base {
  index: number | null = null;
  image: string | null = null;
  registry: string | null = null;
  command: string[] = [];
  entrypoint: string[] = [];
  environment: {[key: string]: string} = {};
  http: Http | null = null;
  plan: DokPaln | null = null;
  exitCode: number | null = null;
  executionSeconds: number | null = null;
  startAt: Date | null = null;
  endAt: Date | null = null;
  stopAt: Date | null = null;

  constructor(json?: ContainerJson) {
    super();
    if (json) {
      this.sets(json);
    }
  }

  sets(json: ContainerJson): Container {
    Object.entries(json).forEach(([key, value]) => {
      this.set(key, value);
    });
    return this;
  }

  set(key: string, value: any): Container {
    switch (key) {
      case "index":
        if (typeof value === "number") {
          this.index = value;
        }
        break;
      case "image":
        if (typeof value === "string") {
          this.image = value;
        }
        break;
      case "registry":
        if (typeof value === "string") {
          this.registry = value;
        }
        break;
      case "command":
        if (Array.isArray(value)) {
          this.command = value;
        }
        break;
      case "entrypoint":
        if (Array.isArray(value)) {
          this.entrypoint = value;
        }
        break;
      case "environment":
        if (typeof value === "object") {
          this.environment = value as {[key: string]: string};
        }
        break;
      case "http":
        this.http = value instanceof Http ? value : new Http(value as HttpJson);
        break;
      case "plan":
        if (typeof value === "string") {
          this.plan = value as DokPaln;
        }
        break;
      case "exit_code":
        if (typeof value === "number") {
          this.exitCode = value;
        }
        break;
      case "execution_seconds":
        if (typeof value === "number") {
          this.executionSeconds = value;
        }
        break;
      case "start_at":
        this.startAt = this.validateDate(value, key);
        break;
      case "end_at":
        this.endAt = this.validateDate(value, key);
        break;
      case "stop_at":
        this.stopAt = this.validateDate(value, key);
        break;
      default:
        throw new Error(`Unknown key in container: ${key}`);
    }
    return this;
  }

  toJson(): ContainerJson {
    if (!this.image || !this.plan) throw new Error('Image and plan are required.');
    const params: ContainerJson = {
      image: this.image,
      command: this.command,
      entrypoint: this.entrypoint,
      environment: this.environment || {},
      http: this.http?.toJson(),
      plan: this.plan,
    };
    if (this.registry) params.registry = this.registry;
    return params;
  }
}

export default Container;
export { ContainerJson }; 
