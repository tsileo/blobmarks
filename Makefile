.PHONY: all website extension firefox chrome
all:
	bower install
website:
	rm website/dist/*
	cat bower_components/pure/pure.css css/app.css > website/dist/app.css
	cat bower_components/ractive/ractive.min.js js/core.js js/app.js > website/dist/app.js

extension:
	rm -rf extension/dist/*
	rm -rf dist/*
	cat bower_components/pure/pure.css > extension/dist/popup.css
	cat bower_components/pure/pure.css css/app.css > extension/dist/app.css
	cat bower_components/ractive/ractive.min.js js/core.js > extension/dist/popup.js
	cat bower_components/ractive/ractive.min.js js/core.js js/app.js > extension/dist/app.js
	cp -r website/index.html extension/tab.html
	cd extension; zip -r ../dist/blobmarks.xpi .

