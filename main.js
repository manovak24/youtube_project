const searchTerm = document.getElementById('search-term');
const submitBtn = document.getElementById('submit-btn');
const div = document.getElementById('demo');
const searchResults = document.querySelector('.search-results');
const youtubeKey = config.YOUTUBE_API;
let youtubeSeachTerm = '';

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

submitBtn.addEventListener('click', (e) => {
    youtubeSeachTerm = searchTerm.value;
    e.preventDefault();
    // console.log(youtubeSeachTerm)
    
    // YouTube+Data+API%20 most likely will be turned into the search term but will need to look into this more
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&order=rating&q=${youtubeSeachTerm}&maxResults=10&key=${youtubeKey}`;
        // console.log(url)
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            // console.log(xhttp.responseText);

                const dataSet = JSON.parse(xhttp.responseText)
                const data = dataSet.items;
                // console.log(data)

                for(let item in data) {
                    // const videoLink = document.createElement('a');
                    // videoLink.href = `https://www.youtube.com/watch?v=${dataSet.items[item].id.videoId}`;
                    // videoLink.innerText = `${dataSet.items[item].snippet.title}`;
                    // videoLink.target = '_blank';
                    // searchResults.appendChild(videoLink);

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
});


