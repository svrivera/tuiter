// Variables


const tweetsList = document.getElementById('lista-tweets');




// EventListeners


eventListeners();

function eventListeners(){
    // Sending tweet form
    document.getElementById('formulario').addEventListener('submit', createTweet);
    // Deleting tweet from tweetsList
    tweetsList.addEventListener('click', deleteTweet);
    // Loading tweets from localStorage
    document.addEventListener('DOMContentLoaded', loadLocalStorage);
}




// Functions


// Adds tweet to tweet list
function createTweet(e) {
    // Prevents default action
    e.preventDefault();
    // Gets text content from form
    const tweet = document.getElementById('tweet').value;
    // Creates Delete boton
    const deleteTweetBtn = document.createElement('a');
    deleteTweetBtn.className = 'borrar-tweet';
    deleteTweetBtn.innerText = 'X';
    // Creates tweet
    const newTweet = document.createElement('li');
    newTweet.innerText = tweet;
    // Adds delete boton to liTweet
    newTweet.appendChild(deleteTweetBtn);
    // Adds tweet to tweetsList
    tweetsList.appendChild(newTweet);
    // Adds tweet to localStorage
    addTweetLocalStorage(tweet);

}

// Deletes tweet from tweetsList
function deleteTweet(e) {
    let tweet 
    // Prevents default action
    e.preventDefault();
    // Prevents element delegation to parent
    if (e.target.className === 'borrar-tweet') {
        if (confirm('¿Seguro que quieres eliminar el Tweet?')) {
            // Deletes tweet
            e.target.parentElement.remove();
            // Notify's the user
            alert('Tweet eliminado');
            // Delete the tweet from local storage
            deleteTweetLocalStorage(e.target.parentElement.textContent);
        }
    }
}

// Gets tweets stored on localStorage
function getTweetsLocalStorage() {
    let tweets;
    if (localStorage.getItem('tweets') === null) {
        tweets = [];
    } 
    else {
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets;
}

// Adds tweet to localStorage
function addTweetLocalStorage(tweet) {
    const tweets = getTweetsLocalStorage();
    tweets.push(tweet);
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Loads localStorage on tweetsList
function loadLocalStorage() {
    let tweets = getTweetsLocalStorage();
    tweets.forEach(tweet => {
        // Creates Delete boton
        const deleteTweetBtn = document.createElement('a');
        deleteTweetBtn.className = 'borrar-tweet';
        deleteTweetBtn.innerText = 'X';
        // Creates tweet
        const newTweet = document.createElement('li');
        newTweet.innerText = tweet;
        // Adds delete boton to liTweet
        newTweet.appendChild(deleteTweetBtn);
        // Adds tweet to tweetsList
        tweetsList.appendChild(newTweet);
    });
}

// Deletes tweet from localStorage
function deleteTweetLocalStorage(content) {
    const toDelTweet = content.substring(0,content.length - 1)
    let tweets = getTweetsLocalStorage();
    console.log(tweets);
    tweets.forEach((tweet, index) => {
        console.log(tweet);
        if (tweet === toDelTweet) {
            tweets.splice(index, 1);
        }  
    });
    localStorage.setItem('tweets', JSON.stringify(tweets));
}