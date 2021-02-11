import * as formAutoContent from 'form-auto-content';
import * as fs from 'fs';
import * as fsp from 'fs/promises';
import * as path from 'path';
import { FastifyInstance } from 'fastify';
import {
  describe, beforeAll, it, expect, afterAll,
} from '@jest/globals';
import getApp from '../server/index';

describe('requests', () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await getApp();
  });

  it('get fixed text', async () => {
    try {
      const form = formAutoContent({
        myFile: fs.createReadStream(path.resolve(process.cwd(), '__fixtures__/text.txt')),
      });
      const expectedHeaders = {
        'content-disposition': 'attachment; filename=text.txt',
        'content-type': 'text/plain',
        'content-length': '777',
      };
      const expectedResult = await fsp.readFile(path.resolve(process.cwd(), '__fixtures__/fixedText.txt'), 'utf-8');

      const res = await app.inject({
        method: 'POST',
        url: 'http://localhost:5000/spell/fix',
        headers: {
          'content-type': 'multipart/form-data',
        },
        ...form,
      });
      expect(res.statusCode).toBe(200);
      expect(res.headers).toMatchObject(expectedHeaders);
      expect(res.body).toBe(expectedResult);
    } catch (error) {
      console.log(error);
    }
  });

  afterAll(() => {
    app.close();
  });
});
