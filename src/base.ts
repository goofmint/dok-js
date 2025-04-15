import DOK from "./dok";
class Base {
  static client: DOK;

  static getHeaders(): Headers {
    if (!Base.client?.accessToken || !Base.client?.accessTokenSecret) {
      throw new Error('Authentication credentials not provided');
    }
    const headers = new Headers();
    headers.set("Authorization", `Basic ${btoa(`${Base.client.accessToken}:${Base.client.accessTokenSecret}`)}`);
    headers.set("Content-Type", "application/json");
    return headers;
  }
}

export default Base;
