import {
  describe, beforeAll, it, expect, afterAll,
} from '@jest/globals';
import getApp from '../server/index';

describe('requests', () => {
  let app;

  beforeAll(async () => {
    app = await getApp();
  });

  it('GET 200', async () => {
    const res = await app.inject({
      method: 'GET',
      url: 'http://localhost:5000/',
    });
    expect(res.statusCode).toBe(200);
  });

  it('GET 404', async () => {
    const res = await app.inject({
      method: 'GET',
      url: 'http://localhost:5000/wrongpath',
    });
    expect(res.statusCode).toBe(404);
  });

  afterAll(() => {
    app.close();
  });
});
