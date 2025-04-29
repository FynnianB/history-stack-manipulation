# History Stack Manipulation via <span style="color:yellow">History API</span>

> [!NOTE]  
> You can find a deployed version of this on: <br />[history-stack-manipulation-git-history-api-fynnianbs-projects.vercel.app](history-stack-manipulation-git-history-api-fynnianbs-projects.vercel.app)

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
Works only after page interaction (eg. clicks)

1. Fresh Browser tab
2. Open url `/tds`
3. Two-way behavior
    - Browser back -> does **not** direct to `/result` -> directs to page before `/tds` (browser landingpage)
    - Click button (eg. with a `console.log('a')`) for some page interaction
    -> browser back -> directs correctly to `/result` 

### Samsung Internet
History manipulation not working at all

## Additional Notes

### Warnings in Samsung Internet 
During development, we once had a point where the user was shown a warning in the Samsung Internet browser that they were being redirected to a page they had not visited.

Unfortunately, we can no longer reproduce this behavior and are also not sure whether the warning appeared when building the history stack when loading the page or when building it manually by clicking a button.

Since a warning when calling up our page is of course an absolute no-go, I recommend deactivating the manipulation of the History Stack for the Samsung Internet browser. Manipulation does not currently work in the browser anyway.

However, this check is not yet implemented in the current version.

## Feedback
If you have any suggestions and ideas, please do not hesitate to contact me:
- [Fynnian Brosius](mailto:fynnian.brosius@check24.de)