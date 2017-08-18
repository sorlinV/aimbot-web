document.body.addEventListener("keyress", function(event) {
    if (event.key === "z") {
        doFetch("http://192.168.1.130:8080/forward");
    }
    if (event.key === "q") {
        doFetch("http://192.168.1.130:8080/left");
    }
    if (event.key == "s") {
        doFetch("http://192.168.1.130:8080/back");
    }
    if (event.key == "d") {
        doFetch("http://192.168.1.130:8080/right");
    }
    if (event.keyCode == 38) {
        doFetch("http://192.168.1.130:8080/speed");
    }
    if (event.keyCode == 40) {
        doFetch("http://192.168.1.130:8080/slow");
    }
});

function doFetch(url) {
    fetch(url).then(function(response) {
        return response;
    }).then(function(obj) {
        console.log(obj);
    }).catch(function(error) {
        console.error(error);
    });
}