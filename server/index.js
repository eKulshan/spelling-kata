import fastify from 'fastify';

export default () => {
  const app = fastify({
    logger: {
      prettyPrint: true,
    },
  });

  return app;
};