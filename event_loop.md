# Event Loop в JavaScript — полное руководство

> [!abstract]
> Этот конспект покрывает **Event Loop целиком**: стек вызовов, Web APIs/Node APIs, очереди задач, `microtask` и `macrotask` (часто ошибочно пишут *marco*), рендеринг, приоритеты, edge-cases и практические паттерны.

---

## Содержание

- [[#1 Что такое Event Loop]]
- [[#2 Базовые компоненты модели выполнения]]
- [[#3 Microtasks и Macrotasks (marco)]]
- [[#4 Порядок выполнения (главное правило)]]
- [[#5 Браузер: рендеринг и Event Loop]]
- [[#6 Node.js: Event Loop по фазам]]
- [[#7 Полная таблица: что в какую очередь попадает]]
- [[#8 Практические кейсы (с ответами)]]
- [[#9 Частые ловушки и анти-паттерны]]
- [[#10 Как дебажить Event Loop]]
- [[#11 Шпаргалка для собеседований]]

---

## 1) Что такое Event Loop

**Event Loop** — это механизм, который позволяет JavaScript (однопоточному по исполнению JS-кода) обрабатывать:

- синхронный код;
- таймеры;
- пользовательские события;
- промисы;
- I/O;
- рендеринг (в браузере).

Ключевая идея: пока стек вызовов (`call stack`) пуст, цикл событий берет следующую задачу из очередей и выполняет ее.

> [!important]
> JS-код исполняется в одном потоке, но окружение (браузер/Node) дает асинхронные API и очереди задач. Поэтому создается иллюзия параллельности.

---

## 2) Базовые компоненты модели выполнения

## 2.1 Call Stack

Стек вызовов функций.  
Пока стек не пуст, никакие queued tasks не выполняются.

## 2.2 Heap

Память для объектов.

## 2.3 Runtime APIs

- В браузере: `setTimeout`, `fetch`, DOM events, `MutationObserver`, `requestAnimationFrame`, etc.
- В Node.js: timers, fs/network I/O, `setImmediate`, etc.

## 2.4 Очереди задач

- **Macrotask queue** (task queue)
- **Microtask queue** (job queue)

---

## 3) Microtasks и Macrotasks (marco)

## 3.1 Macrotask (Task)

Типичные источники:

- `setTimeout`, `setInterval`
- DOM события (`click`, `input`, ...)
- `postMessage`
- `setImmediate` (Node)
- I/O callbacks (Node)

Каждый проход Event Loop обычно берет **одну macrotask**, выполняет ее, затем обрабатывает microtasks.

## 3.2 Microtask

Типичные источники:

- `Promise.then/catch/finally`
- `queueMicrotask`
- `MutationObserver` (браузер)
- `process.nextTick` (Node, отдельная сверхприоритетная очередь)

> [!warning]
> **Microtasks имеют более высокий приоритет**, чем следующая macrotask.  
> После завершения текущего куска синхронного кода движок "дренирует" (выполняет полностью) очередь microtasks.

---

## 4) Порядок выполнения (главное правило)

Упрощенно:

1. Выполнить синхронный код (текущий call stack).
2. Выполнить **все microtasks**.
3. (Браузер) дать шанс на рендер.
4. Взять следующую macrotask.
5. Повторить цикл.

> [!tip]
> Именно поэтому `Promise.then(...)` почти всегда отрабатывает раньше `setTimeout(..., 0)`.

### Мини-пример

```js
console.log("A");
setTimeout(() => console.log("timeout"), 0);
Promise.resolve().then(() => console.log("promise"));
console.log("B");
```

Результат:

```txt
A
B
promise
timeout
```

---

## 5) Браузер: рендеринг и Event Loop

В браузере между macrotask-итерациями движок может:

- пересчитать стили;
- сделать layout;
- paint/composite.

## Важные следствия

- Долгий синхронный код блокирует UI.
- Бесконечный поток microtasks тоже может блокировать рендер.
- `requestAnimationFrame` вызывается перед следующим repaint.

### Пример блокировки рендера microtasks

```js
function spam() {
  queueMicrotask(spam);
}
spam();
// UI может "замереть", потому что очередь microtasks никогда не пустеет.
```

---

## 6) Node.js: Event Loop по фазам

Node.js Event Loop (libuv) по фазам:

1. **timers** (`setTimeout`, `setInterval`)
2. **pending callbacks**
3. **idle, prepare**
4. **poll** (I/O)
5. **check** (`setImmediate`)
6. **close callbacks**

Дополнительно:

- `process.nextTick` queue (выполняется раньше обычных microtasks в Node)
- Promise microtasks

> [!important]
> В Node приоритет в конце callback обычно такой:  
> `process.nextTick` -> Promise microtasks -> переход к следующей фазе loop.

---

## 7) Полная таблица: что в какую очередь попадает

| Конструкция | Браузер | Node.js | Очередь/фаза |
|---|---|---|---|
| Синхронный код | Да | Да | Call Stack |
| `setTimeout`/`setInterval` | Да | Да | Macrotask / Timers |
| `Promise.then/catch/finally` | Да | Да | Microtask |
| `queueMicrotask` | Да | Да | Microtask |
| `MutationObserver` | Да | Нет | Microtask |
| DOM events | Да | Нет | Macrotask |
| `requestAnimationFrame` | Да | Нет | Перед repaint |
| `setImmediate` | Нет | Да | Check phase |
| `process.nextTick` | Нет | Да | NextTick queue (сверхприоритет) |
| I/O callback (`fs.readFile`) | Нет | Да | Poll phase |

---

## 8) Практические кейсы (с ответами)

## Кейc 1 — Promise vs Timeout

```js
console.log(1);
setTimeout(() => console.log(2), 0);
Promise.resolve().then(() => console.log(3));
console.log(4);
```

Ответ: `1 4 3 2`

---

## Кейc 2 — Цепочка microtasks

```js
Promise.resolve()
  .then(() => {
    console.log("A");
  })
  .then(() => {
    console.log("B");
  });
setTimeout(() => console.log("T"), 0);
```

Ответ: `A B T`

---

## Кейc 3 — microtask внутри macrotask

```js
setTimeout(() => {
  console.log("timeout");
  Promise.resolve().then(() => console.log("inside promise"));
}, 0);
setTimeout(() => console.log("timeout2"), 0);
```

Ответ:  
`timeout` -> `inside promise` -> `timeout2`  
(после первой macrotask сначала дренируются microtasks)

---

## Кейc 4 — вложенные timeout

```js
setTimeout(() => {
  console.log("A");
  setTimeout(() => console.log("B"), 0);
}, 0);
setTimeout(() => console.log("C"), 0);
```

Типично: `A C B`  
(`B` ставится в очередь позже)

---

## Кейc 5 — async/await

```js
async function run() {
  console.log("1");
  await null;
  console.log("2");
}
console.log("0");
run();
console.log("3");
```

Ответ: `0 1 3 2`  
(`await` продолжение функции планирует как microtask)

---

## Кейc 6 — thenable в await

```js
const thenable = { then: (resolve) => resolve("ok") };
async function f() {
  console.log("start");
  const v = await thenable;
  console.log(v);
}
f();
console.log("end");
```

Ответ: `start end ok`

---

## Кейc 7 — queueMicrotask vs Promise.then

```js
queueMicrotask(() => console.log("qm"));
Promise.resolve().then(() => console.log("p"));
console.log("sync");
```

Ответ: `sync`, потом `qm/p` в порядке постановки (обычно `qm`, затем `p`).

---

## Кейc 8 — Node: nextTick и Promise

```js
Promise.resolve().then(() => console.log("promise"));
process.nextTick(() => console.log("tick"));
console.log("sync");
```

Node: `sync tick promise`

---

## Кейc 9 — Node: setImmediate vs setTimeout(0)

```js
setTimeout(() => console.log("timeout"), 0);
setImmediate(() => console.log("immediate"));
```

Порядок может зависеть от контекста запуска (top-level vs I/O callback).  
Внутри I/O callback чаще `immediate` раньше `timeout`.

---

## Кейc 10 — starvation через microtasks

```js
let i = 0;
function loop() {
  if (i++ < 1e6) queueMicrotask(loop);
}
loop();
setTimeout(() => console.log("timeout"), 0);
```

`timeout` сильно задержится: microtasks вычистятся раньше.

---

## 9) Частые ловушки и анти-паттерны

1. **Ожидание, что `setTimeout(..., 0)` выполнится "сразу".**  
   Нет: только после текущего стека и microtasks.

2. **Смешивание heavy sync кода с UI.**  
   Блокировка интерфейса неизбежна.

3. **Бесконечные microtasks (`then`/`queueMicrotask`).**  
   Можно "задушить" рендер и таймеры.

4. **Злоупотребление `process.nextTick` в Node.**  
   Может starve-ить I/O фазы.

5. **Неверные ожидания от `setImmediate` vs `setTimeout(0)` в Node.**  
   Порядок контекстно-зависим.

---

## 10) Как дебажить Event Loop

## Браузер

- Chrome DevTools -> Performance (смотри task/microtask timeline).
- Добавляй маркировку логов:

```js
const tag = (label) => console.log(`${performance.now().toFixed(2)}ms`, label);
```

- Проверяй long tasks и FPS.

## Node.js

- `node --trace-events-enabled ...`
- `clinic.js` / `0x` для профилирования
- `async_hooks` для сложных цепочек async

---

## 11) Шпаргалка для собеседований

> [!summary]
> - `===` не про Event Loop, а про сравнение.
> - `Promise.then` -> microtask.
> - `setTimeout` -> macrotask.
> - После каждого sync/macrotask-куска движок дренирует microtasks.
> - В браузере рендер обычно между macrotask-итерациями.
> - В Node `process.nextTick` выше Promise microtasks.

### "Одной фразой"

Event Loop — это цикл, который выполняет синхронный код, затем полностью microtasks, затем следующую macrotask, обеспечивая работу асинхронности в JS.

---

## Дополнение: терминология

- Правильно: **microtask / macrotask**
- Неправильный, но частый вариант: **marco task**

---

## Быстрый self-check (без ответов)

1. Почему `Promise.then` почти всегда раньше `setTimeout(0)`?
2. Что произойдет с UI при бесконечной цепочке microtasks?
3. Чем в Node отличаются `process.nextTick` и `Promise.then`?
4. Когда `setImmediate` может обогнать `setTimeout(0)`?
5. Почему `await` не "блокирует поток", но останавливает функцию?

