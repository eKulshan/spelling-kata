import fixSpelling from '../lib/fixSpelling.js';

export default (app) => {
  app
    .get('/', (req, reply) => {
      reply
        .headers({ 'Content-Type': 'text/html' })
        .send(`
          <!doctype html>
          <html>
          <body>
              <form action="/upload" method="post" enctype=multipart/form-data>
                  <input type="file" name="textfile" /><br />
                  <button>Save</button>
              </form>
          </body>
          </html>
        `);
    })
    .post('/upload', async (req, reply) => {
      try {
        const data = await req.file();
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
        console.log(error);
        return reply.send('oops');
      }
    });
};
