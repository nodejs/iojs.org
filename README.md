# [iojs.org](https://iojs.org/)

##### [MIT Licensed](LICENSE)

## Project Structure

- [./content](./content) contains the source articles, organized by language-team groupings.
  Articles are written in
  [Github-flavoured Markdown](https://help.github.com/articles/github-flavored-markdown/).
- [./gulp](./gulp) organizes the [Gulp.js](http://gulpjs.com/)-driven build scripts used
  by the project.
- [./public](./public) **currently** contains the full library of website content generated
  by the build scripts. Changes should not be made directly here. Soon, we'll
  be switching over to leveraging [iojs/build](https://github.com/iojs/build)
  to help automate this.
- [./source](./source) houses the reusable styling and structural elements used by the
  project.
- [./wg-meetings](./wg-meetings) is an archive of the meeting minutes from this project's
  Working Group (see [./GOVERNANCE.md](./GOVERNANCE.md)).

## Running Locally

### Dependencies
```
git clone https://github.com/iojs/website.git
npm install -g gulp
npm install
```

### Local Development
```
npm start
```
Runs a local HTTP server on port 4657 with live-reload, which will update
your browser immediately with content or style changes. Generated assets
are provided to the [./public]() directory for publishing.

## Deployment

The website is currently hosted on a (sponsored) 3rd party provider with a deployment
process managed via the [io.js build team](https://github.com/iojs/build). As repo
changes are approved and merged to the master branch, changes are automatically
deployed within a few minutes.

## Current Project Team Members

* Trent Oswald (@therebelrobot) **Facilitator**
* Mikeal Rogers (@mikeal)
* Jeremiah Senkpiel (@Fishrock123)
* Charlie Robbins (@indexzero)
* Sean Ouimet (@snostorm)
* Zeke Sikelianos (@zeke)
