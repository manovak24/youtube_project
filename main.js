const searchTerm = document.getElementById('search-term');
const submitBtn = document.getElementById('submit-btn');

submitBtn.addEventListener('click', () => {
    console.log(searchTerm.value)
})




// const youtubeKey = config.YOUTUBE_API;
// YouTube+Data+API%20 most likely will be turned into the search term but will need to look into this more
// const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=surfing&key=${youtubeKey}`;
// const xhttp = new XMLHttpRequest();
// xhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//        // Typical action to be performed when the document is ready:
//     // document.getElementById("demo").innerHTML = xhttp.responseText;
//     // console.log(xhttp.responseText);
//     // console.log(typeof xhttp.responseText);

//     const dataSet = JSON.parse(xhttp.responseText)
//     console.log(dataSet)
//     const test = `https://www.youtube.com/watch?v=${dataSet.items[0].id.videoId}`;
//     console.log(test)

//     const div = document.getElementById('demo');
//     const link = document.createElement('a');
//     link.href = test;
//     link.innerText = "testing testing, is this thing on??"

//     div.appendChild(link);

//     }
// };
// xhttp.open("GET", url, true);
// xhttp.send();