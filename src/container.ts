import Base from "./base";
import { ContainerJson } from "./container.d";
import Http, { HttpJson } from "./http";

class Container extends Base {
  index: number | null = null;
  image: string | null = null;
  registry: string | null = null;
  command: string[] | null = null;
  entrypoint: string[] | null = null;
  environment: {[key: string]: string} = {};
  http: Http | null = null;
  plan: string | null = null;
  exitCode: number | null = null;
  executionSeconds: number | null = null;
  startAt: string | null = null;
  endAt: string | null = null;

  constructor(readonly json: ContainerJson | null) {
    super();
    if (json) {
      this.sets(json);
    }
  }

  sets(json: ContainerJson) {
    Object.entries(json).forEach(([key, value]) => {
      this.set(key, value);
    });
  }

  set(key: string, value: any) {
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
        if (typeof value === "object") {
          this.http = new Http(value as HttpJson);
        }
        break;
      case "plan":
        if (typeof value === "string") {
          this.plan = value;
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
        if (typeof value === "string") {
          this.startAt = value;
        }
        break;
      case "end_at":
        if (typeof value === "string") {
          this.endAt = value;
        }
        break;
    }
  }
}

export default Container;
export { ContainerJson }; 
