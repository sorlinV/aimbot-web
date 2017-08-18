let http = require('http');
let url = require('url');
let fs = require("fs");
var five = require("johnny-five");

let board = new five.Board({ port: '/dev/ttyUSB0' });

var max_speed_l = 150;
var max_speed_r = 140;

let l_motor = null;
let r_motor = null;

board.on("ready", function(err) {
    if (err) {
        console.log(err);
        return;
    }
    l_motor = new five.Motor({ pins: { pwm: 6, dir: 7 } });
    r_motor = new five.Motor({ pins: { pwm: 5, dir: 4 } });
});
let speed = 0;

http.createServer(function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (req.url.split('?')[0] === "/forward") {
        //res.write(JSON.stringify(out));
        l_motor.reverse(max_speed_l);
        r_motor.forward(max_speed_r);
        console.log('forward');
        res.end(); //end the response
    } else if (req.url.split('?')[0] === "/back") {
        r_motor.reverse(max_speed_r);
        l_motor.forward(max_speed_l);
        console.log('back');
        res.end(); //end the response
    } else if (req.url.split('?')[0] === "/left") {
        l_motor.forward(max_speed_l);
        r_motor.forward(max_speed_r);
        console.log('left');
        res.end(); //end the response
    } else if (req.url.split('?')[0] === "/right") {
        r_motor.reverse(max_speed_r);
        l_motor.reverse(max_speed_l);
        console.log('right');
        res.end(); //end the response
    } else if (req.url.split('?')[0] === "/stop") {
        l_motor.stop();
        r_motor.stop();
        console.log('stop');
        res.end(); //end the response
    } else if (req.url.split('?')[0] === "/song") {
        console.log("song");
        var piezo = new five.Piezo(8);
        let song = [];
        fs.readFile('song.json', 'utf-8', function(error, data) {
            data = JSON.parse(data);
            for (let i = 0; i < data.notes.length; i++) {
                let array = [];
                array.push(data.notes[i], data.durations[i]);
                song.push(array);
            }
            piezo.play({
                song: song,
                tempo: 62.5
            });
        });
    } else {
        res.write(req.url + ' 404 NOT FOUND');
        res.end(); //end the response
    }
}).listen(8080); //the server object listens on port 8080