//Challenges
//Grab Data
//Autocomplete widget from scratch
//How can we style this app?

//Fetching movie data
//Network Request
//Fetch or axios
//Fetch rejects on network errors not http errors
const APIKEY = "be9e5da5"

async function fetchMovieData() {
try {
    const url = `http://www.omdbapi.com/?apikey=${APIKEY}&s=avengers`
    //Retrieve movie data
    //Wait for promise to settle
    const response = await fetch(url);
    //check if response is ok
    if(!response.ok) {
        throw new Error(`Resonse status: ${response.status}`);
    }
    const result = await response.json();
    console.log(result);
    //Ignore catch if try is successful
    //An error inside try will not halt the script
} catch(error) {
    //error handling
    console.log(error.message)
}
}

//fetchMovieData();

//Fetching a single movie
//Auto Parsing
//Rejects the promise outside 2xx range
//Auto complete widget
//Searching the API



createAutoComplete({
    root: document.querySelector('.autocomplete'),
    renderOption(movie) {
        const imgSrc = movie.Poster === 'N/A' ? "": movie.Poster;
        return  `<img src="${imgSrc}" />
        ${movie.Title} (${movie.Year})
        `
    },
    onOptionSelect(movie){
        onMovieSelect(movie);
    },
    inputValue(movie){
        return movie.Title
    },
    async fetchData(searchTerm) {
        const response = await axios.get("http://www.omdbapi.com/", {
            params: {
               apikey: "be9e5da5",
               s: searchTerm
               //i: "tt0848228"
            }
        });
        //If there is an error then return an empty array
        if (response.data.Error){
            return [];
        }
        //console.log("Response Data",response.data);
        //response has capital s = this is non standard
        return response.data.Search
    }
});


const onMovieSelect = async movie => {
    const response = await axios.get("http://www.omdbapi.com/", {
        params: {
           apikey: "be9e5da5",
           //s: searchTerm
           i: "tt0848228"
        }
    });
    //console.log(response.data);
    document.querySelector('#summary').innerHTML = movieTemplate(response.data)
};

const movieTemplate = (movieDetail) => {
    return `
    <article class="media">
    <figure class="media-left">
        <p class=image>
        <img src="${movieDetail.Poster}" />
        </p>
    </figure>
    <div class="media-content></div>
    <div class="content>
    <h1>${movieDetail.Title}</h1>
    <h4>${movieDetail.Genre}</h4>
    <p>${movieDetail.Plot}</p>
    </div>
    </article>
    <article class="notification is-primary">
    <p class="title">${movieDetail.Awards}</p>
    <p class="subtitle">Awards</p>
    </article>
    <article class="notification is-primary">
    <p class="title">${movieDetail.BoxOffice}</p>
    <p class="subtitle">Box Office</p>
    </article>
    <article class="notification is-primary">
    <p class="title">${movieDetail.Metascore}</p>
    <p class="subtitle">Awards</p>
    </article>
    <article class="notification is-primary">
    <p class="title">${movieDetail.imdbRating}</p>
    <p class="subtitle">IMDB Rating</p>
    </article>
    <article class="notification is-primary">
    <p class="title">${movieDetail.imdbVotes}</p>
    <p class="subtitle">IMDB Votes</p>
    </article>
    

    `
};
