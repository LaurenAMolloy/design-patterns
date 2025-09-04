//Debounce Helper
//Pass a callback
//Return a function aswell a wrapper to restrict the original
//Delaying Search Inputs
//Using setTimout
//Debouncing - Wait for time to pass before we run the function
//Other scenarios 
const debounce = (func, delay=1000) => {
    let timeOutId;
    return (...args) => {
        if(timeOutId){
            clearTimeout(timeOutId);
            console.log("Cleared timeout:", timeOutId);
        }
        timeOutId = setTimeout(() => {
            //Take all the arguments from the args array and pass them as singular arguments
            //This keeps track of how many arguments we need
           func.apply(null, args); 
           console.log("Executed timeout:", timeOutId);
        }, delay);
        console.log("New timeout set:", timeOutId);
    };
};