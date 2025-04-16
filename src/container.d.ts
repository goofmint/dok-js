import { HttpJson } from "./http";

export interface ContainerJson {
  /** Index of the container */
  index?: number
  /** Image of the container */
  image: string
  /** Registry of the container */
  registry?: string
  /** Command of the container */
  command: string[]
  /** Entrypoint of the container */
  entrypoint: string[]
  /** Environment of the container */
  environment: {[key: string]: string}
  /** HTTP configuration */
  http?: HttpJson
  /** Plan of the container */
  plan?: string
  /** Exit code of the container */
  exit_code?: number
  /** Execution seconds of the container */
  execution_seconds?: number
  /** Start time of the container */
  start_at?: string
  /** End time of the container */
  end_at?: string
  /** Stop time of the container */
  stop_at?: string
}
