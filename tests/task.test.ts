// Sample test for the client

import DOK from "../src/index";
import 'dotenv/config'
import Task from "../src/task";
import Artifact from "../src/artifact";

const client = new DOK({
  accessToken: process.env.ACCESS_TOKEN || '',
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || ''
});

describe('Test Task', () => {
  it('should get tasks', async () => {
    const { meta, tasks } = await client.tasks();
    expect(meta).toBeDefined();
    expect(meta).toBeDefined();
    expect(meta.totalPages).toBeGreaterThan(0);
    expect(meta.page).toBeGreaterThan(0);
    expect(meta.pageSize).toBeGreaterThan(0);
    expect(meta.pageSize).toBeLessThanOrEqual(100);
    expect(meta.count).toBeGreaterThan(0);
    expect(tasks).toBeDefined();
    expect(tasks.length).toBeGreaterThan(0);
    const task = tasks[0];
    if (task) {
      expect(task.id).toBeDefined();
      expect(task.createdAt).toBeDefined();
      expect(task.updatedAt).toBeDefined();
      expect(task.status).toBeDefined();
      expect(task.status).toMatch(/^(waiting|running|done|error|aborted|canceled)$/);
    }
  });

  it('should get task', async () => {
    const { tasks } = await client.tasks();
    const task = tasks[0];
    const task2 = await client.task(task.id!);
    expect(task2).toBeInstanceOf(Task);
    expect(task2.id).toEqual(task.id);
    expect(task2.createdAt).toEqual(task.createdAt);
    expect(task2.updatedAt).toEqual(task.updatedAt);
    expect(task2.status).toEqual(task.status);
    expect(task2.httpUri).toEqual(task.httpUri);
    expect(task2.tags).toEqual(task.tags);
    expect(task2.errorMessage).toEqual(task.errorMessage);
    expect(task2.artifact).toBeInstanceOf(Artifact);
  });

  it('should handle non-existent task ID', async () => {
    // Use a clearly invalid ID format or one that's unlikely to exist
    const nonExistentId = 'non-existent-task-id';
    await expect(client.task(nonExistentId)).rejects.toThrow();
  });

  it('should create task', async () => {
    const task = await client.task();
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
    const bol = await task.save();
    expect(bol).toBe(true);
    expect(task.id).toBeDefined();
    expect(task.createdAt).toBeDefined();
    expect(task.status).toEqual('waiting');
  });

  it('should create and cancel task', async () => {
    const task = await client.task();
    task
      .set('name', 'test-cancel-task')
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
    const bol = await task.save();
    expect(bol).toBe(true);
    expect(task.id).toBeDefined();
    expect(task.createdAt).toBeDefined();
    expect(task.status).toEqual('waiting');
    const bol2 = await task.cancel();
    expect(bol2).toBe(true);
    expect(task.status).toEqual('canceled');
  });

  it('should create and delete task', async () => {
    const task = await client.task();
    task
      .set('name', 'test-delete-task')
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

    const saveResult = await task.save();
    expect(saveResult).toBe(true);
    expect(task.id).toBeDefined();
    expect(task.createdAt).toBeDefined();
    expect(task.status).toEqual('waiting');
    const cancelResult = await task.cancel();
    expect(cancelResult).toBe(true);
    expect(task.status).toEqual('canceled');
    const deleteResult = await task.delete();
    expect(deleteResult).toBe(true);
  });
}); 
