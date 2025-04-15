// Sample test for the client

import DOK from "../src/index";
import 'dotenv/config'

const client = new DOK({
  accessToken: process.env.ACCESS_TOKEN || '',
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || ''
});

describe('Test client', () => {
  it('should initialize client', async () => {
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
}); 
