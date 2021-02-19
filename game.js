var game = {
	number1: {
		total: 1,
		add: .01,
		divide: 1.0005,
		original: .01,
	},
	number2: {
		total: 0,
		add: .001,
		divide: 1.0005,
		original: .001,
	},
	result: 1,
	upgrade1: {
		firstUpgrade: 20.951,
		secondUpgrade: 1.99,
		level: 1
	},
	upgrade2: {
		firstUpgrade: 1e7,
		secondUpgrade: 431,
		level: 1
	},
}

var onLoadClick = 0;

function calculate() {
	game.number1.total = Decimal.times(game.number1.add, game.upgrade1.level).add(game.number1.total);
	game.number1.add = Decimal.div(game.number1.add, game.number1.divide);
	game.number2.total = Decimal.add(game.number2.add, game.number2.total);
	game.number2.add = Decimal.div(game.number2.add, game.number2.divide);
	game.result = Decimal.pow(game.number1.total, game.number2.total);
	if (Decimal.compare(game.upgrade1.level, 2) >= 0) {
		game.result = Decimal.pow(game.number1.total.toFixed(1), game.number2.total.toFixed(2));
	} if (Decimal.compare(game.upgrade1.level, 4) >= 0) {
		game.result = Decimal.pow(game.number1.total.toFixed(0), game.number2.total.toFixed(0));
	}
};

function upgrade1() {
	if (Decimal.compare(game.number1.total, game.upgrade1.firstUpgrade) >= 0) {
		if (Decimal.compare(game.number2.total, game.upgrade1.secondUpgrade) >= 0) {
			game.number1.total = Decimal.sub(game.number1.total, game.upgrade1.firstUpgrade);
			game.number2.total = Decimal.sub(game.number2.total, game.upgrade1.secondUpgrade);
			game.upgrade1.firstUpgrade = Decimal.pow(game.upgrade1.firstUpgrade, 1.0375);
			if (Decimal.compare(game.upgrade1.level, 2) <= 0) {
				game.upgrade1.secondUpgrade = Decimal.times(game.upgrade1.secondUpgrade, 1.05);
			} else {
				game.upgrade1.secondUpgrade = Decimal.pow(game.upgrade1.secondUpgrade, 1.05).times(1.0385);
			}
			game.number1.divide = Decimal.times(game.number1.divide, 1.0000625)
			game.number2.divide = Decimal.times(game.number2.divide, 1.0000625)
			game.number1.original = Decimal.times(game.number1.original, 1.25);
			game.number2.original = Decimal.times(game.number2.original, 1.175);
			game.number1.add = game.number1.original;
			game.number2.add = game.number2.original;
			game.upgrade1.level = Decimal.add(game.upgrade1.level, 1);
		}
	}
}

function upgrade2() {
	if (Decimal.compare(game.number1.total, game.upgrade2.firstUpgrade) >= 0) {
		if (Decimal.compare(game.number2.total, game.upgrade1.secondUpgrade) >= 0) {
			game.number1.total = Decimal.sub(game.number1.total, game.upgrade2.firstUpgrade);
			game.number2.total = Decimal.sub(game.number2.total, game.upgrade2.secondUpgrade);
			game.upgrade2.firstUpgrade = Decimal.pow(game.upgrade2.firstUpgrade, 1.3);
			game.upgrade2.secondUpgrade = Decimal.pow(game.upgrade2.secondUpgrade, 1.5);
			game.number1.divide = Decimal.times(game.number1.divide, 1.000125)
			game.number2.divide = Decimal.times(game.number2.divide, 1.000125)
			game.number1.original = Decimal.times(game.number1.original, 1.35);
			game.number2.original = Decimal.times(game.number2.original, 1.35);
			game.number1.add = game.number1.original;
			game.number2.add = game.number2.original;
			game.upgrade2.level = Decimal.add(game.upgrade2.level, 1);
		}
	}
}

function notate(n) {
	n = new Decimal(n);
	var e = n.exponent;
	if (e < 3) return (n.mantissa * Math.pow(10, e)).toPrecision(3);
	if (e < 4) return (n.mantissa * Math.pow(10, e)).toFixed(0);
	return `${n.mantissa.toPrecision(3)}e${e.toLocaleString("pt-BR")}`;
};

function UpdateUI() {
	document.getElementById("result").innerHTML = `${notate(game.number1.total)}<sup>${(notate(game.number2.total))}</sup> = ${notate(game.result)}`;
	document.getElementById("Upgrade1").innerHTML = `Increase base and exponent addition. <br> Cost: Base: ${notate(game.upgrade1.firstUpgrade)} <br> Exponent: ${notate(game.upgrade1.secondUpgrade)} <br> Level: ${game.upgrade1.level}`;
	document.getElementById("Upgrade2").innerHTML = `Increase base and exponent addition. <br> Cost: Base: ${notate(game.upgrade2.firstUpgrade)} <br> Exponent: ${notate(game.upgrade2.secondUpgrade)} <br> Level: ${game.upgrade2.level}`;
}



var mainGameLoop = window.setInterval(function () {
	calculate()
}, 10)

var mainGameLoop = window.setInterval(function () {
	UpdateUI()
}, 10)

function loadGame() {
	onLoadClick += 1;
	var saveData = JSON.parse(localStorage.saveData || null) || {};
	game = saveData;
	console.log("Save loaded");
	return saveData.obj || "default";
}

function saveGame() {
	saveData = game;
	localStorage.saveData = JSON.stringify(saveData);
};
