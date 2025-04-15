// Sample test for the client

import DOK from "../src/index";
import 'dotenv/config'
import Task from "../src/task";
import Artifact from "../src/artifact";

const client = new DOK({
  accessToken: process.env.ACCESS_TOKEN || '',
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || ''
});

describe('Test client', () => {
  it('should get tasks', async () => {
    const { meta, tasks } = await client.tasks();
    expect(meta).toBeDefined();
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
}); 
