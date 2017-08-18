if (!isMobile.any()) {
    document.body.addEventListener("keydown", function(event) {
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
        if (event.keyCode == 32) {
            doFetch("http://192.168.1.130:8080/stop");
        }
        if (event.key == "p") {
            doFetch("http://192.168.1.130:8080/song");
        }
    });
} else {
    document.querySelector("#but1").addEventListener("click", function() {
        doFetch("http://192.168.1.130:8080/forward");
    });
    document.querySelector("#but2").addEventListener("click", function() {
        doFetch("http://192.168.1.130:8080/right");
    });
    document.querySelector("#but3").addEventListener("click", function() {
        doFetch("http://192.168.1.130:8080/back");
    });
    document.querySelector("#but4").addEventListener("click", function() {
        doFetch("http://192.168.1.130:8080/left");
    });
    document.querySelector("#but5").addEventListener("click", function() {
        doFetch("http://192.168.1.130:8080/stop");
    });
    document.querySelector("#but6").addEventListener("click", function() {
        doFetch("http://192.168.1.130:8080/song");
    });
}

function doFetch(url) {
    fetch(url).then(function(response) {
        return response;
    }).then(function(obj) {
        console.log(obj);
    }).catch(function(error) {
        console.error(error);
    });
}