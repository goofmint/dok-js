import { ContainerJson } from "./container";
import { ArtifactJson } from "./artifact";
import Task from "./task";

export type TaskStatus = "waiting" | "running" | "error" | "done" | "aborted" | "canceled";
export type TasksParams = {
  /** Page number to retrieve */
  page?: number;
  /** Number of items per page */
  pageSize?: number;
  /** Status of the tasks to filter by */
  status?: TaskStatus;
  /** Tag to filter by */
  tag?: string;
}

export type TasksMeta = {
  /** Current page number */
  page: number;
  /** Number of items per page */
  page_size: number;
  /** Total number of pages */
  total_pages: number;
  /** Total number of items */
  count: number;
  /** URL of the next page */
  next: string | null;
  /** URL of the previous page */
  previous: string | null;
}

export type TaskJson = {
  /** Unique identifier for the task */
  id: string
  /** Name of the task */
  name: string
  /** Date and time when the task was created */
  created_at: string
  /** Date and time when the task was updated */
  updated_at: string
  /** Date and time when the task was canceled */
  canceled_at: string
  /** Containers associated with the task */
  containers: ContainerJson[]
  /** Status of the task */
  status: TaskStatus
  /** HTTP URI of the task */
  http_uri: string
  /** Tags associated with the task */
  tags: string[]
  /** Error message associated with the task */
  error_message: string
  /** Artifact associated with the task */
  artifact: ArtifactJson
}

export type TasksJsonResponse = {
  /** Metadata about the tasks */
  meta: TasksMeta;
  /** List of tasks */
  results: TaskJson[];
}

export type TasksResponse = {
  /** Metadata about the tasks */
  meta: TasksMeta;
  /** List of tasks */
  tasks: Task[];
}
