var _ = require('lodash');
var $ = require('zepto-browserify').$;
var store = require('store');
var moment = require('moment');
var request = require('superagent');
var domready = require('domready');

// Begin Logic
domready(function() {
  //Get Logo
  var logoBranches =
    "https://api.github.com/repos/iojs/logos/branches/master";
  request.get(logoBranches).end(function(branchesData) {
    if (!branchesData.body.commit) {
      console.log('api limit reached. running fallback.')
      var logoStorage = store.get('iojs-logos');
      if (logoStorage) {
        logoStorage = JSON.parse(logoStorage);
        var storedLogo = logoStorage[Math.floor(Math.random() * logoStorage.length)];
        var imageUrl = 'data:image/png;base64,' + storedLogo;
      }
      else {
        var resetTime = parseInt(branchesData.headers['x-ratelimit-reset']);
        var thisTime = parseInt(moment().format('X'));
        var timeLeft = ((resetTime - thisTime) / 60).toFixed(2);
        console.log(timeLeft, 'minutes remaining');
        var imageUrl = "https://avatars1.githubusercontent.com/u/9950313?v=3&s=200";
      }
      $('#logobox').html('<img class="logo" width="200" src="' + imageUrl + '" alt="io.js logo"/>')
      return false;
    }
    var sha = branchesData.body.commit.sha;
    var logoTree = "https://api.github.com/repos/iojs/logos/git/trees/" +
      sha +
      "?recursive=1";
    request.get(logoTree).end(function(treeData) {
      var files = treeData.body.tree;
      var logos = _.reject(files, function(obj) {
        return obj.path.indexOf('.png') < 0;
      });
      var logos = _.reject(logos, function(obj) {
        return obj.size < 10000;
      });
      var logos = _.reject(logos, function(obj) {
        return obj.size > 1000000;
      });
      var randomLogo = logos[Math.floor(Math.random() * logos.length)];
      var path = encodeURIComponent(randomLogo.path);
      var randomLogoUrl = 'https://api.github.com/repos/iojs/logos/contents/' + path;
      request.get(randomLogoUrl).end(function(logoData) {
        var rawdata = logoData.body.content;
        //add logo to page
        var imageUrl = 'data:image/png;base64,' + rawdata;
        $('#logobox').html('<img class="logo" width="200" src="' + imageUrl + '" alt="io.js logo"/>')
        //add rawdata to localstorage for fallback
        var logoStorage = store.get('iojs-logos');
        if (!logoStorage) {
          logoStorage = '[]';
        }
        logoStorage = JSON.parse(logoStorage);
        var index = _.findIndex(logoStorage, rawdata);
        if (index < 0) {
          logoStorage.push(rawdata);
          logoStorage = JSON.stringify(logoStorage);
          store.set('iojs-logos', logoStorage);
        }
      });
    });
  });
});
// End Logic