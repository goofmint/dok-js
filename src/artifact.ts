import Base from "./base";
import { ArtifactJson } from "./artifact.d";

class Artifact extends Base {
  id: string | null = null;
  task: string | null = null;
  createdAt: Date | null = null;
  deletedAt: Date | null = null;
  filename: string | null = null;
  sizeBytes: number | null = null;

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
        if (typeof value === "string") {
          this.createdAt = new Date(value);
        }
        break;
      case "deleted_at":
        if (typeof value === "string") {
          this.deletedAt = new Date(value);
        }
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
    }
  }
}

export default Artifact;
export { ArtifactJson };