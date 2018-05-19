#  uldu

<img alt="uldu logo"
     src="https://chriskr.github.io/home/wiking.svg"
     width="90"
     height="90">

Ultra lightweight utility to create DOM nodes.

[![Hex.pm](https://img.shields.io/hexpm/l/plug.svg)](
  http://www.apache.org/licenses/LICENSE-2.0.txt
)

```js
import {
  TEXT_NODE_NAME,
  createDom,
  render,
  renderClean,
} from 'uldu';
```

A DOM node with some text:
```js
render(['p', 'A paragraph'], document.body);
```
```html
<body>
  <p>A paragraph</p>
</body>
```

Optional attributes:
```js
render(['p', {class: 'foo', id: 'bar'}, 'A paragraph'], document.body);
```
```html
<body>
  <p class="foo" id="bar">A paragraph</p>
</body>
```

Nested nodes:
```js
render(['p', 'This is ', ['b', 'awesome']], document.body);
```
```html
<body>
  <p>This is <b>awesome</b></p>
</body>
```

Document fragments:
```js
render([
  ['p', 'Paragraph 1'],
  ['p', 'Paragraph 2'],
], document.body);
```
```html
<body>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</body>
```

Text nodes:
```js
render([TEXT_NODE_NAME, 'This is really ', ['b', 'awesome']], document.body);
```
```html
<body>This is really <b>awesome</b></body>
```

## Calendar templates as an example how to use it
[Live example](https://chriskr.github.io/calendar/build/)

[Github repo](https://github.com/chriskr/calendar)

```js
Calendar.Templates = class {
  static calendar(year, today, holidays) {
    return [
      'div',
      {'class': 'calendar'},
      this.today(today),
      this.year(year, today, holidays),
    ];
  }

  static today(today) {
    return [
      'header',
      ['span', {'data-handler': 'previous-year'},
        ['i', {class: 'material-icons'}, 'chevron_left'],
      ],
      [
        'h1',
        `${WEEK_DAYS_LONG[today.day]}` +
            ` ${MONTH_NAMES[today.month]} ${today.date}`
      ],
      ['span', {'data-handler': 'next-year'},
        ['i', {class: 'material-icons'}, 'chevron_right'],
      ],
    ];
  }

  static year(year, today, holidays) {
    return [
      'section',
      ...Array.from(range(12))
        .map(month => this.month(year, month, today, holidays))
    ];
  }

  static month(year, month, today, holidays, withWeekNubers = true) {
    const weeksOfMonth = getWeeksOfMonth(year, month);
    const table = ['table'];

    table.push([
      'caption',
      ['span', {'class': 'month-name'}, MONTH_NAMES[month]],
      ['span', {'class': 'year-number'}, String(year)],
    ]);

    const headRow = [];
    if (withWeekNubers) {
      headRow.push(['th', 'Week']);
    }
    const weekDays = rotate(WEEK_DAYS_SHORT, 1);
    headRow.push(...weekDays.map(wday => ['th', wday]));
    table.push(['thead', ['tr', ...headRow]]);

    table.push([
      'tbody',
      ...weeksOfMonth.map(
        week => this.week(year, month, week, today, holidays))
    ]);

    table.push(this.holidays(year, month, holidays));

    return table;
  }

  static week(year, month, week, today, holidays, withWeekNubers = true) {
    const [weekNumber, weekDays] = week;
    const tr = ['tr'];
    if (withWeekNubers) {
      tr.push(['td', ['span', {'class': 'week-number'}, String(weekNumber)]]);
    }
    tr.push(...weekDays.map((day, index) => {
      const isToday =
          today.year === year && today.month === month && today.date === day;
      const isHoliday = isSunday(index) ||
                        holidays.isHoliday(year, month, day);
      const className = classes(isToday && 'today', isHoliday && 'holiday');
      return ['td', {'class': className}, day > 0 ? String(day) : ''];
    }));
    return tr;
  }

  static holidays(year, month, holidays, withWeekNubers = true) {
    const holidaysOfMonth = holidays.getHolidays(year, month);
    if (holidaysOfMonth.length === 0) {
      return [];
    }
    return [
      'tfoot',
      [
        'tr',
        [
          'td', {'colspan': withWeekNubers ? '8' : '7'},
          [
            'ul', {'class': 'holidays'},
            ...holidaysOfMonth.map(([day, name]) => ['li', `${day}. ${name}`])
          ]
        ]
      ]
    ];
  }
};
```