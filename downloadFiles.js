const casper = require('casper').create();
const betterDownload = require('casperjs-better-download');
const fs = require('fs');
const data = require('./links.json');
const resultedFiles = [];

casper.start();

casper
  .then(function() {
    data.links.map(function(link) {
      var fileName = "";
      var downloadLink = "";
      casper
        .then(function() {
          console.log("Start: ", link)
        })
        .thenOpen(link)
        .then(function() {
          fileName = casper.getElementInfo(".page-title h1").text;
          downloadLink = "https://link.springer.com" + casper.getElementAttribute("a.test-bookpdf-link", "href");
          resultedFiles.push({
            fileName: fileName,
            downloadLink: downloadLink
          });
        })
        .then(function() {
          if (casper.cli.get("download") == true) {
            betterDownload({
              casper: casper,
              url: downloadLink,
              targetFilepath: 'books/' + fileName + '.pdf'
            });
          }
        })
    })
  })
  .then(function() {
    var json = JSON.stringify({
      files: resultedFiles
    });

    fs.write('results.json', json, 'a');
  })

casper.run();