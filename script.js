let title = document.querySelector(".title");
let content = document.querySelector(".content");
let postContainer = document.getElementById("post-container");
let postsTitle = document.getElementById("posts-title");
let postsArray = [];


// Hämtar alla posts
function getPosts(callback) {
  fetch('https://dummyjson.com/posts')
    .then(res => res.json())
    .then(function(json) {
      callback(json.posts);
    });
}


function renderPosts(posts) {
  for(let i = 0; i < posts.length; i++) {
    postsArray.push(posts[i]);

    let div = document.createElement("div");
    div.classList.add("posts");
    postContainer.append(div);
    
    let h2 = document.createElement("h2");
    h2.classList.add("title");
    div.append(h2);

    let pBody = document.createElement("p");
    pBody.classList.add("content");
    div.append(pBody);

    h2.innerText = postsArray[i].title;
    
    pBody.innerText = postsArray[i].body;
  }
}


// Renderar de 5 nyaste inläggen under "Latest posts" på vänster sida.
function renderLatest(posts) {
  for(let i = 0; i < 5 ; i++) {
    postsArray.push(posts[i].title);

    let pLatest = document.createElement("p");
    pLatest.classList.add("left-titles");
    postsTitle.append(pLatest);

    pLatest.innerText = postsArray[i].title
  }
}


getPosts(renderPosts);

getPosts(renderLatest);



