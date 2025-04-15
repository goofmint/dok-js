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
  updated_at: string
  /** Name of the artifact file */
  filename: string
  /** Size of the artifact in bytes */
  size_bytes: number
}
