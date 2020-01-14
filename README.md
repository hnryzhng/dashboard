# MERN FULL-STACK BOILERPLATE

## Installation

1. Clone boilerplate files from repo

2. Remove previous Git file
```
rm -rf .git/
```

3. Install packages specified in package.json files in main project directory and recursively in all subdirectories
```
npm i && npm-recursive-install
``` 

4. Update description in package.json of the project's main directory. Currently:
```
{
  "name": "MERN-boilerplate",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "concurrently \"cd backend && node server.js\" \"cd client && npm start\""
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "concurrently": "^5.0.0"
  }
}
```

5. Optional: If implementing a database, specify a mongodb cloud link in the following directory.
```
backend/config/key.js
```

6. Run project in main directory using
```
npm start
```

## Troubleshooting

If unable to run "npm start" in main project directory after copying from GitHub or reinstalling, then run following commands to remove node modules and reinstall them. Go to official [React docs forum](https://github.com/facebook/create-react-app/issues/200) for more help. 

If problem persists, don't use create-react-app to install react. 

```
rm -rf node_modules
npm install
```
