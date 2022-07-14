const searchTerm = document.getElementById('search-term');
const searchForm = document.querySelector('.search-ctr');
const div = document.getElementById('demo');
const searchResults = document.querySelector('.search-results');
const youtubeKey = config.YOUTUBE_API;

// below variable only used if the two click event listeners are used
// const submitBtn = document.getElementById('submit-btn');

// function to format how the video displays amount of time ago video was posted
const timeAgo = (date) => {
    const epochs = [
        ['year', 31536000],
        ['month', 2592000],
        ['day', 86400],
        ['hour', 3600],
        ['minute', 60],
        ['second', 1]
    ];
    const getDuration = (timeAgoInSeconds) => {
        for (let [name, seconds] of epochs) {
            const interval = Math.floor(timeAgoInSeconds / seconds);
            if (interval >= 1) {
                return {
                    interval: interval,
                    epoch: name
                };
            }
        }
    };
    const timeAgoInSeconds = Math.floor((new Date() - new Date(date)) / 1000);
    const {interval, epoch} = getDuration(timeAgoInSeconds);
    const suffix = interval === 1 ? '' : 's';
    return `${interval} ${epoch}${suffix} ago`;
};

// function for the api request that is used in the event listeners
const eventHandler = (e) => {
    e.preventDefault();
    // using below to set searchResults to original state with nothing so the eventHandler function and be used more than once. This will clear previous search results when used after first time it is called
    searchResults.innerHTML = ``;
    
    let youtubeSeachTerm = searchTerm.value;
    // url below for api query search
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&order=rating&q=${youtubeSeachTerm}&maxResults=12&key=${youtubeKey}`;

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        // console.log(xhttp.responseText);
            const dataSet = JSON.parse(xhttp.responseText)
            const data = dataSet.items;
            for(let item in data) {
                const videoDiv = document.createElement('div');
                videoDiv.classList.add('result-ctr')
                videoDiv.innerHTML = `
                    <a href="https://www.youtube.com/watch?v=${dataSet.items[item].id.videoId}" target="_blank">
                        <img src="${dataSet.items[item].snippet.thumbnails.medium.url}" class="video-thumbnail">
                    </a>
                    <a href="https://www.youtube.com/watch?v=${dataSet.items[item].id.videoId}" target="_blank">
                        <h4>${dataSet.items[item].snippet.title}</h4>
                    </a>
                    <a href="https://www.youtube.com/c/${dataSet.items[item].snippet.channelTitle}" target="_blank">
                        <h5>${dataSet.items[item].snippet.channelTitle}</h5>
                    </a>
                    <p class="publish-time">${timeAgo(dataSet.items[item].snippet.publishTime)}</p>
                    
                `
                searchResults.appendChild(videoDiv);
            }
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

// event listener for the form that will handle both a click event and enter key press event
searchForm.addEventListener('submit', eventHandler);


// event listeners for the button that will fire for the click and enter key press
// submitBtn.addEventListener('click', eventHandler);
// submitBtn.addEventListener('click', function(e) {
//     if(e.key === 'Enter') {
//         eventHandler();
//     }
// });


