import { FastifyInstance } from 'fastify';
import fixSpelling from '../lib/fixSpelling';

export default (app: FastifyInstance) => {
  app
    .get('/', (_request, reply) => {
      reply.send('spelling-kata');
    })
    .post('/spell/fix', async (request, reply) => {
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
        // if (error instanceof app.multipartErrors.RequestFileTooLargeError) {
        //   return reply.code(413).send(error.message);
        // }
        return reply.code(500).send(error.message);
      }
    });
};
