var request = require("request-promise");

//news source - currently only CNN
const NEWS_SOURCES = "cnn";
//endpoint for the news api
const NEWS_ENDPOINT = "https://newsapi.org/v2/top-headlines?apiKey=" + process.env.NEWS_API_KEY+ "&sources=" + NEWS_SOURCES;

//returns the top headlines, image urls, and new urls for 10 stories from cnn
function getNewsHeadlines() {
  return request(NEWS_ENDPOINT).then(
    response => {
      let data = JSON.parse(response);
      let newsData = data.articles.map((headline) => {
          return {
            title: headline.title,
            url: headline.url,
            imageURL: headline.urlToImage,
          }
        }
      );
      return newsData;
    }
  ).catch(error => console.log("News Error"))
}

module.exports = {getNewsHeadlines: getNewsHeadlines}
