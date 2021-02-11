#! /usr/bin/env node

Object.defineProperty(exports, '__esModule', { value: true });
const index_1 = require('../index');

const port = process.env.PORT || 5000;
const address = '0.0.0.0';
index_1.default().listen(port, address, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server is running on port: ${port}`);
});
