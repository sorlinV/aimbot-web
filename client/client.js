document.body.addEventListener("keydown", function(event) {
    if (event.key === "z") {
        doFetch("http://192.168.1.130/forward");
    }
    if (event.key === "q") {
        doFetch("http://192.168.1.130/left");
    }
    if (event.key == "s") {
        doFetch("http://192.168.1.130/back");
    }
    if (event.key == "d") {
        doFetch("http://192.168.1.130/right");
    }
    if (event.keyCode == 38) {
        doFetch("http://192.168.1.130/speed");
    }
    if (event.keyCode == 40) {
        doFetch("http://192.168.1.130/slow");
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