import Base from "./base";
import Artifact, { ArtifactJson } from "./artifact";
import Container, { ContainerJson } from "./container";
import { ErrorResponse } from "./index.d";
type TaskStatus = "waiting" | "running" | "error" | "done" | "aborted" | "canceled";
type TasksParams = {
  page?: number;
  pageSize?: number;
  status?: TaskStatus;
  tag?: string;
}

type TasksMeta = {
  page: number;
  page_size: number;
  total_pages: number;
  count: number;
  next: string;
  previous: string;
}

type TaskJson = {
  id: string
  created_at: string
  updated_at: string
  canceled_at: string
  containers: ContainerJson[]
  status: string
  tags: string[]
  error_message: string
  artifact: ArtifactJson
}

type TasksJsonResponse = {
  meta: TasksMeta;
  results: TaskJson[];
}

type TasksResponse = {
  meta: TasksMeta;
  tasks: Task[];
}

class Task extends Base {
  id: string | null = null;
  createdAt: Date | null = null;
  updatedAt: Date | null = null;
  canceledAt: Date | null = null;
  containers: Container[] = [];
  status: string | null = null;
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
      case "created_at":
        if (typeof value === "string") {
          this.createdAt = new Date(value);
        }
        break;
      case "updated_at":
        if (typeof value === "string") {
          this.updatedAt = new Date(value);
        }
        break;
      case "canceled_at":
        if (typeof value === "string") {
          this.canceledAt = new Date(value);
        }
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
}

export default Task;
export { TasksParams, TasksMeta, TaskJson, TasksResponse, TasksJsonResponse };
