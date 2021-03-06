let http = require('http');
let url = require('url');
let fs = require("fs");
var five = require("johnny-five");

class bot {
    constructor(max_speed_l, max_speed_r) {
        this.max_speed_l, this.max_speed_l;
        this.max_speed_r, this.max_speed_r;
        this.vsonar = 0;
        this.l_eyes = 0;
        this.r_eyes = 0;
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

    sonar() {
        var proximity = new five.Proximity({
            freq: 1000,
            controller: "HCSR04",
            pin: 10
        });
        let self = this;
        proximity.on("data", function() {
            self.vsonar = this.cm;
        });
    }

    reflect() {
        let eyes = new five.IR.Reflect.Array({
            emitter: 13,
            pins: ["A3", "A2"], // any number of pins
            freq: 100,
            autoCalibrate: true,
        });
        let self = this;
        eyes.on('data', function() {
            self.l_eyes = this.raw.split(',')[0];
            self.r_eyes = this.raw.split(',')[1];
        });

        eyes.enable();
    }
}

let board = new five.Board({ port: '/dev/ttyUSB0' });

var max_speed_l = 480;
var max_speed_r = 480;

let l_motor = null;
let r_motor = null;

bot = new bot(max_speed_l, max_speed_r);
let range = 0;
board.on("ready", function(err) {
    if (err) {
        console.log(err);
        return;
    }
    bot.l_motor = new five.Motor({ pins: { pwm: 6, dir: 7 } });
    bot.r_motor = new five.Motor({ pins: { pwm: 5, dir: 4 } });
    bot.sonar();
    bot.reflect();
});

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
    } else if (req.url === "/") {
        fs.readFile(__dirname + '/../index.html', (err, data) => {
            if (err) throw err;
            res.write(data);
            res.end();
        });
    } else if (req.url === "/client/client.js") {
        fs.readFile(__dirname + '/../client/client.js', (err, data) => {
            if (err) throw err;
            res.write(data);
            res.end();
        });
    } else if (req.url === "/result") {
        let result = bot.vsonar;
        if (result > 500) {
            result = 0;
        }

        res.write( /*result.toString() + "\n   " +*/
            bot.l_eyes.toString() + '  :  ' + bot.r_eyes.toString());
        res.end();
    } else {
        res.write(req.url + ' 404 NOT FOUND');
        res.end(); //end the response
    }
}).listen(8181); //the server object listens on port 8181