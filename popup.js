const NUM_OF_ARTICLES = 12;
const REDDIT_WORLDNEWS_URL = "https://www.reddit.com/r/worldnews.json";

async function fetchRedditArticles() {
  try {
    console.log("Fetching data from Reddit...");
    const response = await fetch(REDDIT_WORLDNEWS_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const responseJson = await response.json();
    console.log("responseJson:", responseJson);
    return responseJson.data.children
      .map((child) => child.data)
      .filter((article) => !article.title.includes("/r/WorldNews"))
      .slice(0, NUM_OF_ARTICLES);
  } catch (error) {
    console.error("Failed to fetch data from Reddit:", error);
  }
}

function updateRefreshTime() {
  const refreshTimeElement = document.querySelector(".refresh-time");
  const now = new Date();
  refreshTimeElement.textContent = `Last update: ${now.toLocaleDateString("en-US", { weekday: "long" })} at ${now.toLocaleTimeString("en-US")}`;
}

function cleanList() {
  const listElement = document.getElementById("myList");
  listElement.innerHTML = "";
}

function renderArticles(articles) {
  const listElement = document.getElementById("myList");
  articles.forEach((article) => {
    const listItemHTML = `<li><a href="https://reddit.com${article.permalink}" target="_blank">${article.title}.</a></li>`;
    listElement.insertAdjacentHTML("beforeend", listItemHTML);
  });
}

function renderError() {
  console.warn("Reddit is blocking scraping. Showing error message.");
  const listElement = document.getElementById("myList");
  const listItemHTML = `<p class="error">
  Apologies for the inconvenience, it seems Reddit is currently unavailable for scraping. 
  Please, visit the 
  <a href="https://reddit.com/r/worldnews" target="_blank"><u>WorldNews subreddit</u></a> while I work on the fix!
  <br>- Sincerely, Adrian Aranda.</p>`;
  listElement.insertAdjacentHTML("beforeend", listItemHTML);
}

async function render() {
  cleanList();

  const articles = await fetchRedditArticles();

  articles != null ? renderArticles(articles) : renderError();
  updateRefreshTime();
}

render();
