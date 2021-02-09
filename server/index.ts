import fastify from 'fastify';
import fastifyMultipart from 'fastify-multipart';
import fastifyStatic from 'fastify-static';
import { fileURLToPath } from 'url';
import path from 'path';
import addRoutes from './routes/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default () => {
  const app = fastify({
    logger: {
      prettyPrint: true,
    },
  });
  app.register(fastifyStatic, {
    root: path.join(__dirname, 'public'),
  });
  app.register(fastifyMultipart);
  addRoutes(app);

  return app;
};
