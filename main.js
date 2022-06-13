const searchTerm = document.getElementById('search-term');
const submitBtn = document.getElementById('submit-btn');
const div = document.getElementById('demo');
const searchResults = document.getElementById('search-results');
const youtubeKey = config.YOUTUBE_API;
let youtubeSeachTerm = '';

submitBtn.addEventListener('click', (e) => {
    youtubeSeachTerm = searchTerm.value;
    e.preventDefault();
    // console.log(youtubeSeachTerm)
    
    // YouTube+Data+API%20 most likely will be turned into the search term but will need to look into this more
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${youtubeSeachTerm}&key=${youtubeKey}`;
        console.log(url)
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            // console.log(xhttp.responseText);

            const dataSet = JSON.parse(xhttp.responseText)
            const data = dataSet.items;
            console.log(data)

            for(let item in data) {
                // const title = document.createElement('h5');
                // title.innerText = `${dataSet.items[item].snippet.title}`;
                // searchResults.appendChild(title);

                const videoLink = document.createElement('a');
                videoLink.href = `https://www.youtube.com/watch?v=${dataSet.items[item].id.videoId}`;
                videoLink.innerText = `${dataSet.items[item].snippet.title}`;
                videoLink.target = '_blank';
                searchResults.appendChild(videoLink);
            }
            // const test = `https://www.youtube.com/watch?v=${dataSet.items[0].id.videoId}`;
            // link.href = test;
            // link.innerText = 'Hello World';
        
    

            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
});


