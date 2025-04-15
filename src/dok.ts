import Base from "./base";
import Task, { TasksMeta, TasksParams, TasksResponse } from "./task";

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
}

export default DOK;
export { TasksParams, TasksMeta, TasksResponse };