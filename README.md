# DOK SDK

SDK for [DOK](https://www.sakura.ad.jp/koukaryoku-dok/) that is container GPU cloud service. DOK is a container-based GPU cloud service that allows you to run your containerized workloads on a GPU. You can use V100 or H100 GPU for billing by the second.

![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/goofmint/dok-js?utm_source=oss&utm_medium=github&utm_campaign=goofmint%2Fdok-js&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews)

## Documentation

[goofmint/dok\-js \| DeepWiki](https://deepwiki.com/goofmint/dok-js)

## Usage

```bash
npm install @goofmint/dok-sdk
```

## Test

```bash
npm test
```

## Supported API

- Tasks
  - [x] Get tasks
  - [x] Get task
  - [x] Create task
  - [x] Delete task
  - [x] Cancel task
  - [ ] Get download URL
  - [ ] Get log stream websocket URL
- Container Registry
  - [ ] Get container registries
  - [ ] Get container registry
  - [ ] Create container registry
  - [ ] Delete container registry
  - [ ] Update container registry
- Artifacts
  - [x] Get artifacts
  - [ ] Get artifact
  - [ ] Get artifact download URL
- Plan
  - [ ] Get plans
- Cost
  - [ ] Get costs
  - [ ] Get cost by plan

## Sample Code

### Initialize DOK client

```ts
import DOK from '@goofmint/dok-sdk';

const dok = new DOK({
  accessToken: process.env.ACCESS_TOKEN,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
});
```

### Get tasks

```ts
const { tasks, meta } = await dok.tasks();
```

### Get task

```ts
const task = await dok.task(taskId);
```

### Create task

```ts
const task = await dok.task();
task
  .set('name', 'test-task')
  .set('tags', ['test', 'task']);
const container = await client.container();
container
  .set('image', 'dok-handson.sakuracr.jp/openvoice')
  .set('plan', 'v100-32gb')
  .set('environment', {
    LANG: 'JP',
    REFERENCE: 'https://s3.isk01.sakurastorage.jp/mg-sd-demo/atsushi.mp3',
    TEXT: '皆さん、こんにちは。今日はハンズオンを実施中です。',
  });
task.containers = [container];
await task.save();
```

### Cancel task

```ts
await task.cancel();
```

### Delete task

```ts
await task.delete();
```

### Get artifacts

```ts
const { artifacts, meta } = await dok.artifacts();
```

## License

MIT

