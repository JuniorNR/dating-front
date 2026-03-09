# TEST2: 10 задач по контексту (`this`) в JavaScript

Формат:
- для каждой задачи определи, что выведется в консоль;
- объясни, какой будет `this` и почему;
- если есть ошибка, укажи ее тип и как исправить.

---

## 1) Обычный вызов метода

```js
const user = {
  name: "Oleg",
  say() {
    console.log(this.name);
  },
};

user.say();
```

---

## 2) Потеря контекста

```js
const user = {
  name: "Oleg",
  say() {
    console.log(this.name);
  },
};

const fn = user.say;
fn();
```

---

## 3) Стрелка внутри метода

```js
const user = {
  name: "Oleg",
  say() {
    const inner = () => console.log(this.name);
    inner();
  },
};

user.say();
```

---

## 4) Обычная функция внутри метода

```js
const user = {
  name: "Oleg",
  say() {
    function inner() {
      console.log(this.name);
    }
    inner();
  },
};

user.say();
```

---

## 5) `call`

```js
function greet() {
  console.log(`Hi, ${this.name}`);
}

const a = { name: "Alice" };
const b = { name: "Bob" };

greet.call(a);
greet.call(b);
```

---

## 6) `apply`

```js
function sumAndLog(x, y) {
  console.log(this.label, x + y);
}

const ctx = { label: "Result:" };
sumAndLog.apply(ctx, [2, 3]);
```

---

## 7) `bind`

```js
const user = {
  name: "Oleg",
};

function say(age) {
  console.log(this.name, age);
}

const bound = say.bind(user, 25);
bound(30);
```

---

## 8) `new` и функция-конструктор

```js
function User(name) {
  this.name = name;
}

const u = new User("Nika");
console.log(u.name);
```

Что будет, если вызвать `User("Nika")` без `new`?

---

## 9) Стрелка как метод объекта

```js
const user = {
  name: "Oleg",
  say: () => {
    console.log(this.name);
  },
};

user.say();
```

Почему такой способ обычно не подходит для методов?

---

## 10) Класс и колбэк

```js
class Counter {
  constructor() {
    this.count = 0;
  }

  inc() {
    this.count += 1;
    console.log(this.count);
  }
}

const c = new Counter();
setTimeout(c.inc, 0);
```

Почему здесь проблема с контекстом и как исправить минимум двумя способами?

