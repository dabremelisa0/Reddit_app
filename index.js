import reddit from './reddit.js';

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

// Form event listener
searchForm.addEventListener("submit", e => {
  // Get search term
  const searchTerm = document.getElementById("search-input").value;
  
  // Get sort value
  const sortBy = document.querySelector('input[name="SortBy"]:checked').value;
  // Get limit
  const searchLimit = document.getElementById("limit").value;
  
  // Check if search term is empty
  if (searchTerm === "") {
    // Show message
    showMessage("Please add the search term");
  }

  document.getElementById("search-input").value = ""; 
  
  //search reddit
  reddit.search(searchTerm, searchLimit, sortBy)
  .then(result =>{
    console.log(result);
    
    //check for imageOrientation: 
    //let image=post .preview ? post.preview.image[0]
    
    let output = '<div class="card-columns">';
    
    //loACop through the post 
    
    
    result.forEach(post => {
        
        output += `
          <div class="">
            <div class="card-body">
              <h5 class="card-title">${post.subreddit} - Posted by ${post.author_fullname}</h5>
              <p class="card-text">${truncateString(post.selftext, 100)}</p>
              <img src="${post.thumbnail ? post.thumbnail : 'https://upload.wikimedia.org/wikipedia/commons/4/43/Reddit_logo.svg'}" alt="Post thumbnail" class="card-img-top img-fluid img-thumbnail" style="max-width: 100px; height: auto;">
             <a href="${post.url}" target="_blank
        " class="btn btn-primary">Read More</a>
        <hr>
            </div>
          </div>
        `;
      });
    output += '</div>'
    document.getElementById("results").innerHTML=output;

  });
  
  e.preventDefault();
});

function showMessage(message) {
  // Create div for alert
  const div = document.createElement("div");
  div.className = `alert alert-danger`;  
  div.appendChild(document.createTextNode(message));
  
  // Get container where message should be shown
  const searchContainer = document.getElementById('search-container');
  
  // Insert alert div at the top of the container
  searchContainer.insertBefore(div, searchContainer.firstChild);

  //timeout for alert
  setTimeout(() => {              
    div.remove();
  }, 3000)
}

function truncateString(myString, limit) {
    const shortened = myString.indexOf(' ', limit);
    if (shortened == -1) return myString;
    return myString.substring(0, shortened);
  }