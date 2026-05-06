const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  
  // wait for load
  await page.waitForTimeout(2000);

  // Scroll down to 4500px, which is inside the NotesSection
  await page.evaluate(() => {
    window.scrollTo(0, 4500);
  });
  
  // wait for scroll trigger to settle
  await page.waitForTimeout(1000);

  const rects = await page.evaluate(() => {
    const main = document.querySelector('#main-scroll-container').getBoundingClientRect();
    const container = document.querySelector('#main-scroll-container > div').getBoundingClientRect(); // this might be pin-spacer
    const canvas = document.querySelector('canvas').getBoundingClientRect();
    const notes = document.querySelector('.note-panel').getBoundingClientRect();
    
    return {
      main: JSON.parse(JSON.stringify(main)),
      container: JSON.parse(JSON.stringify(container)),
      canvas: JSON.parse(JSON.stringify(canvas)),
      notes: JSON.parse(JSON.stringify(notes))
    };
  });

  console.log("Rectangles at scroll 4500px:");
  console.log(JSON.stringify(rects, null, 2));

  await browser.close();
})();
