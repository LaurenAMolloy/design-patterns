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
    console.log("Response Data",response.data)
};

//Delaying Search Inputs
//Using setTimout
const input = document.querySelector("input");
let timeOutId;
const onInput = e => {
    //On second keypress timeOutid will exist
    if(timeOutId){
        clearTimeout(timeOutId);
    }
    //In 1 second call fetch data
    timeOutId = setTimeout(() => {
    fetchDataAxios(e.target.value);
    }, 500);
}
input.addEventListener("input", onInput);
