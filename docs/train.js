const game = require('./game');
const data = require('./data');

game.Configs.epsilon = 0.5
game.Configs.pipeInterval = 2600
game.Configs.alpha = 0.1
game.Configs.birdRadius = 28

game.Emulator.run(data.data, function (dump) {
    var fs = require('fs');
    fs.writeFileSync("data.js", "var data = '" + dump + "';\r\n(function (exports) { exports.data = data; }(typeof exports === 'undefined' ? {} : exports));");
});