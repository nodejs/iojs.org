;
(function(d, n) {
  var os = n.platform.match(/(Win|Mac|Linux)/);
  var x = n.userAgent.match(/x86_64|Win64|WOW64/) ||
    n.cpuClass === 'x64' ? 'x64' : 'x86';
  var base = 'https://iojs.org/dist/latest/';
  var db = d.getElementById('home-downloadbutton');
  var version = db.dataset.version;
  var dlLocal = db.dataset.dlLocal;
  var href = ''; //If we can't match, just link it directly to the download list.
  switch (os && os[1]) {
    case 'Mac':
      href = 'iojs-' + version + '.pkg';
      db.innerHTML = dlLocal + ' OS X (x64)';
      break;
    case 'Win':
      href = 'iojs-' + version + '-' + x + '.msi';
      db.innerHTML = dlLocal + ' Windows ('+x+')';
      break;
    case 'Linux':
      href = 'iojs-' + version + '-linux-' + x + '.tar.gz';
      db.innerHTML = dlLocal + ' Linux ('+x+')';
      break;
  }
  db.href = base + href;
})(document, navigator);
