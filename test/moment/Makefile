TESTS = test/*.js
REPORTER = spec

test:
	make test-node

test-node:
	@NODE_ENV=test NODE_TLS_REJECT_UNAUTHORIZED=0 mocha \
		--require should \
		--reporter $(REPORTER) \
		--timeout 5000 \
		--growl \
		$(TESTS)

docs: test-docs

test-docs:
	make test REPORTER=doc \
		| cat docs/head.html - docs/tail.html \
		> docs/test.html

clean:
	rm -fr superagent.js components

.PHONY: test docs test-docs clean
