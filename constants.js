const NUM_OF_ARTICLES = 12;
const REDDIT_WORLDNEWS_URL = "https://www.reddit.com/r/worldnews.json";

async function fetchRedditWorldNews() {
  try {
    const response = await fetch(REDDIT_WORLDNEWS_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch data from Reddit:', error);
  }
}

function updateRefreshTime() {
  const refreshTimeElement = document.querySelector('.refresh-time');
  const now = new Date();
  refreshTimeElement.textContent = `Updated on ${now.toLocaleDateString("en-US", { weekday: "long" })} at ${now.toLocaleTimeString("en-US")}`;
}

function cleanList() {
  const listElement = document.getElementById('myList');
  listElement.innerHTML = '';
}

function renderArticles(articles) {
  const listElement = document.getElementById('myList');
  articles.forEach(article => {
    const listItemHTML = `<li><a href="https://reddit.com${article.permalink}" target="_blank">${article.title}</a></li>`;
    listElement.insertAdjacentHTML('beforeend', listItemHTML);
  });
}

async function render() {
  cleanList();

  const jsonData = await fetchRedditWorldNews();
  if (!jsonData) return;

  const articles = jsonData.data.children
    .map(child => child.data)
    .filter(article => !article.title.includes('/r/WorldNews'))
    .slice(0, NUM_OF_ARTICLES);

  renderArticles(articles);
  updateRefreshTime();
}

render();