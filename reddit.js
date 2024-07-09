export default {
    search: function(searchTerm, searchLimit, sortBy) {
      console.log(`Searching for ${searchTerm} with limit ${searchLimit} and sort by ${sortBy}`);
      return fetch(`http://www.reddit.com/search.json?q=${searchTerm}&sort=${sortBy}&limit=${searchLimit}`)
       .then(res => res.json())
       .then(data => data.data.children.map(data => data.data));
    }
  }