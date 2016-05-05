# masteryi

link to demo here
stub description here

# Running Locally

- clone repo `https://github.com/konk353535/masteryi.git`

Backend

- open backend folder `cd backend`
- Fill `example-config.js` with your own credentials and rename to `config.js`
- Install and run postgres
  - Mac: `http://postgresapp.com/`
  - Ubuntu: `https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-14-04`
- Create required table as specified in `table_creation.txt`
- Install npm modules `npm install`
- Start server using `node server dev` or `node server prod` to launch with prod configuration (as defined in config.js)
- Start scan using `node scan dev` or `node scan prod`
  
Frontend
- open frontend folder `cd frontend`
- Install ember cli `npm install -g ember-cli`
- Install npm modules `npm install`
- Install bower components `bower install`
- Serve ember app for dev using `ember server --proxy http://localhost:3025`
- Build static ember app for prod using `ember build --prod --output-path=../backend/dist`
