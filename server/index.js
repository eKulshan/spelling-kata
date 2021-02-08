import fastify from 'fastify';
import fastifyMultipart from 'fastify-multipart';
import addRoutes from './routes/index.js';

export default () => {
  const app = fastify({
    logger: {
      prettyPrint: true,
    },
  });

  app.register(fastifyMultipart);
  addRoutes(app);

  return app;
};
