const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Получаем размеры холста (Упражнение 1)
const widthCanvas = canvas.width;
const heightCanvas = canvas.height;

// Разкрашиваем шары (Упражнение 4)
const colors = ["Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Black", "Grey"];

// Конструктор Ball
let Ball = function () {		// присоздании мяча задаем его скорость (и, соответственно, наравление)
	this.x = widthCanvas / 2;		// начальное значение координаты х (центр)
	this.y = heightCanvas / 2;		// начальное значение координаты у (центр)

	// Случайная скорость мяча: в диапазоне от −5 до 5 (Упражнение 2)
	let xBallSpeed = Math.random() * 10 - 5;
	let yBallSpeed = Math.random() * 10 - 5;

	this.xSpeed = xBallSpeed;		// мяч будет смещаться рандомно
	this.ySpeed = yBallSpeed;		// на каждом шаге анимации мяч будет также смещаться рандомно

	// Случайный цвет мяча: рандомное значение из массива "colors", который ниже (Упражнение 4)
	let colorBall = colors[Math.floor(Math.random() * colors.length)];
	this.color = colorBall;			// цвет мяча

	this.radius = 15;					// радиус мяча
};

// Функция для отрисовки мяча
let circle = function (x, y, radius, fillCircle, color) {
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, Math.PI * 2, false);
	if (fillCircle) {
		ctx.fillStyle = color;			// цвет заливки
		ctx.fill();
	} else {
		ctx.stroke();
	}
};

// Метод draw для отрисовки мяча добавляем к свойству prototype конструктора Ball
Ball.prototype.draw = function () {
	/* Вызываем функцию для отрисовки мяча:
	- this.x / this.y: случайные координаты (определяется в конструкторе Ball)
	- this.radius: радиус мяча
	- true: залито цветом
	- this.color: случайный цвет (определяется в конструкторе Ball)*/
	circle(this.x, this.y, this.radius, true, this.color);
};

// Метод move для перемещение мяча
Ball.prototype.move = function () {
	this.x += this.xSpeed;		// прибавляем значение горизонтальной скорости к this.x
	this.y += this.ySpeed;		// прибавляем значение вертикальной скорости к this.y
};

// Метод checkCollision для проверки столкновения мяча с границей, т.е. для отскакивания мяча
Ball.prototype.checkCollision = function () {
	if (this.x < (0 + this.radius) || this.x > (widthCanvas - this.radius)) {		// если мяч столкнулся с левой или правой границей (с учетом радиуса мяча)
		this.xSpeed = -this.xSpeed;			// инвертируем горизонтальное направление мяча
	}
	if (this.y < (0 + this.radius) || this.y > (heightCanvas - this.radius)) {		// если мяч столкнулся с верхней или нижней границей (с учетом радиуса мяча)
		this.ySpeed = -this.ySpeed;			// инвертируем вертикальное направление мяча
	}
};

// Создаем 10 мячей (Упражнение 3)
const ballsCount = 10;		// устанавливаем количество шаров - 10
const balls = [];				// сначала создаем пустой массив
for (i = 0; i < ballsCount; i++) {
	balls[i] = new Ball();		// добавляем 10 элементов в массив и присваиваем каждому Конструктор Ball (создаем мяч для каждого элемента массива)
};

// Анимируем мячи
setInterval(function () {
	// Очищаем холст
	ctx.clearRect(0, 0, widthCanvas, heightCanvas);
	for (i = 0; i < ballsCount; i++) {
		// Рисуем мяч (Метод draw)
		balls[i].draw();
		// Перемещаем мяч (Метод move)
		balls[i].move();
		// Отскакивание мяча (Метод checkCollision)
		balls[i].checkCollision();
		// Обводим рамкой границы «холста»
	};
	ctx.strokeRect(0, 0, widthCanvas, heightCanvas);
}, 20);
