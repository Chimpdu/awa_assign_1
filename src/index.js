import "./styles.css";

if (document.readyState !== "loading") {
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initializeCode();
  });
}

function initializeCode() {
  const wikiNum = 5;
  const breed = ["bulldog", "husky", "newfoundland", "sheepdog", "retriever"];
  generateWiki(wikiNum);
  addTextContent(breed);
  addImage(breed);
}

function generateWiki(wikiNum) {
  const container = document.querySelector(".container");
  /* create wiki item for "wikiNum times" */
  for (let i = 0; i < wikiNum; i++) {
    const wikiItem = document.createElement("div");
    wikiItem.setAttribute("class", "wiki-item");

    const wikiHeader = document.createElement("h1");
    wikiHeader.setAttribute("class", "wiki-header");
    wikiHeader.innerText = "Breed X";

    const wikiContent = document.createElement("div");
    wikiContent.setAttribute("class", "wiki-content");

    const wikiText = document.createElement("p");
    wikiText.setAttribute("class", "wiki-text");
    wikiText.innerText = "Some text about this breed.";

    const imgContainer = document.createElement("div");
    imgContainer.setAttribute("class", "img-container");

    const wikiImg = document.createElement("img");
    wikiImg.setAttribute("class", "wiki-img");
    wikiImg.setAttribute("src", "");

    imgContainer.appendChild(wikiImg);
    wikiContent.appendChild(wikiText);
    wikiContent.appendChild(imgContainer);
    wikiItem.appendChild(wikiHeader);
    wikiItem.appendChild(wikiContent);
    container.appendChild(wikiItem);
  }
}

function addTextContent(breed) {
  /* add content to the header */
  const wikiHeaderElements = document.querySelectorAll(
    ".container .wiki-item .wiki-header"
  );
  /* change the breed list into uppercase */
  const breedCap = breed.map(
    (element) => element.charAt(0).toUpperCase() + element.slice(1)
  );
  wikiHeaderElements[0].innerText = breedCap[0];
  wikiHeaderElements[1].innerText = breedCap[1];
  wikiHeaderElements[2].innerText = breedCap[2];
  wikiHeaderElements[3].innerText = breedCap[3];
  wikiHeaderElements[4].innerText = breedCap[4];

  /* add content to the wiki-text */
  const wikiTextElements = document.querySelectorAll(
    ".container .wiki-item .wiki-text"
  );
  breed.forEach(async (element, index) => {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${element}`;
    const fetchedContent = await fetch(url);
    const contentJson = await fetchedContent.json();
    const content = contentJson.extract;
    console.log(content);
    wikiTextElements[index].innerText = content;
  });
}

async function addImage(breed) {
  /* create urls */
  let urls = [];

  breed.forEach((element, index) => {
    const url = `https://dog.ceo/api/breed/${breed[index]}/images/random`;
    urls.push(url);
  });

  /* fetch images */
  const wikiImgs = document.querySelectorAll(".container .wiki-item .wiki-img");
  urls.forEach(async (element, index) => {
    const imgFetch = await fetch(element);
    const imgJson = await imgFetch.json();
    const imageSrc = imgJson.message;
    const wikiImg = wikiImgs[index];
    wikiImg.setAttribute("src", imageSrc);
  });
}
