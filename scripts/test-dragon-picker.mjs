import assert from 'node:assert/strict';
// Optional browser QA: use an existing Playwright install, with no project dependency added.
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch({ headless: true });
try {
 const page = await browser.newPage();
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.addInitScript(()=>{
   Object.defineProperty(window,'localStorage',{get(){throw Error('Storage disabled');}});
   Object.defineProperty(window,'sessionStorage',{get(){throw Error('Storage disabled');}});
 });
 const base=process.env.PICKER_ORIGIN || 'http://127.0.0.1:3000';
 await page.goto(base+'/dragon-picker/');
 await page.getByRole('button',{name:'Pick My Dragon',exact:true}).waitFor();
 assert.equal(await page.locator('h1').count(),1);
 assert.equal(await page.locator('script[src*="clarity"],script[src*="googletagmanager"],script[src*="plausible"]').count(),0);
 await page.locator('#pick-button').focus();await page.keyboard.press('Enter');
 assert.equal(await page.locator('#pick-button').isDisabled(),true);
 await page.evaluate(()=>document.querySelector('#pick-button').dispatchEvent(new Event('click')));
 await page.getByRole('button',{name:'Pick Again',exact:true}).waitFor();
 assert.equal(await page.locator('#pick-button').isDisabled(),false);
 assert.match(await page.locator('#pick-status').textContent(),/^Your pick: /);
 await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async text=>{window.copiedResult=text;}}}));
 await page.locator('#copy-button').click();
 await page.getByText('Result copied.',{exact:true}).waitFor();
 assert.match(await page.evaluate(()=>window.copiedResult),/https:\/\/fourthwingdragon.com\/dragon-picker\//);
 await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:undefined}));
 await page.locator('#copy-button').click();
 assert.equal(await page.locator('#pick-copy').isVisible(),true);
 assert.match(await page.locator('#pick-copy').inputValue(),/A playful fan-made dragon combination/);
 await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{throw Error('Denied');}}}));
 await page.locator('#copy-button').click();
 assert.equal(await page.locator('#pick-copy').isVisible(),true);
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.locator('#pick-button').click();
 assert.equal(await page.locator('#pick-button').isDisabled(),false);
 assert.equal(await page.locator('#pick-copy').isVisible(),false);
 for(const width of [320,390,1280]){
   await page.setViewportSize({width,height:900});
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`overflow at ${width}`);
   await page.screenshot({path:`/tmp/dragon-picker-${width}.png`,fullPage:true});
 }
 await page.reload();assert.equal(await page.locator('#pick-result').isVisible(),false);
 for(const route of ['/','/dragons/','/quiz/dragon-type/','/quiz/signet/','/dragon-name-generator/']){
   const response=await page.goto(base+route);assert.equal(response.status(),200);
   if(route==='/'||route==='/dragons/')assert.ok(await page.locator('main a[href="/dragon-picker/"]').count());
 }
 assert.deepEqual(errors,[]);
 console.log('Browser QA passed: keyboard pick, busy guard, repick, reduced motion, clipboard success/missing/denied, disabled storage, refresh, 320/390/1280px, entry links and existing tool routes.');
} finally {await browser.close();}
