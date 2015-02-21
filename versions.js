
'use strict';

var versions;

/*  declare the current versions for the build system to use
    the id is used to construct a RegExp in order to inject the values of
    a version into the templates.

    for example:
    we define an io.js version
    {
      id: 'iojs',
      name: 'io.js',
      value: '1.3.0',
      link: 'https://iojs.org/dist/v1.3.0/',
    }

    then, in the template, in order to inject the link, we add to the
    template this : `{{ iojs.link }}`
    For the value : `{{ iojs.value }}`
    so in general, we use the `id` plus a dot and the key
*/
versions =
[
  {
    id: 'iojs',
    name: 'io.js',
    value: '1.3.0',
    link: 'https://iojs.org/dist/v1.3.0/',
    img: '../images/1.0.0.png'
  },
  {
    id: 'linux',
    name: 'Linux',
    value: '1.3.0',
    link: 'https://iojs.org/dist/v1.3.0/iojs-v1.3.0-linux-x64.tar.xz'
  },
  {
    id: 'win32',
    name: 'Win32',
    value: '1.3.0',
    link: 'https://iojs.org/dist/v1.3.0/iojs-v1.3.0-x86.msi'
  },
  {
    id: 'win64',
    name: 'Win64',
    value: '1.3.0',
    link: 'https://iojs.org/dist/v1.3.0/iojs-v1.3.0-x64.msi'
  },
  {
    id: 'mac',
    name: 'Mac',
    value: '1.3.0',
    link: 'https://iojs.org/dist/v1.3.0/iojs-v1.3.0.pkg'
  },
  {
    id: 'others',
    name: 'others'
  },
  {
    id: 'V8',
    name: 'V8',
    value: '4.1.0.14'
  }
];

//  export the versions Array
module.exports = versions;
