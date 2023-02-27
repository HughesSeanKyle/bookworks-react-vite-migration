# Design Inspiration

App inspiration drawn from [`this design`](https://dribbble.com/shots/7234710-Book-Reviews-Website#).
More information on the web designer [`here`](https://dribbble.com/Tubik).

Authentication form UI [`inspiration`](https://dribbble.com/shots/19338138-Log-in-page-Untitled-UI) 

## Features 

The goal of this web application is to build a web application where a user can SignUp, SignIn and signOut. This will be achieved using Firebase for authentication, local storage as a persistence mechanism (Later iterations will make use of either MongoDB or PostGreSQL). React and Bootstrap 5 will be used to build the UI. 

### Feature 1 - Build authentication components (&& Federated Signup (Later))
1. SignUp form (Page) Completed 01/02
2. Confirm Signup form (Page) Completed 01/02
3. SignIn Form (Page) Completed 01/02
4. Forgot Password (Page) Completed 01/02
5. Forgot Password Confirm (page) Completed 09/02
- 02/02 - 02/08 => Email Service
6. Rensend verification email component 
6.1 Will have two inputs 
- 6.1.1 An input for email 
- 6.1.2 An input for the code 
- 6.1.3 Check if the users email has been verified. If true, then create warning/attention (Orange) dialog box advising email has already been verified and user can log in.  

### Feature 2 - Form validation (Continue here 02/02)
1. Validation sign up Completed 02/02
2. Validation confirm sign up Completed 02/02
3. Validation sign in Completed 02/02
4. Validation forgot password Completed 02/02
5. Validation Forgot Password Confirm (page) Completed 09/02
- 02/02 - 02/08 => Email Service

### Feature 3 - Implement Firebase Authentication logic (&& Federated Signin)
0. IMPORTANT - Would be best to set firebase auth methods up on the server side to offer an additional layer of security. When setting auth methods directly on the client side the web app is exposed to security vulnerabilties such as man-in-the-middle attacks. This ensures that sensitive information such as passwords and tokens are not transmitted directly from the client to the authentication service.
Additionaly, when all needed methods are implemented convert service to a cloud function. Enhanced security features: Cloud functions provided by platforms such as Firebase come with built-in security features, such as encryption and firewalls, to help secure sensitive data and prevent unauthorized access.
- Circle back to auth service later (dmarc issue with sendGrid - See service notes). For now Signup on client side. Complete 07/02
- New solution for custom email. Try Nodemailer. See [`bookworks-authentication-service`](https://github.com/HughesSeanKyle/bookworks-authentication-service) for more info. 
- Use the current Firebase auth logic setup on the client side and setup nodemailer in the auth service as a cloud function. 1. Use this service to implement custom forgot password logic. 2. To build custom signup logic. More info in [`bookworks-authentication-service`](https://github.com/HughesSeanKyle/bookworks-authentication-service)



1. Logic for sign up
1.0 NEW => Service for action verification has been built and deployed. Service does two things: 
- 1.0.1. Sends the user an action code (This function can be used for Signup => Confirm Signup, Forgot Password => Forgot Password Confirm or Code confirm to delete sensitive content) Complete 20/02
- 1.0.2. Verifies the action code

1.1 Implement email service logic into signup Complete 19/02
- When user signs up send code Complete 19/02

1.2 When adding firebase auth logic 
- implement isSubmitting from RHF. If isSubmitting true then loader in btn else none. Same goes for other forms 
- Show success error alerts. Show signup success on confirm signup Complete 20/02/
- On Error then show signup error message 20/02
- On success redirect to Signup confirm  20/02

NOTES RE SIGNUP 17/02
- Firebase already hashes the password upon Signup. So no need for brypt and no need to store hashed password in DB 

2. Logic for confirm sign up

- Ensure that the confirm signup page can only be reached through Signup redirect flow Complete 20/02
- Create a signupEmail input for this component with validation. Complete 21/02
- If submit failure then display error. Complete 21/02
- If successfully validatidated then update user prop "emailVerified" to "true" Complete 23/02
- If success on validation and email verifified then redirect to Signin and show email verification success.  Complete 23/02
- Be sure to set setSignupSuccess && setSignupSuccessFeedback back to null in code confirm logic Complete 23/02

3. Logic for signin 
- Create separate spinner state
4. Logic for signout
5. Logic Forgot Password 
This section should have a two part flow. 1. The email is added to the input, 2. The confirm code ui form (Comp can only be accessed by initiating step 1). Make use of useNavigate

5.0 => Implement email service here
- 5.0.1. User initializes forgot password 
- 5.0.2. Email with custom message and code sent to user 
- 5.0.3. User will input code, new pw and confirm new pw on forgot password confirm page 

6. Logic Forgot Password Confirm 
- See 5 above. 



### Feature 4 - User authentication alerts 
0. NOTE: When implementing alerts here, try to incorporate the useTrasition hook to animate the mounting and unmounting of the alert. See if a lib like animate.js can be used. 
1. Alerts sign up Complete 20/02
2. Alerts confirm sign up Complete 23/02
3. Alerts sign in
- REMOVE bcrypt LOGIC FROM HERE => PASSWORDS ALREADY HASHED VIA FIREBASE
4. Alerts sign out
5. Alerts forgot password
5. Alerts forgot password confirm
6. Keep track if route is admin or auth

### Feature 5 PRIORITY FEATURE 22/02 - Implement Redux Redux Toolkit for State Management
1. Authentication
    - 1.1 Create a slice for auth "auth" Complete 22/02
    - 1.2 Set up a reducer function for each form, it's state and alerts 
        - 1.2.1 Reducer for Signup Complete 23/02
        - 1.2.2 Reducer for Signup Complete 23/02
2. Admin 

### Feature 6 - Book application 
0. When the user did not verify, there should be an annoying alert box reinding them they did not verify their email and certian functionality will be restricted. They can then opt to resend the the code, which will redirect them to a confirm screen on an admin route. They can then verify from there 
1. Protect route if no JWT

Auth checks when redirected to Admin

1.1 Consider what user attributes will be useful right from the start 
- Build alert component 
- Use onAuthStateChanged to check emailVerified prop. If false, show alert and ask to resend email? Block certain features of app if not verified. e.g no uploads... 
- Implement resend verification email functionality.
2. When clicking a Book from the grid a sidebar open from the right to left showing all book information. (See Design) 
3. Further features to be defined later
4. Incorporate with firebase storage mechanisms => (CRUD)
For this make use of the cloud functions and follow micro services architecture pattern 
5. Use project 2 (Niftyswap) dashboard as inspiration for this dash. 

## Email service features 

### Features - Setup cloud function for node mailer with custom email
Spark plan (Firebase) no longer offers cloud functions as a service. However, stick to microservice architecture, create this service and deploy with render. Only issue os that you will not have auto scalling and all the great features that come with serverless functions.

Update: 10/02 - Vercel offers FaaS (Functions as a Service) - Use
NOTE: 12/02 - Opted to use regular express server and deploy to Render. Better debugging options and can test locally with more ease. Downside - Server will always be running even if no activity. 

- Setting up Nodemailer for with secure password - More info available [`here`](https://stackoverflow.com/questions/72470777/nodemailer-response-535-5-7-8-username-and-password-not-accepted)

1. Setup Nodemailer for custom signup email with auth code to email (DONE 12/02)
- Error handling 'error-back' pattern - Done 10/02
- Use this function in SignUp flow. When user inputs code and verifyActionCode returns data=true then set user emailVerified attribute to true in Firebase

2. Setup Nodemailer for custom forgot password with authcode to verify email reset (Update this feature progress in client side .md as well) (DONE 12/02)
- Error handling 'error-back' pattern - Done 10/02
- Use this function in SignUp flow. When user inputs code and verifyActionCode returns data=true then redirect user to Forgot Password Confirm => Enter code and use Firebase's reset password API to update the password => Make sure this password is encrypted. 

3. Test functions locally before deploy (DONE 12/02)
- Note "https://bookworks-4fa23.firebaseapp.com" has not been deployed on Firebase just yet. Must still be done when testing functions on client side

4. Ensure that this function can only be called from whitelisted domains (DONE 12/02)
- The Bookworks client side domain 
- Local 

5. May need to set CORS (DONE 13/02)
- More info [`here`](https://vercel.com/knowledge/how-to-enable-cors?query=cors#understanding-cors)

6. NOTE: Express API deployed to Render instead. 

## Auth service features 

### Feature 24/02 - Setup custom update password logic and integrate with custom email service
Reason for feature

A custom email confirmation code service has been created which is used to confirm the signup of the user. The service has also been made to be reusable for other logic, such as a forgot password flow or confirm a sensitive user action (e.g deleting high value information). This portion will focus on updating a user's password by consuming the email service. 

0. Validate incomming password with express validator to match regex on client side
1. Setup express service to update a password by email 
2. Ensure that the update password function/logic can only be accessed if the validated code is correct. If not, then throw error 
3. Limit the request per user to update password to 3 tries per 24 hour cycle *Do Later* 
4. If limit reached return warning *Do Later*
5. Make sure that this route can only be accessed via specific domains
- Localhost 
- Bookworks domain 
6. Deploy to render for testing 
7. Later, deploy as serverless function  

## Migrations
1. 17/02/
- Migrated from Create React App to React + Vite due to Webpack polyfil issues. 
- Removing brcypt as Firebase already hashes passwords 
- Removed dotenv library and store keys for dev and production separately.
- Removed axios in favor of fetch to bypass axios 504 issue.  


## Extra task for later 
0. Implement a smart contract on Optimism or Arbitrum
- 0.1 Start with something simple like uploading content attached to NFT
- 0.2 Integrate metamask into app to buy the NFT 
- 0.3 

1. Write tests app. Do some more research on below and integrate
- 1.1 Unit Tests: These are tests that check individual components of the application, such as functions or classes. Unit tests ensure that each component works as expected and helps catch bugs early in the development process.

- 1.2 Integration Tests: These tests check that different parts of the application work together correctly. For example, an integration test could check that the login form interacts correctly with the user database.

- 1.3 End-to-End Tests: These tests simulate a user interacting with the application and check that everything works correctly from start to finish. End-to-end tests help catch issues that might only appear when multiple parts of the application are used together.

- 1.4 Performance Tests: These tests check that the application performs well under expected user loads. Performance tests help ensure that the application can handle high levels of traffic without slowing down or crashing.

- 1.5 Accessibility Tests: These tests check that the application is accessible to users with disabilities. Accessibility tests ensure that the application can be used by as many people as possible.

- 1.6 Security Tests: These tests check that the application is secure and resistant to common types of attacks, such as SQL injection or cross-site scripting.

- 1.7 Usability Tests: These tests evaluate how easy it is for users to interact with the application. Usability tests help ensure that the application is intuitive and easy to use.

2. Set up CICD. Do some more research on below and integrate 

- 2.1 Source control: Use a version control system such as Git to manage your application's source code.

- 2.2 Build: Automate the build process using a build tool such as Gradle or Maven. The build process should compile the code, run tests, and create artifacts.

- 2.3 Test: Automate testing using a testing framework such as JUnit or Selenium. Tests should run as part of the build process, and you should have different types of tests, such as unit, integration, and acceptance tests.

- 2.4 Deployment: Automate the deployment process using a deployment tool such as Ansible or Kubernetes. The deployment process should be consistent and repeatable.

- 2.5 Environment management: Manage your environments (development, staging, production) using infrastructure as code (IaC) tools such as Terraform or CloudFormation.

- 2.6 Continuous integration: Continuously integrate changes into the codebase using a CI tool such as Jenkins or CircleCI. This ensures that changes are integrated regularly and that issues are caught early.

- 2.7 Continuous delivery/deployment: Continuously deliver/deploy changes to production using a CD tool such as Spinnaker or AWS CodeDeploy. This ensures that changes are delivered quickly and reliably.

- 2.8 Monitoring: Monitor your application using a monitoring tool such as Prometheus or Grafana. This helps you identify issues and troubleshoot problems.

- 2.9 Logging: Log application events using a logging tool such as ELK or Splunk. This helps you debug issues and analyze application behavior.

- 2.10 Security: Integrate security testing into the pipeline using a security tool such as OWASP ZAP or SonarQube. This helps you identify security issues early in the development cycle.
