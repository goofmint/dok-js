import Base from "./base";
import { HttpJson } from "./http.d";

class Http extends Base {
  port: number | null = null;
  path: string | null = null;

  constructor(json?: HttpJson) {
    super();
    if (json) {
      this.sets(json);
    }
  }

  sets(json: HttpJson) {
    Object.entries(json).forEach(([key, value]) => {
      this.set(key, value);
    });
  }

  set(key: string, value: any) {
    switch (key) {
      case "port":
        if (typeof value === "number") {
          this.port = value;
        }
        break;
      case "path":
        if (typeof value === "string") {
          this.path = value;
        }
        break;
      default:
        throw new Error(`Unknown key in http: ${key}`);
    }
  }

  toJson(): HttpJson {
    if (!this.port || !this.path) throw new Error('Port and path are required.');
    return {
      port: this.port,
      path: this.path,
    }
  }
}

export default Http;
export { HttpJson };