const path = require("path");
const fs = require("fs");
var rp = require("request-promise");

rp("https://reddit.com/r/popular.json")
  .then(redditJSON => {
    let reddit = JSON.parse(redditJSON); //Convert redditJSON to JS
    reddit.data.children.forEach(post => {
      let ext = path.extname(post.data.url); //shorten code to `ext`
      let file = post.data.id; //shorten code to `file`
      let name = `${file}${ext}`; //shorten code to `name`
      if (ext === ".jpg" || ".gif" || ".png") {
        rp(post.data.url, { encoding: "base64" })
          .then(media => {
            fs.writeFile(
              path.join(__dirname, `./downloads/${name}`),
              media,
              { encoding: "base64" },
              err => {
                if (err) console.log(err);
              }
            );
          })
          .catch(e => console.log(e));
      } //grab all files with .jpg/.gif/.png and write them to 'downloads' folder with id as file name
    });
  })
  .catch(e => console.log(e));
