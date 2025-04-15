import { ContainerJson } from "./container";
import { ArtifactJson } from "./artifact";
import Task from "./task";

export type TaskStatus = "waiting" | "running" | "error" | "done" | "aborted" | "canceled";
export type TasksParams = {
  page?: number;
  pageSize?: number;
  status?: TaskStatus;
  tag?: string;
}

export type TasksMeta = {
  page: number;
  page_size: number;
  total_pages: number;
  count: number;
  next: string;
  previous: string;
}

export type TaskJson = {
  id: string
  name: string
  created_at: string
  updated_at: string
  canceled_at: string
  containers: ContainerJson[]
  status: string
  http_uri: string
  tags: string[]
  error_message: string
  artifact: ArtifactJson
}

export type TasksJsonResponse = {
  meta: TasksMeta;
  results: TaskJson[];
}

export type TasksResponse = {
  meta: TasksMeta;
  tasks: Task[];
}
