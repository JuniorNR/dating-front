# TEST: Type Coercion + Logical Operators

Ниже задачи по темам:
- приведение типов в JS;
- сравнения `==` и `===`;
- операторы `&&`, `||`, `??`;
- приоритет операторов и короткое замыкание.

Формат:
- для каждого примера напиши результат выражения;
- если есть вызов функции, укажи, будет ли она вызвана;
- где результат неочевиден, распиши шаги приведения типов.

---

## Блок A — Base coercion

1) `Boolean("")`
2) `Boolean(" ")`
3) `Boolean([])`
4) `Boolean({})`
5) `Boolean(0)`
6) `Boolean(-1)`
7) `Number("")`
8) `Number("   ")`
9) `Number("0")`
10) `Number("0x10")`
11) `Number("10px")`
12) `Number(null)`
13) `Number(undefined)`
14) `String(null)`
15) `String(undefined)`
16) `String([1, 2, 3])`
17) `String({ a: 1 })`

---

## Блок B — `==` vs `===`

Для каждого пункта укажи результат обоих сравнений (если применимо):

1) `0 == false`
2) `0 === false`
3) `"0" == false`
4) `"0" === false`
5) `"" == 0`
6) `"" === 0`
7) `[] == 0`
8) `[] === 0`
9) `[] == false`
10) `[] === false`
11) `[1] == 1`
12) `[1] === 1`
13) `[1,2] == "1,2"`
14) `null == undefined`
15) `null === undefined`
16) `null == 0`
17) `undefined == 0`
18) `NaN == NaN`
19) `NaN === NaN`
20) `Object.is(NaN, NaN)`
21) `{} == "[object Object]"`
22) `{} === "[object Object]"`
23) `[] == ![]`
24) `true == "1"`
25) `false == "0"`

---

## Блок C — `&&` и `||` (возвращают не только boolean)

1) `"" || "fallback"`
2) `"hello" || "fallback"`
3) `0 || 42`
4) `42 || 0`
5) `null || "x"`
6) `undefined || "x"`
7) `"0" || "x"`
8) `[] || "x"`
9) `{} || "x"`
10) `"" && "next"`
11) `"start" && "next"`
12) `0 && 100`
13) `100 && 0`
14) `null && "x"`
15) `true && "ok"`
16) `"ok" && true`
17) `false || 0 || "" || "done"`
18) `"a" && "b" && "c"`
19) `"a" && 0 && "c"`
20) `0 || "b" || "c"`

---

## Блок D — `??` и отличие от `||`

1) `null ?? "default"`
2) `undefined ?? "default"`
3) `0 ?? 10`
4) `"" ?? "default"`
5) `false ?? true`
6) `NaN ?? 5`
7) `null || "default"`
8) `0 || 10`
9) `"" || "default"`
10) `false || true`
11) `null ?? "a" ?? "b"`
12) `undefined ?? null ?? "x"`

---

## Блок E — Приоритет и группировка

Вычисли выражение и объясни, почему:

1) `true || false && false`
2) `(true || false) && false`
3) `null ?? "A" || "B"`  
4) `0 || null ?? 5`  
5) `(0 || null) ?? 5`
6) `false && "x" || "y"`
7) `false && ("x" || "y")`
8) `("x" && 0) ?? 42`
9) `("x" && null) ?? 42`
10) `("x" || null) ?? 42`

Примечание: смешивать `??` с `||`/`&&` без скобок нельзя — это синтаксическая ошибка.

---

## Блок F — Short-circuit (вызовется ли функция?)

```js
const log = (name, value) => {
  console.log(name);
  return value;
};
```

Для каждого выражения укажи:
1) что выведется в консоль;
2) итоговое значение.

1) `log("A", 0) || log("B", 2)`
2) `log("A", 1) || log("B", 2)`
3) `log("A", 0) && log("B", 2)`
4) `log("A", 1) && log("B", 2)`
5) `log("A", null) ?? log("B", 5)`
6) `log("A", 0) ?? log("B", 5)`
7) `log("A", undefined) ?? log("B", false)`
8) `log("A", "") || log("B", "fallback")`
9) `log("A", "") ?? log("B", "fallback")`
10) `log("A", false) || log("B", true) && log("C", "ok")`

---

## Блок G — Мини-кейсы из жизни

Определи результат и предложи более надежный вариант:

1) `const port = process.env.PORT || 3000;`
2) `const page = Number(query.page) || 1;`
3) `const name = user.name || "Anonymous";`
4) `const isEnabled = settings.enabled || true;`
5) `const amount = inputValue ?? 0;`
6) `const timeout = config.timeout ?? 5000;`
7) `const count = Number(value ?? 0);`
8) `const title = data.title?.trim() || "Untitled";`

---

## Блок H — Challenge

1) Почему `[] == false` дает `true`, но `[] === false` дает `false`?
2) Почему `null == undefined` дает `true`, но ни с чем другим `null` через `==` не равен?
3) Объясни пошагово результат `[] == ![]`.
4) Чем `Object.is` отличается от `===` на примерах `NaN` и `-0`?
5) Когда `||` нужно заменить на `??` в реальном коде?

---

## Bonus: Быстрая самопроверка (без решений)

Если хочешь формат под собес, решай устно за 60 секунд:

- `Boolean("false")`
- `Boolean("0")`
- `"5" - 2`
- `"5" + 2`
- `[] + 1`
- `[1] + 1`
- [ ] + [ ]
- `{}` + []
- `[] == ""`
- `"" == 0`
- `0 == "0"`
- `false == "0"`
- `null == false`
- `undefined == false`
- `NaN || 10`
- `NaN ?? 10`
- `0 ?? 10`
- `0 || 10`

