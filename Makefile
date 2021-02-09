install:
	npm install

start: 
	npx nodemon build/server/bin/server.js

lint:
	npx eslint .

test:
	npm test -s

build:
	npx tsc