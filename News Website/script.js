const API_KEY = "f545dd858b124e17ad35c46e987d9d6c";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchnews("India"));


async function fetchnews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-cantainer");
    const newsCardTemplete = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";


    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardclone = newsCardTemplete.content.cloneNode(true);
        fillDataInCard(cardclone, article);
        cardsContainer.appendChild(cardclone);
    });
}

function fillDataInCard(cardclone,article){
    const newsimg = cardclone.querySelector('#news-img');
    const newstitle = cardclone.querySelector('#news-title');
    const newssource = cardclone.querySelector('#news-source');
    const newsdesc = cardclone.querySelector('#news-desc');

    newsimg.src = article.urlToImage;
    newstitle.innerHTML = article.title;
    newsdesc.innerHTML  = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", { timeZone: "asia/Jakarta"});

    newssource.innerHTML = `${article.source.name} . ${date}`;

    cardclone.firstElementChild.addEventListener('click', () =>{
        window.open(article.url ,"_blank")
    });
}

let curselatednav = null;

function onnavitemclick(id)
{
    fetchnews(id);
    const navitem = document.getElementById(id);
    curselatednav?.classlist.remove('active');
    curselatednav = navitem;
 curselatednav?.classlist.add('active');
}