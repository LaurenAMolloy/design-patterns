const autoCompleteConfig = {
    renderOption(movie) {
        const imgSrc = movie.Poster === 'N/A' ? "": movie.Poster;
        return  `<img src="${imgSrc}" />
        ${movie.Title} (${movie.Year})
        `
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
}

createAutoComplete({
    //copy autoCompleteConfig
    ...autoCompleteConfig,
    root: document.querySelector("#left-autocomplete"), 
    onOptionSelect(movie){
        document.querySelector(".tutorial").classList.add("is-hidden");
        onMovieSelect(movie, document.querySelector('#left-summary'), "left");
    },
});
createAutoComplete({
    //copy autoCompleteConfig
    ...autoCompleteConfig,
    root: document.querySelector("#right-autocomplete"),
    onOptionSelect(movie){
        document.querySelector(".tutorial").classList.add("is-hidden");
        onMovieSelect(movie, document.querySelector('#right-summary'), "right");
    }, 
});

let leftMovie;
let rightMovie;
const onMovieSelect = async (movie, summaryElement, side ) => {
    const response = await axios.get("http://www.omdbapi.com/", {
        params: {
           apikey: "be9e5da5",
           //s: searchTerm
           i: movie.imdbID
        }
    });

    //console.log(response.data);
    summaryElement.innerHTML = movieTemplate(response.data);
    if(side === "left"){
        leftMovie = response.data;
    } else {
        rightMovie = response.data;
    }

    if(leftMovie && rightMovie) {
        runComparison();
    }
};

const runComparison = () => {
    //console.log("time for comparison");
    //How to compare?
    //Reach into the dom
    //Find the first to compare
    //We could break our app vey easily if we relied on the order of the stats
    //If we ever changed it would mean alot of refactoring
    //We do not want to rely on the order
    //We can look at the data property!
    //iterate over and apply classes to the highest
    //left summary
    //right summary
    const leftStats = document.querySelectorAll("#left-summary .notification");
    const rightStats = document.querySelectorAll("#right-summary .notification");

    leftStats.forEach((leftStat, index) => {
        const rightStat = rightStats[index];

        const leftSideValue = parseInt(leftStat.dataset.value);
        const rightSideValue = parseInt(rightStat.dataset.value);

        if(rightSideValue > leftSideValue) {
            leftStat.classList.remove('is-primary');
            leftStat.classList.add('is-warning')
        } else {
            rightStat.classList.remove('is-primary');
            rightStat.classList.add('is-warning')
        }
    });
}

const movieTemplate = movieDetail => {
    //covert properties to number
    const dollars = parseInt(movieDetail.BoxOffice.replace(/\$/g, "").replace(/,/g, ""));

    const metaScore = parseInt(movieDetail.Metascore);
    const imdbRating = parseFloat(movieDetail.imdbRating);
    const imdbVotes = parseFloat(movieDetail.imdbVotes);

    //Extract using reduce
    const awards = movieDetail.Awards.split(" ").reduce((prev, word) => {
        const value = parseInt(word);

        if(isNaN(value)){
            return prev;
        } else {
            return prev + value;
        }
    }, 0);
    console.log("awards", awards);

    console.log(dollars, imdbRating, imdbVotes);

    return `
    <article class="media">
      <figure class="media-left">
        <p class="image">
          <img src="${movieDetail.Poster}" />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <h1>${movieDetail.Title}</h1>
          <h4>${movieDetail.Genre}</h4>
          <p>${movieDetail.Plot}</p>
        </div>
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
      <p class="subtitle">Metascore</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.imdbRating}</p>
      <p class="subtitle">IMDB Rating</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.imdbVotes}</p>
      <p class="subtitle">IMDB Votes</p>
    </article>
  `;
};