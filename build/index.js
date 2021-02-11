Object.defineProperty(exports, '__esModule', { value: true });
const fastify_1 = require('fastify');
const fastify_multipart_1 = require('fastify-multipart');
const index_1 = require('./routes/index');

exports.default = () => {
  const app = fastify_1.default({
    logger: {
      prettyPrint: true,
    },
  });
  app.register(fastify_multipart_1.default, {
    throwFileSizeLimit: true,
    limits: {
      files: 1,
      fileSize: 10000,
    },
  });
  index_1.default(app);
  return app;
};
