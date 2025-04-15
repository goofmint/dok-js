import Base from "./base";
import { ArtifactJson } from "./artifact.d";

class Artifact extends Base {
  id: string | null = null;
  task: string | null = null;
  createdAt: Date | null = null;
  deletedAt: Date | null = null;
  filename: string | null = null;
  sizeBytes: number | null = null;
  updatedAt: Date | null = null;
  constructor(readonly json: ArtifactJson | null) {
    super();
    if (json) {
      this.sets(json);
    }
  }

  sets(json: ArtifactJson) {
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
  }
}

export default Artifact;
export { ArtifactJson };