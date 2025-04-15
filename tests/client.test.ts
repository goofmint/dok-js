// Sample test for the client

import DOK from "../src/index";
import 'dotenv/config'

const client = new DOK({
  accessToken: process.env.ACCESS_TOKEN || '',
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || ''
});

describe('Test client', () => {
  it('should initialize client', () => {
    expect(client).toBeDefined();
    expect(client.accessToken).toBe(process.env.ACCESS_TOKEN);
    expect(client.accessTokenSecret).toBe(process.env.ACCESS_TOKEN_SECRET);
  });
}); 
