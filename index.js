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

const fetchDataAxios = async (searchTerm) => {
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
};

const root = document.querySelector('.autocomplete');
root.innerHTML = `
    <label><b>Search For a Movie</b></label>
    <input name="input" class="input">
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>
`
const input = document.querySelector("input");
const dropdown = document.querySelector(".dropdown");
const resultsWrapper = document.querySelector(".results");

const onInput = async e => {
    //fetch is an async function
    //If we want to access the data we must treat it as async
    const movies = await fetchDataAxios(e.target.value);
    //console.log(movies);

    if(!movies.length){
        dropdown.classList.remove("is-active")
        return
    };

    //Remove any existing results
    resultsWrapper.innerHtml = "";

    dropdown.classList.add('is-active');
    //iterate over the movies
    for(let movie of movies)  {
        const option = document.createElement("a");
        const imgSrc = movie.Poster === 'N/A' ? "": movie.Poster;

        option.classList.add("dropdown-item");
        option.innerHTML = `
        <img src="${imgSrc}"/>
        ${movie.Title}
        `;

        option.addEventListener("click", () => {
            dropdown.classList.remove("is-active");
            input.value = movie.Title;
            //helper Function
            onMovieSelect(movie)
        });



        resultsWrapper.appendChild(option);
    }
};



//We could have used debounce in the event listener too
input.addEventListener("input", debounce(onInput, 1000));

//Events bubble
//If someone clicks on an element it triggers an event
//If an event is not handled there it will bubble!
document.addEventListener('click', e => {
    //console.log(e.target)
    if(!root.contains(e.target)){
        dropdown.classList.remove('is-active');
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

    console.log(response.data);
}
