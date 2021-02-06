install:
	npm install

start: 
	npx nodemon server/bin/server.js

lint:
	npx eslint .

test:
	npm test -s