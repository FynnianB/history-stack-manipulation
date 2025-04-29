# History Stack Manipulation via <span style="color:yellow">navigateFunction</span>

> [!NOTE]  
> For our latest version, see the `history-api` branch. This is based on the direct manipulation of the HistoryApi with the help of `pushState` and `replaceState`. 

We are currently experiencing problems with manipulating the history stack on mobile devices.

Our goal is to manipulate the history stack in a way that if the user enters the page on `/tds` a stack of `/tds -> /result -> /input` gets built, so if the user goes back he lands on our custom page.

## Desired behavior
1. Fresh Browser tab
2. Open url `/tds`
3. Browser back -> directs to `/result`
3. Browser back -> directs to `/input`

## Current behavior

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

### Samsung Internet
Not working at all

## Problems with this approach
In a larger project, we unfortunately noticed a problem going back to the 0th index of the stack. More precisely, instead of `/tds -> /result -> /input`, the browser-back navigated as follows `/tds -> /result -> /input (instant redirect to /tds) -> /result -> /input (instant redirect to /tds) -> ...`. This means that you were caught in an endless loop and never got to `/input`.

This problem could be solved by using the historyApi with `pushState` and `replaceState` instead of the navigateFunction. For more information check out the branch `history-api`.

## Feedback
If you have any suggestions and ideas, please do not hesitate to contact me:
- [Fynnian Brosius](mailto:fynnian.brosius@check24.de)