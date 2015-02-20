
'use strict';

var versions;

//  declare the current versions for the build system to use
versions =
[
  {
    "name": "io.js",
    "nameRegExp": /{{\s*io\.js_latest\.name\s*}}/mg,
    "value": "1.3.0",
    "valueRegExp": /{{\s*io\.js_latest\.value\s*}}/mg,
    "link": "https://iojs.org/dist/v1.3.0/",
    "linkRegExp": /{{\s*io\.js_latest\.link\s*}}/mg,
  },
  {
    "name": "Linux",
    "nameRegExp": /{{\s*io\.js_latest_linux\.name\s*}}/mg,
    "value": "1.3.0",
    "link": "https://iojs.org/dist/v1.3.0/iojs-v1.3.0-linux-x64.tar.xz",
    "linkRegExp": /{{\s*io\.js_latest_linux\.link\s*}}/mg,
  },
  {
    "name": "Win32",
    "nameRegExp": /{{\s*io\.js_latest_win32\.name\s*}}/mg,
    "value": "1.3.0",
    "link": "https://iojs.org/dist/v1.3.0/iojs-v1.3.0-x86.msi",
    "linkRegExp": /{{\s*io\.js_latest_win32\.link\s*}}/mg,
  },
  {
    "name": "Win64",
    "nameRegExp": /{{\s*io\.js_latest_win64\.name\s*}}/mg,
    "value": "1.3.0",
    "link": "https://iojs.org/dist/v1.3.0/iojs-v1.3.0-x64.msi",
    "linkRegExp": /{{\s*io\.js_latest_win64\.link\s*}}/mg,
  },
  {
    "name": "Mac",
    "nameRegExp": /{{\s*io\.js_latest_mac\.name\s*}}/mg,
    "value": "1.3.0",
    "link": "https://iojs.org/dist/v1.3.0/iojs-v1.3.0.pkg",
    "linkRegExp": /{{\s*io\.js_latest_mac\.link\s*}}/mg,
  },
  {
    "name": "others",
    "nameRegExp": /{{\s*io\.js_latest_others\.name\s*}}/mg,
    "value": "1.3.0",
    "link": "https://iojs.org/dist/v1.3.0/",
    "linkRegExp": /{{\s*io\.js_latest_others\.link\s*}}/mg,
  },
  {
    "name": "V8",
    "value": "4.1.0.14",
    "valueRegExp": /{{\s*io\.js_latest_V8\.value\s*}}/mg
  }
];


module.exports = versions;
