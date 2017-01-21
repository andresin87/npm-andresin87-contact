/**
 * Created by alucas on 20/1/17.
 */

const afterLoad=require('after-load');
const cheerio = require('cheerio');
const fs = require('fs');

afterLoad('https://brandcolors.net/',function(html){
  let $ = cheerio.load(html);
  let data = $('article[id^="brand-"]');
  let elems = [];
  Object.keys(data).forEach((e) => {
    if (!isNaN(parseFloat(e)) && isFinite(e)) {
      let c = $('div.color', data[e]);
      let colors = [];
      Object.keys(c).forEach((f)=> {
        if (!isNaN(parseFloat(f)) && isFinite(f))
          colors.push(`#${c[f].attribs['data-color-hex']}`);
      });
      // console.log($('div.color', data[e]));
      elems.push({
        id: data[e].attribs['data-brand-name'],
        colors: colors
      });
    }
  });
  fs.writeFile('../dist/brandlist.json', JSON.stringify(elems, null, 2), 'utf8', ()=>{
    console.log('brands-saved')
  });
});