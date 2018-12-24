const path = require("path");
const fs = require("fs");
var rp = require("request-promise");

rp("https://reddit.com/r/popular.json")
  .then(redditJSON => {
    let reddit = JSON.parse(redditJSON);
    reddit.data.children.forEach(post => {
      let ext = path.extname(post.data.url);
      let file = post.data.id;
      let name = `${file}${ext}`;
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
      }
    });
  })
  .catch(e => console.log(e));
