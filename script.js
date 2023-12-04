let postContainer = document.getElementById("post-container");
let postsTitle = document.getElementById("posts-title");
let postsArray = [];



// Hämtar alla posts
function getPosts(callback) {
  fetch('https://dummyjson.com/posts')
    .then(res => res.json())
    .then(function (json) {
      callback(json.posts);
    });
}


let inputTitle = document.getElementById("input-title");
let inputBody = document.getElementById("input-body");
let inputTags = document.getElementById("input-tags");
let inputBtn = document.getElementById("input-btn");

inputBtn.addEventListener("click", function(){
  let divContainer = document.createElement("div");
    divContainer.classList.add("posts");
    postContainer.append(divContainer);

    let titleDiv = document.createElement("div");
    titleDiv.classList.add("title");
    divContainer.append(titleDiv);

    let h2 = document.createElement("h2");
    titleDiv.append(h2);

    let pBody = document.createElement("p");
    pBody.classList.add("content");
    divContainer.append(pBody);

    let tagDiv = document.createElement("div");
    tagDiv.classList.add("div-tag");
    titleDiv.append(tagDiv);


    h2.innerText = inputTitle.value;
    pBody.innerText = inputBody.value;

    tagDiv.innerText = "Tags: " + inputTags.value;
    
  inputTitle.value = "";
  inputBody.value = "";
  inputTags.value = "";
});

//Renderar Posts
function renderPosts(posts) {
  for (let i = 0; i < posts.length; i++) {
   postsArray.push(posts[i]);

    let divContainer = document.createElement("div");
    divContainer.classList.add("posts");
    postContainer.append(divContainer);

    let titleDiv = document.createElement("div");
    titleDiv.classList.add("title");
    divContainer.append(titleDiv);

    let h2 = document.createElement("h2");
    titleDiv.append(h2);

    let pBody = document.createElement("p");
    pBody.classList.add("content");
    divContainer.append(pBody);

    let tagDiv = document.createElement("div");
    tagDiv.classList.add("div-tag");
    titleDiv.append(tagDiv);


    h2.innerText = postsArray[i].title;

    pBody.innerText = postsArray[i].body;

    tagDiv.innerText = "Tags: " + postsArray[i].tags;

  }
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




