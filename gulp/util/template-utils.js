var _ = require('lodash');

var DEFAULT_LANG = 'en';
var CONTENT_DIRECTORY = 'content';

// load template.json for given language, but use default language as fallback
// for properties which are not present in the given language
module.exports.loadTemplateJSON = function(lang) {
  var defaultJSON = require('../../' + CONTENT_DIRECTORY + '/' + DEFAULT_LANG + '/template.json');
  var templateJSON = require('../../' + CONTENT_DIRECTORY + '/' + lang + '/template.json');
  var finalJSON = _.cloneDeep(defaultJSON);
  var merge = function(targetJSON, customJSON) {
    _.forEach(customJSON, function(value, key) {
      if (typeof value === "object") {
        merge(targetJSON[key], value)
      } else {
        targetJSON[key] = value;
      }
    });
  }
  merge(finalJSON, templateJSON)
  return finalJSON;
};

// load all the files for a given language
// return an object with
// - the origin srcPath
// - the filename without extension
// - the filepath as an array, reduced by the starting './content' directory
module.exports.loadMdFiles = function(contentFiles, lang) {
  var templateFiles = _.where(contentFiles, function(str) { // return list of content files in this language alone
    return str.indexOf('./' + CONTENT_DIRECTORY + '/' + lang) > -1;
  });

  var templateFilesInThisLang = _.map(templateFiles, function(str) { // expand the file list to include the extrapolated filename
    var obj = {};
    obj.srcPath = str;
    obj.filepathArray = str.split('/');
    obj.filepathArray = _.filter(obj.filepathArray, function(pathPart) {
      if (pathPart !== '.' && pathPart !== 'content') {
        return true;
      }
    });
    obj.filename = obj.filepathArray[obj.filepathArray.length-1];
    obj.filename = obj.filename.split('.md')[0];
    return obj;
  });
  return templateFilesInThisLang;
};
