if (!isMobile.any()) {
    document.body.addEventListener("keydown", function(event) {
        // move front
        if (event.key === "z") {
            doFetch("http://192.168.1.130:8181/forward");
        }
        // move right
        if (event.key == "d") {
            doFetch("http://192.168.1.130:8181/right");
        }
        // move back
        if (event.key == "s") {
            doFetch("http://192.168.1.130:8181/back");
        }
        // move left
        if (event.key === "q") {
            doFetch("http://192.168.1.130:8181/left");
        }

        // if (event.keyCode == 32) {
        //     doFetch("http://192.168.1.130:8181/stop");
        // }

        // play horn
        if (event.key == "p") {
            doFetch("http://192.168.1.130:8181/song");
        }
    });

    // stop request
    document.body.addEventListener("keyup", function(event) {
        if (event.key === "z") {
            doFetch("http://192.168.1.130:8181/stop");
        }
        if (event.key === "q") {
            doFetch("http://192.168.1.130:8181/stop");
        }
        if (event.key == "s") {
            doFetch("http://192.168.1.130:8181/stop");
        }
        if (event.key == "d") {
            doFetch("http://192.168.1.130:8181/stop");
        }
    });
} else {
    // MOBILE VERSION

    // move forward request
    document.querySelector("#but1").addEventListener("touchstart", function() {
        doFetch("http://192.168.1.130:8181/forward");
    });
    document.querySelector("#but1").addEventListener("touchend", function()  {
        console.log('avant');
        doFetch("http://192.168.1.130:8181/stop");
    });


    // move right request
    document.querySelector("#but2").addEventListener("touchstart", function() {
        doFetch("http://192.168.1.130:8181/right");
    });
    document.querySelector("#but2").addEventListener("touchend", function()  {
        doFetch("http://192.168.1.130:8181/stop");
    });


    // move back request
    document.querySelector("#but3").addEventListener("touchstart", function() {
        doFetch("http://192.168.1.130:8181/back");
    });
    document.querySelector("#but3").addEventListener("touchend", function()  {
        doFetch("http://192.168.1.130:8181/stop");
    });


    // move left request
    document.querySelector("#but4").addEventListener("touchstart", function() {
        doFetch("http://192.168.1.130:8181/left");
    });
    document.querySelector("#but4").addEventListener("touchend", function()  {
        doFetch("http://192.168.1.130:8181/stop");
    });

    // document.querySelector("#but5").addEventListener("click", function() {
    //     doFetch("http://192.168.1.130:8181/stop");
    // });

    // play horn request
    document.querySelector("#but6").addEventListener("click", function() {
        doFetch("http://192.168.1.130:8181/song");
    });
}

setInterval(function() {
    fetch("http://192.168.1.130:8181/result").then(function(response) {
        return response.text();
    }).then(function(obj) {
        console.log(obj);
        document.querySelector("#dist").textContent = "Distance avant l'obstacle le plus proche : " + obj + "cm";
    }).catch(function(error) {
        console.log(error);
    });
}, 100);

function doFetch(url) {
    fetch(url).then(function(response) {
        return response;
    }).then(function(obj) {
        console.log(obj);
    }).catch(function(error) {
        console.error(error);
    });
}