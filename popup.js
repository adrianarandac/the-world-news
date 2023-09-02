const NUM_OF_ARTICLES = 12;

async function getData() {
  let redditURL = "https://www.reddit.com/r/worldnews.json";
  let customURL = "http://127.0.0.1:8000/news";

  try {
    let res = await fetch(redditURL);
    let resJson = await res.json();
    console.log(resJson);
    return resJson;
  } catch (error) {
    console.log(error);
  }
}

const render = async () => {
  cleanList();

  let response = await getData();
  let list = document.getElementById("myList");
  const now = new Date();

  let index = 0;
  while (list.childNodes.length !== NUM_OF_ARTICLES) {
    if (response.data.children[index].data.title.includes("/r/WorldNews")) {
      index += 1;
    } else {
      list.insertAdjacentHTML(
        "beforeend",
        `<li><a href="https://reddit.com${response.data.children[index].data.permalink}" target="_blank">${response.data.children[index].data.title}.</a></li>`
      );
      index += 1;
    }
  }

  document.getElementsByClassName("refresh-time")[0].innerText = `Updated on ${now.toLocaleDateString("en-En", { weekday: "long" })} at ${now.getHours()}:${
    now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes()
  }:${now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds()}`;
};

const cleanList = () => {
  const parent = document.getElementById("myList");
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

render();
