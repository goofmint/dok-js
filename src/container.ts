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
  startAt: Date | null = null;
  endAt: Date | null = null;
  stopAt: Date | null = null;

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
      case "start_at": {
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
          this.startAt = date;
        } else {
          throw new Error(`Invalid date format for start_at: ${value}`);
        }
        break;
      }
      case "end_at": {
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
          this.endAt = date;
        } else {
          throw new Error(`Invalid date format for end_at: ${value}`);
        }
        break;
      }
      case "stop_at": {
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
          this.stopAt = date;
        } else {
          throw new Error(`Invalid date format for stop_at: ${value}`);
        }
        break;
      }
      default:
        throw new Error(`Unknown key in container: ${key}`);
    }
  }
}

export default Container;
export { ContainerJson }; 
