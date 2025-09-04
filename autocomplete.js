const createAutoComplete = ({ root, renderOption, onOptionSelect, inputValue, fetchData }) => {
    root.innerHTML = `
        <label><b>Search</b></label>
        <input name="input" class="input">
        <div class="dropdown">
            <div class="dropdown-menu">
                <div class="dropdown-content results"></div>
            </div>
        </div>
    `
const input = root.querySelector("input");
const dropdown = root.querySelector(".dropdown");
const resultsWrapper = root.querySelector(".results");

const onInput = async e => {
    //fetch is an async function
    //If we want to access the data we must treat it as async
    const items = await fetchData(e.target.value);
    //console.log(movies);

    if(!items.length){
        dropdown.classList.remove("is-active")
        return
    };

    //Remove any existing results
    resultsWrapper.innerHtml = "";

    dropdown.classList.add('is-active');
    //iterate over the movies
    for(let item of items)  {
        const option = document.createElement("a");
        
        option.classList.add("dropdown-item");
        option.innerHTML = renderOption(item);

        option.addEventListener("click", () => {
            dropdown.classList.remove("is-active");
            input.value = inputValue(item);
            //helper Function
            onOptionSelect(item);
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

}