const key = YOUTUBE;
const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=YouTube+Data+API%20&type=video&videoCaption=closedCaption&key=${key}`;
console.log(url)
const xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       document.getElementById("demo").innerHTML = xhttp.responseText;
    }
};
xhttp.open("GET", url, true);
xhttp.send();