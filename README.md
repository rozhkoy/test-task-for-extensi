# Test task for eXtensi
## [Link to the website](https://test-task-for-extensi.vercel.app/)

✅ Create a web form having 5 sample fields (name, surname, birth date, email, gender checkbox).\
✅ Make some fields mandatory, some optional.\
✅ Email should be mandatory.\
✅ Please validate the email address using our service and async call. Please validate the email against the service on change, while user is typing.\
✅ Show errors on the validation failure.\
✅ Allow form to be submitted only when the data are valid and validation is complete.


To solve the problem, I used: `React` for UI, `Axios` for asynchronous requests, `Formik` for working with the form, `
Yup` for the field validation scheme, `Typescript`, `Eslint` and `Prettier`.
To bypass the overcome CORS limitation, I used CORS proxy

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more
information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

