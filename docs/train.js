const game = require('./game');
const data = require('./data');

// change parameters if necessary
game.Configs.epsilon = 0.5
game.Configs.alpha = 0.01
// game.Configs.pipeInterval = 3000
// game.Configs.birdRadius = 28

// update date data.js
game.Emulator.run(data.data, function (dump) {
    var fs = require('fs');
    fs.writeFileSync("data.js", "var data = '" + dump + "';\r\n(function (exports) { exports.data = data; }(typeof exports === 'undefined' ? {} : exports));");
});