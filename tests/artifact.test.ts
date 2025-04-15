// Sample test for the client

import DOK from "../src/index";
import 'dotenv/config'
import Artifact from "../src/artifact";

const client = new DOK({
  accessToken: process.env.ACCESS_TOKEN || '',
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || ''
});

describe('Test Artifact', () => {
  it('should get artifacts', async () => {
    const { meta, artifacts } = await client.artifacts();
    expect(meta).toBeDefined();
    expect(artifacts).toBeDefined();
    expect(artifacts.length).toBeGreaterThan(0);
    const artifact = artifacts[0];
    if (!artifact) {
      throw new Error('Artifact is undefined');
    }
    expect(artifact).toBeInstanceOf(Artifact);
    expect(artifact.id).toBeDefined();
    expect(artifact.createdAt).toBeDefined();
    expect(artifact.createdAt).toBeInstanceOf(Date);
    expect(artifact.updatedAt).toBeDefined();
    expect(artifact.updatedAt).toBeInstanceOf(Date);
  });
}); 
