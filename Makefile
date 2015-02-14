upload-gh-pages:
	URL_PREFIX=website gulp clean build
	git add public && git commit -m "build from `git log -n 1 --pretty=format:'%h'`"
	git push origin `git subtree split --prefix public gh-pages`:gh-pages --force
	git reset master~1