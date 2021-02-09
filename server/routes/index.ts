import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fixSpelling from '../lib/fixSpelling';

export default (app: FastifyInstance) => {
  app
    .get('/', (_request: FastifyRequest, reply: FastifyReply) => {
      reply
        .headers({ 'Content-Type': 'text/html' })
        .sendFile('upload.html');
    })
    .post('/upload', async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const data = await request.file();
        const reqBuffer = await data.toBuffer();
        const text = reqBuffer.toString();
        const fixedText = await fixSpelling(text);
        const resBuffer = Buffer.from(fixedText, 'utf-8');

        return reply
          .headers({
            'Content-Disposition': `attachment; filename=${data.filename}`,
            'Content-Type': 'text/plain',
          })
          .send(resBuffer);
      } catch (error) {
        return reply.code(500).send(error.message);
      }
    });
};
