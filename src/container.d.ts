export interface ContainerJson {
  index: number
  image: string
  registry: string
  command: string[]
  entrypoint: string[]
  environment: Environment
  http: Http
  plan: string
  exit_code: number
  execution_seconds: number
  start_at: string
  end_at: string
}
