#  uldu

<img alt="uldu logo"
     src="https://chriskr.github.io/home/wiking.svg"
     width="90"
     height="90">

Ultra lightweight utility to create DOM nodes.

[![Hex.pm](https://img.shields.io/hexpm/l/plug.svg)](
  http://www.apache.org/licenses/LICENSE-2.0.txt
)

### Performance Tests

- [Test document uldu](https://chriskr.github.io/test_ui_libs/bragi/build/)
- [Test document react](https://chriskr.github.io/test_ui_libs/react/build/)
- [Test document inferno](https://chriskr.github.io/test_ui_libs/test-inferno/build/)
- [Test document hyperHTML](https://chriskr.github.io/test_ui_libs/hyperHtml/build/)
- [Test document lit-html](https://chriskr.github.io/test_ui_libs/lit-html/build/)


Tested with Chrome dev tools:

- reload document
- start recording performance
- create 10 calendars
- update the year 10 times, e.g. switch 5 times to the next year and 5 times to
  the previous year in the first calendar
- stop recording

(Clicking the lib title performs these actions automatically)

This aims to somehow reflect the lifetime of an application, create a view and
update the whole view at least once. In the case of uldu there is no dom diffing,
just replacing an outdated view.

Average of 10 records :

<img src="http://chriskr.github.io/assets/performance-tests.png"
     width="600"
     height="630">

JavaScript bundle size of the test documents:

<img src="http://chriskr.github.io/assets/bundle-sizes.png"
     width="600"
     height="244">


### Basic Usage

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

### More advanced example

[Live example](https://chriskr.github.io/calendar/build/)

[Github repo](https://github.com/chriskr/calendar)

```js
Calendar.Templates = class {
  static calendar(year, today, holidays) {
    return (
      ['div', {'class': 'calendar'},
        this.today(today),
        this.year(year, today, holidays),
      ]
    );
  }

  static today(today) {
    const todayStr = [
      WEEK_DAYS_LONG[today.day],
      MONTH_NAMES[today.month],
      String(today.date)
    ].join(' ');

    return (
      ['header',
        ['span', {'data-handler': 'previous-year'},
          ['i', {class: 'material-icons'}, 'chevron_left'],
        ],
        ['h1', todayStr],
        ['span', {'data-handler': 'next-year'},
          ['i', {class: 'material-icons'}, 'chevron_right'],
        ],
      ]
    );
  }

  static year(year, today, holidays) {
    const tables = Array.from(range(12))
        .map(month => this.month(year, month, today, holidays));

    return ['section', ...tables];
  }

  static month(year, month, today, holidays) {
    const weeksOfMonth = getWeeksOfMonth(year, month);
    const weekDays = rotate(WEEK_DAYS_SHORT, 1);
    const weekLabels = weekDays.map(wday => ['th', wday]);
    const weekRows =
        weeksOfMonth.map(week => this.week(year, month, week, today, holidays));
    const holidaysList = this.holidays(year, month, holidays);

    return (
      ['table',
        ['caption',
          ['span', {'class': 'month-name'}, MONTH_NAMES[month]],
          ['span', {'class': 'year-number'}, String(year)],
        ],
        ['thead',
          ['tr',
            ['th', 'Week'],
            ...weekLabels,
          ]
        ],
        ['tbody', ...weekRows],
        holidaysList.length === 0 ?
        [] :
        ['tfoot',
          ['tr',
            ['td', {'colspan': '8'}, holidaysList]
          ]
        ]
      ]
    );
  }

  static week(year, month, week, today, holidays) {
    const [weekNumber, weekDays] = week;
    const weekRow = weekDays.map((day, index) => {
      const className = classes(
          isToday(today, year, month, day) && 'today',
          isHoliday(index, holidays, year, month, day) && 'holiday');
      return ['td', {'class': className}, day > 0 ? String(day) : ''];
    });

    return (
      ['tr',
        ['td',
          ['span', {'class': 'week-number'}, String(weekNumber)]
        ],
        ...weekRow
      ]
    );
  }

  static holidays(year, month, holidays, withWeekNubers = true) {
    const holidaysOfMonth = holidays.getHolidays(year, month);

    return (holidaysOfMonth.length === 0 ?
      [] :
      ['ul', {'class': 'holidays'},
          ...holidaysOfMonth.map(([day, name]) => ['li', `${day}. ${name}`])
      ]
    );
  }
}
```

