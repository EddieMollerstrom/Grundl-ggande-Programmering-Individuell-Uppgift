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


    reactBtn.addEventListener("click", function(){
      postsArray[i].reactions++;
      reactBtn.innerText = postsArray[i].reactions;
    });
  }
}


function inputBtnFunc() {
  //Ifall fälten är tomma skapar den inte en ny post.
  if (inputTitle.value === "" || inputBody.value === "" || inputTags.value === "") {
    return;
  }

  let divContainer = document.createElement("div");
  let titleDiv = document.createElement("div");
  let h2 = document.createElement("h2");
  let pBody = document.createElement("p");
  let tagDiv = document.createElement("div");

  divContainer.classList.add("posts");
  titleDiv.classList.add("title");
  pBody.classList.add("content");
  tagDiv.classList.add("div-tag");

  postContainer.append(divContainer);
  divContainer.append(titleDiv, pBody);
  titleDiv.append(h2, tagDiv);

  h2.innerText = inputTitle.value;
  pBody.innerText = inputBody.value;
  tagDiv.innerText = "Tags: " + inputTags.value;

  //Gör så att posten man skapar kommer längst upp
  postContainer.insertBefore(divContainer, postContainer.firstChild);

  inputTitle.value = "";
  inputBody.value = "";
  inputTags.value = "";
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
inputBtn.addEventListener("click", inputBtnFunc)







