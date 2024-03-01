const { Readability } = require('@mozilla/readability');
const { JSDOM } = require('jsdom');
const path = require('path');
const SummarizerManager = require('node-summarizer').SummarizerManager;


// Specify the path to your HTML file
var filePath = path.join(__dirname, '/test/test-pages/blogger/source.html');

const main = async () => {
    // Use JSDOM.fromFile() to read the local HTML file
    const dom = await JSDOM.fromFile(filePath);
    const reader = new Readability(dom.window.document);
    const article = reader.parse();
    let Summarizer = new SummarizerManager(article.textContent, 50); // 3 is the number of sentences in the summary
    let summary = await Summarizer.getSummaryByRank();
    console.log(article.title);
    console.log(summary.summary);

}

main()