# UHasselt Plus Plus
UHasselt Plus Plus is a plugin that aims to update mijnstudentendosier.uhasselt.be to look more modern and have modern functionality.

# Development guide
>**_NOTE_** It is currently not possible for unpermitted users to contribute to this project

## setup the local repo
To start contributing create a new branch from dev named: feature-"featurename"
Clone the repo via git clone and checkout your new branch.
Make your changes and push changes to github.
Create a pull request and aprove it or wait for it to be approved if you can't approve it yourself.

### tailwind setup
Tailwind uses the compiled.css file to store its styles. To make sure it gets updated correctly run `npm run build:css` and keep the terminal open while working on the project. When changing things to do with Tailwind make sure to reload the extension.

### Adding content to a page
In the code bellow the route is matched and the appropriate function is called (in default.js)
Not all functions are yet implemented.
```javascript
switch (route) {
        case "/Default.aspx":
          loadHomeContent(tables);
          break;
        // other cases...
        case "/sdsActiviteitenStudNieuw.aspx?activiteit=STARTUP":
          loadStartUpContent(tables);
          break;
        default:
          loadHomeContent(tables);
          break;
```

To implement a new content page function:
    - 1. create a branch feature-< content name > from source: dev
    - 2. add the function definition under the other, earlier content loader definitions
    - 3. use the template bellow (replace 'Home' with the actual content name)
    - 4. in `src/pages/content` create a html file and pass its name as value to 'page:' as seen bellow
    - 5. use javascript magic to extract data from 'tables' and insert it into the injected html

```javascript
function loadHomeContent(tables) {
    chrome.runtime.sendMessage(
        { action: "GET::contentPage", page: "home"},
        (response) => {
            if (response.html) {
            placeholder.innerHTML = response.html;
            }

            // handle the editing of the response.html with content out of 'tables'
        }
    );
}

```

## Running the plugin for testing
Go to [Chrome extensions](chrome://extensions/)
Enable developer mode.
Click on "Load unpacked" and select the chrome chrome folder inside this repo.
Chrome should now have loaded the extension and you should be all set to start commiting.

# Supported browsers
* [x] Chrome
* [ ] Firefox



