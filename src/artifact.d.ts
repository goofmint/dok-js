export interface ArtifactJson {
  /** Unique identifier for the artifact */
  id: string
  /** Task ID associated with the artifact */
  task: string
  /** Date and time when the artifact was created */
  created_at: string
  /** Date and time when the artifact was deleted */
  deleted_at: string
  /** Date and time when the artifact was updated */
  updated_at: string | null
  /** Name of the artifact file */
  filename: string
  /** Size of the artifact in bytes */
  size_bytes: number
}

export interface ArtifactsParams {
  /** Page number to retrieve */
  page?: number;
  /** Number of items per page */
  pageSize?: number;
  /** Task ID associated with the artifact */
  task?: string;
}

export interface ArtifactsJsonResponse {
  /** Metadata about the artifacts */
  meta: DokMetaJson;
  /** List of artifacts */
  results: ArtifactJson[];
}

export interface ArtifactsResponse {
  /** Metadata about the artifacts */
  meta: DokMeta;
  /** List of artifacts */
  artifacts: Artifact[];
}