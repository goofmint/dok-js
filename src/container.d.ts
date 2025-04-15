import { HttpJson } from "./http";

export interface ContainerJson {
  index: number
  image: string
  registry: string
  command: string[]
  entrypoint: string[]
  environment: {[key: string]: string}
  http: HttpJson
  plan: string
  exit_code: number
  execution_seconds: number
  start_at: string
  end_at: string
  stop_at: string
}
