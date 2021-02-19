var game = {
	number1: {
		total: 1,
		add: .01,
		divide: 1.001,
		original: .01,
	},
	number2: {
		total: 0,
		add: .001,
		divide: 1.001,
		original: .001,
	},
	result: 1,
	upgrade1: {
		firstUpgrade: 11,
		secondUpgrade: 1,
		level: 1
	}
}

function calculate() {
	game.number1.total = Decimal.times(game.number1.add, game.upgrade1.level).add(game.number1.total);
	game.number1.add = Decimal.div(game.number1.add, game.number1.divide);
	game.number2.total = Decimal.add(game.number2.add, game.number2.total);
	game.number2.add = Decimal.div(game.number2.add, game.number2.divide);
	game.result = Decimal.pow(game.number1.total, game.number2.total);
};

function upgrade1() {
	if (Decimal.compare(game.number1.total, game.upgrade1.firstUpgrade) >= 0) {
		if (Decimal.compare(game.number2.total, game.upgrade1.secondUpgrade) >= 0) {
			game.number1.total = Decimal.sub(game.number1.total, game.upgrade1.firstUpgrade);
			game.number2.total = Decimal.sub(game.number2.total, game.upgrade1.secondUpgrade);
			game.upgrade1.firstUpgrade = Decimal.pow(game.upgrade1.firstUpgrade, 1.075);
			if (Decimal.compare(game.upgrade1.level, 2) <= 0) {
				game.upgrade1.secondUpgrade = Decimal.times(game.upgrade1.secondUpgrade, 1.125);
			} else {
				game.upgrade1.secondUpgrade = Decimal.pow(game.upgrade1.secondUpgrade, 1.1).times(1.077);
			}
			game.number1.divide = Decimal.times(game.number1.divide, 1.0001)
			game.number2.divide = Decimal.times(game.number2.divide, 1.0001)
			game.number1.original = Decimal.times(game.number1.original, 1.35);
			game.number2.original = Decimal.times(game.number2.original, 1.35);
			game.number1.add = game.number1.original;
			game.number2.add = game.number2.original;
			game.upgrade1.level = Decimal.add(game.upgrade1.level, 1);
		}
	}
}

function notate(n) {
	n = new Decimal(n);
	var e = n.exponent;
	if (e < 3) return (n.mantissa * Math.pow(10, e)).toPrecision(3);
	return `${n.mantissa.toPrecision(3)}e${e.toLocaleString("pt-BR")}`;
};

function UpdateUI() {
	document.getElementById("result").innerHTML = `${notate(game.number1.total)}<sup>${(notate(game.number2.total))}</sup> = ${notate(game.result)}`;
	document.getElementById("Upgrade1").innerHTML = `Increase base and exponent addition. <br> Cost: Base: ${notate(game.upgrade1.firstUpgrade)} <br> Exponent: ${notate(game.upgrade1.secondUpgrade)} <br> Level: ${game.upgrade1.level}`
}

var mainGameLoop = window.setInterval(function () {
	calculate()
}, 10)

var mainGameLoop = window.setInterval(function () {
	UpdateUI()
}, 10)
