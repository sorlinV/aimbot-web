let http = require('http');
let url = require('url');
let fs = require("fs");
var five = require("johnny-five");

class bot {
    constructor(max_speed_l, max_speed_r) {
        this.max_speed_l, this.max_speed_l;
        this.max_speed_r, this.max_speed_r;
    }

    forward() {
        this.l_motor.reverse(this.max_speed_l);
        this.r_motor.forward(this.max_speed_r);
    }

    back() {
        this.l_motor.forward(this.max_speed_l);
        this.r_motor.reverse(this.max_speed_r);
    }

    left() {
        this.l_motor.forward(this.max_speed_l);
        this.r_motor.forward(this.max_speed_r);
    }

    right() {
        this.r_motor.reverse(this.max_speed_r);
        this.l_motor.reverse(this.max_speed_l);
    }

    stop() {
        this.l_motor.stop();
        this.r_motor.stop();
    }

    horn() {
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
    }
}

let board = new five.Board({ port: '/dev/ttyUSB0' });

var max_speed_l = 150;
var max_speed_r = 140;

let l_motor = null;
let r_motor = null;

bot = new bot(max_speed_l, max_speed_r);

board.on("ready", function(err) {
    if (err) {
        console.log(err);
        return;
    }
    bot.l_motor = new five.Motor({ pins: { pwm: 6, dir: 7 } });
    bot.r_motor = new five.Motor({ pins: { pwm: 5, dir: 4 } });
});
let speed = 0;


http.createServer(function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (req.url.split('?')[0] === "/forward") {
        bot.forward();
        res.end(); //end the response
    } else if (req.url.split('?')[0] === "/back") {
        bot.back();
        res.end(); //end the response
    } else if (req.url.split('?')[0] === "/left") {
        bot.left();
        res.end(); //end the response
    } else if (req.url.split('?')[0] === "/right") {
        bot.right();
        res.end(); //end the response
    } else if (req.url.split('?')[0] === "/stop") {
        bot.stop();
        res.end(); //end the response
    } else if (req.url.split('?')[0] === "/song") {
        bot.horn();
        res.end(); //end the response
        // } else if (req.url.split === "/") {

    } else {
        res.write(req.url + ' 404 NOT FOUND');
        res.end(); //end the response
    }
}).listen(8080); //the server object listens on port 8080