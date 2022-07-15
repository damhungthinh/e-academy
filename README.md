# Before you start

1. Settup Docker.
2. Go to project root folder.
3. Open terminal and run command: `docker-compose up db`
4. Keep the docker container running

# For FE dev: 
## Developments
1. `cd frontend`
2. then `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


## Build

1. `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!


2. `cd ..`
3. `docker-compose build frontend`
4. `docker-compose up frontend`

Your app will be deployed to docker container and hosted by nginx

# For BE dev: 
1. `cd api`
2. then `./gradle bootRun` or `gradlew bootRun`

Runs the app in the development mode.\
Open [http://localhost:8000/api/v1](http://localhost:8000/api/v1) to view it in the browser.

## Build

1. `docker-compose build frontend`
2. `docker-compose up frontend`

Your app will be deployed to docker container