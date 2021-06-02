This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
And [`rewired`](https://github.com/timarney/react-app-rewired) instead of [`ejected`](https://facebook.github.io/create-react-app/docs/available-scripts#npm-run-eject)

Arcgis JS is consumed as React components through [react-arcgis](https://github.com/Esri/react-arcgis)

Clone the repo and run `yarn install` to install the needed dependencies.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn docs:serve`



### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


### `config-overrides`

This file is ised to override/extend the default `create-react-app` webpack configuration.

Since `create-react-app` version 2 is used under the hoods no configuration to allow the use of [`CSSModules`](https://facebook.github.io/create-react-app/docs/adding-a-css-modules-stylesheet) is needed. Just have in mind that for it to work the file naming convention `file-name.module.scss` should be followed.





