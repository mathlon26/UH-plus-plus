# Archived
The project will be archived since there is no need for this extension anylonger because UHasselt will be updateing their website themselfs in the following year(s).


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

## Running the plugin for testing
Go to [Chrome extensions](chrome://extensions/)
Enable developer mode.
Click on "Load unpacked" and select the chrome chrome folder inside this repo.
Chrome should now have loaded the extension and you should be all set to start commiting.

# Supported browsers
* [x] Chrome
* [ ] Firefox
