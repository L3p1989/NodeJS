const path = require("path");
const fs = require("fs");
var rp = require("request-promise");

rp("https://reddit.com/r/popular.json")
  .then(redditJSON => {
    let reddit = JSON.parse(redditJSON); //Convert redditJSON to JS
    let customData = []; //array for data that reddit is being parsed

    reddit.data.children.forEach(post => {
      customData.push({
        title: post.data.title,
        url: post.data.url,
        author: post.data.author
      }); //push title, url, and author to customData
      let postData = JSON.stringify(customData); //convert customData into JSON
      fs.writeFileSync("popular-articles.json", postData); //write JSON to file
    });
  })
  .catch(e => console.log(e));
