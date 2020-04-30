# files-scripts

> Requirements: NodeJS, PhantomJS and CasperJS

Install dependencies:
```bash
npm i -g phantomjs
npm i -g casperjs
npm i
```

To get all the download links just run :
```bash
casperjs downloadFiles.js
```

> If you want to download the files at this point too, just add to the script `--download=true`

To run the server and obtain the "pretty" server list:
```bash
node displayFiles.js
```
> Then go to http://localhost:3000

> If you want to download all PDFs from this html, you can install this extension [Batch Link Downloader](https://chrome.google.com/webstore/detail/batch-link-downloader/aiahkbnnpafepcgnhhecilboebmmolnn/related)