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
  postsArray.push(...posts); // Lägg till nya inlägg
  for (let i = 0; i < postsArray.length; i++) {
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

    //Sparar reactions variablen
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

// Sparar till local storage
function saveToLocalStorage() {
  localStorage.setItem("postsArray", JSON.stringify(postsArray));
}

// Hämtar från local storage
function loadFromLocalStorage() {
  const storedPosts = localStorage.getItem("postsArray");
  if (storedPosts) {
    postsArray = JSON.parse(storedPosts);
  }
}

function createPost() {
  // Ifall fälten är tomma skapar den inte en ny post.
  if (inputTitle.value === "" || inputBody.value === "" || inputTags.value === "") {
    return;
  }

  //gör inlägget till ett objekt för local storage
  let createPostObjekt = {
    title: inputTitle.value,
    body: inputBody.value,
    tags: inputTags.value,
    reactions: 0,
  }

  postsArray = [createPostObjekt];

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

  postContainer.prepend(divContainer);
  divContainer.append(titleDiv, pBody, reactBtn);
  titleDiv.append(h2, tagDiv);

  h2.innerText = createPostObjekt.title;
  pBody.innerText = createPostObjekt.body;
  tagDiv.innerText = "Tags: " + createPostObjekt.title;
  reactBtn.innerText = createPostObjekt.reactions;

  // Gör så att fälten är tomma efter att man har skapat ett inlägg
  inputTitle.value = "";
  inputBody.value = "";
  inputTags.value = "";

  saveToLocalStorage();
}


getPosts(renderPosts);
loadFromLocalStorage();

inputBtn.addEventListener("click", createPost)
