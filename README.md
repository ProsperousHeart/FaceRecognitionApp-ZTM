# About The Face Recognition App

This repo is the front end portion for the final project I completed from the [ZTM Complete Web Developer Bootcamp (this link is an affiliate link)](https://academy.zerotomastery.io/a/aff_jcfsdgcx/external?affcode=441520_5cipxkgo).

## Technologies Used

In order to complete the entire project, the following technologies and languages were used:

1. FRONT END (you are here):

    - HTML & CSS
    - JavaScript & [React](https://reactjs.org/)
    - [tachyons](https://tachyons.io/)
    - [tsparticles](https://particles.js.org/)
    - hosted on [GitHub pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)


2. BACKEND SERVER:

    - [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
    - [bcrypt-nodejs](https://www.npmjs.com/package/bcrypt-nodejs) - not currently maintained and should use alternative in the future (still works though)
    - [cors](https://www.npmjs.com/package/cors)
    - [dotenv](https://www.npmjs.com/package/dotenv)
    - [knex](https://knexjs.org/) for connection to postgreSQL database
    - [Clarifai](https://clarifai.com/) API (for facial recognition & info on where to put boxes)
    - hosted on [Render](https://render.com/docs/deploy-node-express-app)


3. DATABASE:

    - postgreSQL
    - hosted on [Render](https://render.com/docs/databases)


# Updating The Site

All code is located in the **facerecognitionapp-ztm** subfolder. From there, run the following:

```
npm run predeploy
npm run deploy
```

This will prep the front end code and push to the GitHub Pages branch.
