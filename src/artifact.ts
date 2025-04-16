import Base from "./base";
import { ArtifactJson, ArtifactsParams, ArtifactsJsonResponse, ArtifactsResponse } from "./artifact.d";
import { ErrorResponse } from "./index.d";
class Artifact extends Base {
  id: string | null = null;
  task: string | null = null;
  createdAt: Date | null = null;
  deletedAt: Date | null = null;
  filename: string | null = null;
  sizeBytes: number | null = null;
  updatedAt: Date | null = null;
  constructor(json?: ArtifactJson) {
    super();
    if (json) {
      this.sets(json);
    }
  }

  sets(json: ArtifactJson): Artifact {
    Object.entries(json).forEach(([key, value]) => {
      this.set(key, value);
    });
    return this;
  }

  set(key: string, value: any): Artifact {
    switch (key) {
      case "id":
        if (typeof value === "string") {
          this.id = value;
        }
        break;
      case "task":
        if (typeof value === "string") {
          this.task = value;
        }
        break;
      case "created_at":
        this.createdAt = this.validateDate(value, key);
        break;
      case "deleted_at":
        this.deletedAt = this.validateDate(value, key);
        break;
      case "filename":
        if (typeof value === "string") {
          this.filename = value;
        }
        break;
      case "size_bytes":
        if (typeof value === "number") {
          this.sizeBytes = value;
        }
        break;
      case "updated_at":
        this.updatedAt = this.validateDate(value, key);
        break;
      default:
        throw new Error(`Unknown key in artifact: ${key}`);
    }
    return this;
  }

  static async all(params: ArtifactsParams): Promise<ArtifactsResponse> {
    const query = new URLSearchParams();
    if (params.page) query.set("page", params.page.toString());
    if (params.pageSize) query.set("page_size", params.pageSize.toString());
    if (params.task) query.set("task", params.task);
    const headers = Artifact.getHeaders();
    const queryString = query.toString();
    const url = `${Artifact.client.baseUrl}/artifacts/${queryString ? `?${queryString}` : ''}`;
    const response = await fetch(url, {
      method: "GET",
      headers,
    });
    const data = await response.json() as ArtifactsJsonResponse | ErrorResponse;
    if ("error_code" in data) {
      throw new Error(`${data.error_code}: ${data.error_msg} (Status: ${data.status}, Fatal: ${data.is_fatal})`);
    }
    const meta = Artifact.toMeta(data.meta);
    return {
      meta,
      artifacts: data.results.map(result => new Artifact(result)),
    };
  }
}

export default Artifact;
export { ArtifactJson, ArtifactsParams, ArtifactsJsonResponse, ArtifactsResponse };