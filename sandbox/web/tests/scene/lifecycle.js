ex.Logger.getInstance().defaultLevel = 0 /* Debug */;
var game = new ex.Engine(300, 300, "game");
var scene2 = new ex.Scene();
game.add("scene2", scene2);
var actor1 = new ex.Actor(60, 60, 20, 20, ex.Color.Blue);
game.add(actor1);
var actor2 = new ex.Actor(60, 60, 20, 20, ex.Color.Red);
scene2.add(actor2);
game.start();
document.getElementById("goToScene").addEventListener("click", function () { return game.goToScene("scene2"); });
//# sourceMappingURL=lifecycle.js.map