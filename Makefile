MASTER_HASH := $(shell git log -n 1 --pretty=format:'%h')

upload-gh-pages:
	URL_PREFIX=website gulp clean build
	git add public && git commit -m "build from $(MASTER_HASH)"
	git push origin `git subtree split --prefix public master`:gh-pages --force || git reset master~1
	git reset master~1