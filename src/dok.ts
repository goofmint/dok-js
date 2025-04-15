import Base from "./base";
import Task, { TasksParams, TasksResponse } from "./task";
import { DokMeta, DokMetaJson } from "./dok.d";
import Artifact, { ArtifactsParams, ArtifactsResponse } from "./artifact";
class DOK {
  readonly baseUrl = "https://secure.sakura.ad.jp/cloud/zone/is1a/api/managed-container/1.0";
  readonly accessToken: string;
  readonly accessTokenSecret: string;

  constructor({accessToken, accessTokenSecret}: {accessToken: string, accessTokenSecret: string}) {
    this.accessToken = accessToken;
    this.accessTokenSecret = accessTokenSecret;
    Base.client = this;
  }

  async tasks(params: TasksParams = {}): Promise<TasksResponse> {
    return await Task.all(params);
  }

  async task(id: string): Promise<Task> {
    return await Task.find(id);
  }

  async artifacts(params: ArtifactsParams = {}): Promise<ArtifactsResponse> {
    return await Artifact.all(params);
  }
}

export default DOK;
export { TasksParams, DokMeta, DokMetaJson, TasksResponse, ArtifactsParams, ArtifactsResponse };