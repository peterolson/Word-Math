var wordMath = (function ($) {
	var toFixed = function (x) {
		var negative = false;
		if (x < 0) { negative = true; x = -x; }
		if (x < 1.0) {
			var e = parseInt(x.toString().split('e-')[1]);
			if (e) {
				x *= Math.pow(10, e - 1);
				x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
			}
		} else {
			var e = parseInt(x.toString().split('+')[1]);
			if (e > 20) {
				e -= 20;
				x /= Math.pow(10, e);
				x += (new Array(e + 1)).join('0');
			}
		}
		return negative ? "-" + x : x;
	};

	var digits = {
		zero: 0,
		one: 1,
		two: 2,
		three: 3,
		four: 4,
		five: 5,
		six: 6,
		seven: 7,
		eight: 8,
		nine: 9,
		ten: 10,
		eleven: 11,
		twelve: 12,
		thirteen: 13,
		fourteen: 14,
		fifteen: 15,
		sixteen: 16,
		seventeen: 17,
		eighteen: 18,
		nineteen: 19,
		twenty: 20,
		thirty: 30,
		forty: 40,
		fourty: 40,
		fifty: 50,
		sixty: 60,
		seventy: 70,
		eighty: 80,
		ninety: 90,
		pi: Math.PI,
		e: Math.E
	};
	var place = function (n) { return Math.pow(1000, n); };
	var names = ["thousand", "million", "billion", "trillion", "quadrillion", "quintillion", "sextillion", "septillion",
		"octillion", "nonillion", "decillion", "undecillion", "duodecillion", "tredecillion", "quattuordecillion",
		"quindecillion", "sexdecillion", "septendecillion", "octodecillion", "novemdecillion", "vigintillion"];
	var places = {};

	for (var i = 0; i < names.length; i++) {
		var value = place(i + 1);
		places[names[i]] = value;
		var inverse = 1 / value;
		places[names[i] + "th"] = inverse;
	};

	places.tenth = 0.1;
	places.hundred = 100; places.hundredth = 0.01;

	for (var i in places) {
		if (!places.hasOwnProperty(i)) continue;
		places[i + "s"] = places[i];
	}

	var fillers = {
		"and": 0,
		"": 1
	};

	var negation = {
		minus: 0,
		negative: 1
	};

	var toString = function (n) {
		var ones = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
		var tens = [, "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
		var places = [''].concat(names);
		var decimals = ["tenth", "hundredth"];
		for (var i = 0; i < names.length; i++) {
			decimals.push(names[i] + "th");
			decimals.push("ten " + names[i] + "th");
			decimals.push("hundred " + names[i] + "th");
		}
		var str = toFixed(n).toString();
		var ret = [];
		var toString = function (str) {
			var ret = [], negative = false;
			if (str[str.length - 1] === "-") {
				negative = true;
				str = str.slice(0, -1);
			}
			var start = str.length - str.length % 3;
			for (var i = start; i >= 0; i -= 3) {
				var tmp = [];
				if (str[i + 2] > 0) tmp.push(ones[str[i + 2]], "hundred");
				if (str[i + 1] === "1") {
					var x = (str[i + 1] * 10) + +str[i];
					tmp.push(ones[x]);
				} else {
					if (str[i + 1] > 0) tmp.push(tens[str[i + 1]]);
					if (str[i] > 0) tmp.push(ones[str[i]]);
				}
				if (i > 0 && tmp.length) tmp.push(places[i / 3]);
				ret = ret.concat(tmp);
			}
			if (!ret.length) ret.push("zero");
			if (negative) ret.unshift("negative");
			return ret.join(" ");
		}
		str = str.split(".");
		ret.push(toString(str[0].split("").reverse().join("")));
		if (str[1]) {
			var s = str[1];
			for (var i = 0; i < s.length; i++) {
				if (s[i] < 1) continue;
				ret.push("and");
				ret.push(ones[s[i]]);
				var x = decimals[i];
				if (s[i] > 1 || i % 3 !== 2) x += "s";
				ret.push(x);
			}
		}
		return ret.join(" ");
	};

	var number = function (n) {
		return {
			value: n,
			add: function (a) {
				return number(n + math(a).value);
			},
			subtract: function (a) {
				return number(n - math(a).value);
			},
			multiply: function (a) {
				return number(n * math(a).value);
			},
			divide: function (a) {
				return number(n / math(a).value);
			},
			modulo: function (a) {
				return number(n % math(a).value);
			},
			toPower: function (a) {
				return number(Math.pow(n, math(a).value));
			},
			negate: function () {
				return number(-n);
			},
			absoluteValue: function () {
				return number(Math.abs(n));
			},
			round: function () {
				return number(Math.round(n));
			},
			floor: function () {
				return number(Math.floor(n));
			},
			ceiling: function () {
				return number(Math.ceil(n));
			},
			toSquareRoot: function () {
				return number(Math.sqrt(n));
			},
			sine: function () {
				return number(Math.sin(n));
			},
			cosine: function () {
				return number(Math.cos(n));
			},
			tangent: function () {
				return number(Math.tan(n));
			},
			arcSine: function () {
				return number(Math.asin(n));
			},
			arcCosine: function () {
				return number(Math.acos(n));
			},
			arcTangent: function () {
				return number(Math.atan(n));
			},
			toString: function () {
				return toString(n);
			}
		};
	};

	var multPowers = function (x, y) {
		if (y < 1 && x > 1) x = 1 / x;
		return x * y;
	};

	var math = function (text) {
		if (typeof text !== "string" || !text.length) throw "Invalid number";
		var words = text.toLowerCase().split(/[^A-Za-z]+/);
		var negate = 1;
		for (var i = 0; i < words.length; i++) {
			var word = words[i];
			if (negation.hasOwnProperty(word)) {
				negate *= -1;
				words.splice(i, 1);
			}
			else if (fillers.hasOwnProperty(word)) words.splice(i, 1);
			else if (!digits.hasOwnProperty(word) && !places.hasOwnProperty(word)) throw "Invalid word: " + word;

		}
		var sum = 0;
		for (var i = 0; i < words.length; i++) {
			var word = words[i];
			if (digits.hasOwnProperty(word)) {
				var digit = digits[word], place = 1, subSum = 0;
				while (places.hasOwnProperty(words[i + 1])) place = multPowers(place, places[words[++i]]);
				subSum = digit * place;
				if (place > 0 && place < 1000) {
					while (digits.hasOwnProperty(words[i + 1])) subSum += digits[words[++i]];
					place = 1;
					while (places.hasOwnProperty(words[i + 1])) place = multPowers(place, places[words[++i]]);
					subSum = subSum * place;
				}
				sum += subSum;
			}
			else throw "Unexpected word: " + word;
		}
		return number(sum * negate);
	};
	$.wordMath = math;
	$.wordMath.toString = toString;
	return $.wordMath;
})({});