# Kevin Cowley Github Search App

## Dependancies
- NodeJS

## Set Up
Install UI packages
```
cd ./github_search_ui
npm install
```

Install API packages
```
cd ./github_search_api
npm install
```

## Run
** I did not containerize the application, but happy to do so!

Run the UI:
In a new terminal:
```
cd ./github_search_ui
npm run start
```

Run the API:
In a new terminal:
```
cd ./github_search_api
npm run start
```

The UI will be spun up @ http://localhost:3000
The API will be available @ http://locahost:4000

## Technology Used
UI
- ReactJS
- React-Router to handle movement between two pages (main and details page)
- Redux/React-Redux for both pages to access to repo data
- Material UI for styling components and easy-to-implement table sorting

API
- NodeJS
- ExpressJS for easy route configurations
- axios for HTTP calls to GitHub API
- flat-cache for caching API requests to the file system

## Testing
I'm ashamed to admit no experience with Jest/mocha/chai or other React/Node testing libraries, only python's unittest.
Some things I would like to write tests for:
  - Make sure call to node API uses the correct parameters and the query string is formed properly
  - Make sure potential responses from GitHub are handled properly
I'm a big believer in not testing the functionality of depencancies, but the sorting I pulled from Material-UI's table example would be good to double check

## Potential extensions
- When the Material-UI table is sorted, the repos stored in the Redux store should be also updated
  - This would be more intuitive when navigating Next/Previous on the Details page
- Fetching the next page of Github repositories
  - Currently only 30 results are fetched, but in Github's response headers there is a link to the next page that could easily fetch more data
- More filtering/query parameters to use
  - Github provides ability to search for terms in different files, by creation date, owner, etc
- On details page, could fetch more repository details from github.  The details provided from the repos searched seemed sufficient to me.
