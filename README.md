# Emergency Response - PWA/Mobile App

This is the PWA/mobile view of the Emergency Response project. It allows users to set their status, see the simulation of their assigned missions and complete them.

## Running locally

The app is built using [Ionic 4](https://ionicframework.com/docs).

To run the app locally, please make sure you have at least Node.js 10+ installed locally.

The following environment variables are required to run the app:

```bash
export TOKEN=<mapbox token>
export SERVER_URL=<url of the current emergency console app>
```

The app is using the same server that is used by the current emergency console app, that's why its url is required here.

Once these env vars are set, you should run:

```bash
npm install .
npm run build
npm run start
```

This will build the app in production mode, which means it will run as a PWA app. Then you can go to `http://localhost:8080` to view the app.

For development, you can run `npm run build:watch` in one terminal window, this will setup watches for the files and recompile them automatically. Then run `npm run start` in another terminal window.

## Deploy to OpenShift

There are a few ways to deploy this app to an OpenShift cluster:

* Use [Nodeshift](https://www.npmjs.com/package/nodeshift)
    
    ```bash
    npm run nodeshift
    ```
* Use the [template](./deploy/template.yaml):

   ```bash
   oc process -f ./deploy/template.yaml -p MAPBOX_TOKEN="$TOKEN" -p CONSOLE_SERVER_URL="$SERVER_URL" | oc create -f -
   ```






