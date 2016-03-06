.PHONY: all website extension firefox chrome
all:
	bower install
website:
	rm website/dist/*
	cat bower_components/pure/pure.css css/app.css > website/dist/app.css
	cat bower_components/ractive/ractive.min.js js/core.js js/app.js > website/dist/app.js
