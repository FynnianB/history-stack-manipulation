# History Stack Manipulation via navigateFunction

We are currently experiencing problems with manipulating the history stack on mobile devices.

Our goal is to manipulate the history stack in a way that if the user enters the page on `/tds` a stack of `/tds -> /result -> /input` gets built, so if the user goes back he lands on our custom page.

## Desired behavior
1. Fresh Browser tab
2. Open url `/tds`
3. Browser back -> directs to `/result`
3. Browser back -> directs to `/input`

## Current behavior
The current behavior differs between browsers

### Safari
Works as expected

### Chrome
Works only after page interaction

1. Fresh Browser tab
2. Open url `/tds`
3. Two-way behavior
    - Browser back -> does **not** direct to `/result` -> directs to page before `/tds` (browser landingpage)
    - Click button (with a `console.log('a')`) for some page interaction
    -> browser back -> directs correctly to `/result` 

## Manipulation via History API
It seems like the history stack can not be manipulated directly via the `history` object because some browsers are blocking the behavior. For more information check out the branch `history-api`.

## Feedback
If you have any suggestions and ideas, please do not hesitate to contact me:
- [Fynnian Brosius](mailto:fynnian.brosius@check24.de)