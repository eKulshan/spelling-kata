install:
	npm install

start: 
	npx nodemon build/bin/server.js

lint:
	npx eslint .

test:
	npm test -s

build:
	npx tsc