#! /usr/bin/env node

import getApp from '../index';

const port = process.env.PORT || 5000;
const address = '0.0.0.0';

getApp().listen(port, address, (err) => {
  if (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    throw (err);
  }
  // eslint-disable-next-line no-console
  console.log(`Server is running on port: ${port}`);
});
