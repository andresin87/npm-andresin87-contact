/**
 * Created by alucas on 20/1/17.
 */

// get svgs from: https://github.com/encharm/Font-Awesome-SVG-PNG/tree/master/

const copyfiles = require('copyfiles');
const cheerio = require('cheerio');
const fs = require('fs');



copyfiles([
  '../node_modules/font-awesome-svg-png/sprites.svg',
  '../dist/'
], true, () => {
  console.log('svg-files-saved');
  fs.readFile('../dist/sprites.svg', 'utf8', function(err, data) {
    if (err) throw err;
    let $ = cheerio.load(data);
    data = $('path[id^="fa-"]');
    const elems = data.map((d,e)=>{
      if(e.attribs) {
        return ({
          id: e.attribs.id,
          d: e.attribs.d,
        });
      } else {
        return null;
      }
    });

    console.log('------------------------------------------------------');
    // console.log(elems);
    data = [];
    Object.keys(elems).forEach((e) => {
      if (!isNaN(parseFloat(e)) && isFinite(e))
        data.push(elems[e]);
    });
    console.log(data);
    fs.writeFile('../dist/iconlist.json', JSON.stringify(data, null, 2), 'utf8', ()=>{
      console.log('elems-saved')
    });

    // console.log(IDs);
  });
});