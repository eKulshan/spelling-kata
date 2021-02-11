import fastify from 'fastify';
import fastifyMultipart from 'fastify-multipart';
import addRoutes from './routes/index';

export default () => {
  const app = fastify({
    logger: {
      prettyPrint: true,
    },
  });
  app.register(fastifyMultipart, {
    throwFileSizeLimit: true,
    limits: {
      files: 1,
      fileSize: 10000,
    },
  });
  addRoutes(app);

  return app;
};
