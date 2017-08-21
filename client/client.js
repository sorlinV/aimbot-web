if (!isMobile.any()) {
    document.body.addEventListener("keydown", function(event) {
        // move front
        if (event.key === "z") {
            doFetch("http://192.168.1.130:8080/forward");
        }
        // move right
        if (event.key == "d") {
            doFetch("http://192.168.1.130:8080/right");
        }
        // move back
        if (event.key == "s") {
            doFetch("http://192.168.1.130:8080/back");
        }
        // move left
        if (event.key === "q") {
            doFetch("http://192.168.1.130:8080/left");
        }

        // if (event.keyCode == 32) {
        //     doFetch("http://192.168.1.130:8080/stop");
        // }

        // play horn
        if (event.key == "p") {
            doFetch("http://192.168.1.130:8080/song");
        }
    });

    // stop request
    document.body.addEventListener("keyup", function(event) {
        if (event.key === "z") {
            doFetch("http://192.168.1.130:8080/stop");
        }
        if (event.key === "q") {
            doFetch("http://192.168.1.130:8080/stop");
        }
        if (event.key == "s") {
            doFetch("http://192.168.1.130:8080/stop");
        }
        if (event.key == "d") {
            doFetch("http://192.168.1.130:8080/stop");
        }
    });
} else {
    // MOBILE VERSION

    // move forward request
    document.querySelector("#but1").addEventListener("touchstart", function() {
        doFetch("http://192.168.1.130:8080/forward");
    });
    document.querySelector("#but1").addEventListener("touchend", function()  {
        console.log('avant');
        doFetch("http://192.168.1.130:8080/stop");
    });


    // move right request
    document.querySelector("#but2").addEventListener("touchstart", function() {
        doFetch("http://192.168.1.130:8080/right");
    });
    document.querySelector("#but2").addEventListener("touchend", function()  {
        doFetch("http://192.168.1.130:8080/stop");
    });


    // move back request
    document.querySelector("#but3").addEventListener("touchstart", function() {
        doFetch("http://192.168.1.130:8080/back");
    });
    document.querySelector("#but3").addEventListener("touchend", function()  {
        doFetch("http://192.168.1.130:8080/stop");
    });


    // move left request
    document.querySelector("#but4").addEventListener("touchstart", function() {
        doFetch("http://192.168.1.130:8080/left");
    });
    document.querySelector("#but4").addEventListener("touchend", function()  {
        doFetch("http://192.168.1.130:8080/stop");
    });

    // document.querySelector("#but5").addEventListener("click", function() {
    //     doFetch("http://192.168.1.130:8080/stop");
    // });

    // play horn request
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