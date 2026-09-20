/* Refresh the HTML content snapshots after editing data/*.js.
   Run: node scripts/build-static.cjs (Node.js; no dependencies to install).
   Pages also read data/*.js in the browser, so routine data edits appear immediately.
   Snapshots ensure content is readable without JavaScript or if a script is missing.
*/
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const base = path.resolve(__dirname, '..');
const pages = ['index','research','group','facilities','projects','publications','partnerships','opportunities'];
const start = '<!-- CONTENT START -->';
const end = '<!-- CONTENT END -->';
for (const page of pages) {
  const file = path.join(base, page + '.html');
  let html = fs.readFileSync(file, 'utf8');
  const target = {innerHTML:''};
  const headerTarget = {innerHTML:''};
  const footerTarget = {innerHTML:''};
  const context = {
    window: {LAB:{},matchMedia:()=>({matches:true})},
    document: {body:{dataset:{page}},getElementById:id=>({'page-content':target,'site-header':headerTarget,'site-footer':footerTarget}[id]||null),querySelectorAll:()=>[]},
    console, setInterval, clearInterval,
  };
  vm.createContext(context);
  for (const [,src] of html.matchAll(/<script defer src="([^"]+)"/g)) {
    vm.runInContext(fs.readFileSync(path.join(base,src),'utf8'),context,{filename:src});
  }
  assert(target.innerHTML.length > 300, `${page}: content was not generated`);
  assert(!target.innerHTML.includes('This page could not load'), `${page}: rendering failed`);
  const block = `${start}\n<div id="page-content">${target.innerHTML}</div>\n${end}`;
  if (html.includes(start)) {
    html = html.slice(0,html.indexOf(start)) + block + html.slice(html.indexOf(end)+end.length);
  } else {
    assert(html.includes('<div id="page-content"></div>'));
    html = html.replace('<div id="page-content"></div>',block);
  }
  html = html.replace(/<noscript>[\s\S]*?<\/noscript>/g,'');
  html = html.replace(/<header\b[^>]*>[\s\S]*?<\/header>/,`<header id="site-header" class="site-header">${headerTarget.innerHTML}</header>`);
  html = html.replace(/<footer\b[^>]*>[\s\S]*?<\/footer>/,`<footer id="site-footer" class="site-footer">${footerTarget.innerHTML}</footer>`);
  fs.writeFileSync(file,html);
  console.log(`Updated ${page}.html`);
}
