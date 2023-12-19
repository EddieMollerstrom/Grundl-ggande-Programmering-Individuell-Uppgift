let postContainer = document.getElementById("post-container");
let postsTitle = document.getElementById("posts-title");
let postsArray = [];
let inputTitle = document.getElementById("input-title");
let inputBody = document.getElementById("input-body");
let inputTags = document.getElementById("input-tags");
let inputBtn = document.getElementById("input-btn");

// Hämtar alla posts
function getPosts(callback) {
  fetch('https://dummyjson.com/posts')
    .then(res => res.json())
    .then(function (json) {
      callback(json.posts);
    });
}


//Renderar Posts
function renderPosts(posts) {
  postContainer.innerHTML = "";
  for (let i = 0; i < posts.length; i++) {
    postsArray.push(posts[i]);

    let divContainer = document.createElement("div");
    let titleDiv = document.createElement("div");
    let h2 = document.createElement("h2");
    let pBody = document.createElement("p");
    let tagDiv = document.createElement("div");
    let reactBtn = document.createElement("button");

    divContainer.classList.add("posts");
    titleDiv.classList.add("title");
    pBody.classList.add("content");
    tagDiv.classList.add("div-tag");
    reactBtn.classList.add("react-btn");

    postContainer.append(divContainer);
    divContainer.append(titleDiv, pBody, reactBtn);
    titleDiv.append(h2, tagDiv);

    h2.innerText = postsArray[i].title;
    pBody.innerText = postsArray[i].body;
    tagDiv.innerText = "Tags: " + postsArray[i].tags;
    reactBtn.innerText = postsArray[i].reactions;


    let localSave = localStorage.getItem(`reactions${i}`);
    if (localSave !== null) {
      postsArray[i].reactions = parseInt(localSave, 10);
      reactBtn.innerText = postsArray[i].reactions;
    }

    function reactBtnInc() {
      postsArray[i].reactions++;
      reactBtn.innerText = postsArray[i].reactions;
      localStorage.setItem(`reactions${i}`, postsArray[i].reactions);
      reactBtn.removeEventListener("click", reactBtnInc);
      reactBtn.addEventListener("click", reactBtnDec);
    }

    function reactBtnDec() {
      postsArray[i].reactions--;
      reactBtn.innerText = postsArray[i].reactions;
      reactBtn.removeEventListener("click", reactBtnDec);
      reactBtn.addEventListener("click", reactBtnInc);
    }

    reactBtn.addEventListener("click", reactBtnInc);
  }
}


function createPost() {
  //Ifall fälten är tomma skapar den inte en ny post.
  if (inputTitle.value === "" || inputBody.value === "" || inputTags.value === "") {
    return;
  }

  let divContainer = document.createElement("div");
  let titleDiv = document.createElement("div");
  let h2 = document.createElement("h2");
  let pBody = document.createElement("p");
  let tagDiv = document.createElement("div");
  let reactBtn = document.createElement("button");
  let interactions = 0;

  localStorage.setItem("title", inputTitle.value);
  localStorage.setItem("body", inputBody.value);
  localStorage.setItem("tag", inputTags.value);

  divContainer.classList.add("posts");
  titleDiv.classList.add("title");
  pBody.classList.add("content");
  tagDiv.classList.add("div-tag");
  reactBtn.classList.add("react-btn");

  postContainer.append(divContainer);
  divContainer.append(titleDiv, pBody, reactBtn);
  titleDiv.append(h2, tagDiv);

  h2.innerText = localStorage.getItem("title");
  pBody.innerText = localStorage.getItem("body");
  tagDiv.innerText = "Tags: " + localStorage.getItem("tag");
  reactBtn.innerText = interactions;

  //Gör så att posten man skapar kommer längst upp
  postContainer.insertBefore(divContainer, postContainer.firstChild);

  //Gör så att fälten är tomma efter att man har skapat ett inlägg
  inputTitle.value = "";
  inputBody.value = "";
  inputTags.value = "";

  function reactBtnInc() {
    interactions++;
    reactBtn.innerText = interactions;
    reactBtn.removeEventListener("click", reactBtnInc);
    reactBtn.addEventListener("click", reactBtnDec);
  }

  function reactBtnDec() {
    interactions--;
    reactBtn.innerText = interactions;
    reactBtn.removeEventListener("click", reactBtnDec);
    reactBtn.addEventListener("click", reactBtnInc);
  }

  reactBtn.addEventListener("click", reactBtnInc);
}



//Renderar de senaste 5 inläggen under "Latest posts" på vänster sida.
function renderFiveLatest(posts) {
  for (let i = 0; i < 5; i++) {
    postsArray.push(posts[i].title);
    let pLatest = document.createElement("p");
    pLatest.classList.add("left-titles");
    postsTitle.append(pLatest);

    pLatest.innerText = postsArray[i].title;
  }
}

getPosts(renderPosts);
getPosts(renderFiveLatest);
inputBtn.addEventListener("click", createPost)




//localStorage.clear();




