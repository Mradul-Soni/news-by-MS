const API_Key = "fa7ee23928cc4e47b1f810c50fcd28a5" ;
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load",()=> fetchNews("world"))

async function fetchNews(query) {
  const result = await fetch(`${url}${query}&apiKey=${API_Key}`);
  const data = await result.json();
  bindData(data.articles);
}

function bindData(articles){
    const cardsContainer = document.getElementById("cardscontainer");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML="";

    articles.forEach((article)=> {
        if(!article.urlToImage) return;

        const cardCone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardCone,article);
        cardsContainer.appendChild(cardCone);
    });
}

function fillDataInCard(cardCone,article){
    const newsImg = cardCone.querySelector("#news-img");
    const newsTitle = cardCone.querySelector("#news-title");
    const newsSource = cardCone.querySelector("#newssource");
    const newsDesc = cardCone.querySelector("#newsdesc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = `${article.title.slice(0,60)}....`;
    newsDesc.innerHTML = `${article.description.slice(0,150)}....`;

    const date = new Date(article.publishedAt).toLocaleString("en-Us",{ timeZone: "Asia/Jakarta"})

    newsSource.innerHTML =`${article.source.name}. ${date}`;

    cardCone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank")
    })

}

let curSelectNav = null;

function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectNav?.classList.remove("active");
    curSelectNav = navItem;
    curSelectNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click",()=>{
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);

    curSelectNav?.classList.remove("active");
    curSelectNav = null;
})