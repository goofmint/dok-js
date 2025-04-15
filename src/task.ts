import Base from "./base";
import Artifact from "./artifact";
import Container from "./container";
import { ErrorResponse } from "./index.d";
import { TaskJson, TasksParams, TasksMeta, TasksResponse, TasksJsonResponse } from "./task.d";
class Task extends Base {
  id: string | null = null;
  name: string | null = null;
  createdAt: Date | null = null;
  updatedAt: Date | null = null;
  canceledAt: Date | null = null;
  containers: Container[] = [];
  status: string | null = null;
  httpUri: string | null = null;
  tags: string[] = [];
  errorMessage: string | null = null;
  artifact: Artifact | null = null;

  constructor(json: TaskJson | null) {
    super();
    if (json) {
      this.sets(json);
    }
  }

  sets(json: TaskJson) {
    Object.entries(json).forEach(([key, value]) => {
      this.set(key, value);
    });
  }

  set(key: string, value: any) {
    switch (key) {
      case "id":
        if (typeof value === "string") {
          this.id = value;
        }
        break;
      case "name":
        if (typeof value === "string") {
          this.name = value;
        }
        break;
      case "created_at":
        this.createdAt = this.validateDate(value, key);
        break;
      case "updated_at":
        this.updatedAt = this.validateDate(value, key);
        break;
      case "canceled_at":
        this.canceledAt = this.validateDate(value, key);
        break;
      case "containers":
        if (Array.isArray(value)) {
          this.containers = value.map(container => new Container(container));
        }
        break;
      case "status":
        if (typeof value === "string") {
          this.status = value;
        }
        break;
      case "http_uri":
        if (typeof value === "string") {
          this.httpUri = value;
        }
        break;
      case "tags":
        if (Array.isArray(value)) {
          this.tags = value;
        }
        break;
      case "error_message":
        if (typeof value === "string") {
          this.errorMessage = value;
        }
        break;
      case "artifact":
        if (typeof value === "object") {
          this.artifact = new Artifact(value);
        }
        break;
      default:
        throw new Error(`Unknown key in task: ${key}`);
    }
  }

  static async all(params: TasksParams): Promise<TasksResponse> {
    const query = new URLSearchParams();
    if (params.page) query.set("page", params.page.toString());
    if (params.pageSize) query.set("page_size", params.pageSize.toString());
    if (params.status) query.set("status", params.status);
    if (params.tag) query.set("tag", params.tag);
    const headers = new Headers();
    headers.set("Authorization", `Basic ${btoa(`${Task.client.accessToken}:${Task.client.accessTokenSecret}`)}`);
    headers.set("Content-Type", "application/json");
    const url = `${Task.client.baseUrl}/tasks/?${query.toString()}`;
    const response = await fetch(url, {
      method: "GET",
      headers,
    });
    const data = await response.json() as TasksJsonResponse | ErrorResponse;
    if ("error_code" in data) {
      throw new Error(`${data.error_code}: ${data.error_msg}`);
    }
    return {
      meta: data.meta,
      tasks: data.results.map(result => new Task(result)),
    };
  }

  static async find(id: string): Promise<Task> {
    const headers = Task.getHeaders();
    const url = `${Task.client.baseUrl}/tasks/${id}/`;
    try {
      const response = await fetch(url, { method: "GET", headers });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json() as TaskJson | ErrorResponse;
      if ("error_code" in data) {
        throw new Error(`${data.error_code}: ${data.error_msg}`);
      }
      return new Task(data);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(`Failed to fetch task: ${error}`);
    }
  }
}

export default Task;
export { TasksParams, TasksMeta, TaskJson, TasksResponse, TasksJsonResponse };
