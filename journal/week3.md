# Week 3 — Decentralized Authentication
Decentralized authentication using Amazon AWS refers to a method of authentication that allows users to authenticate themselves without relying on a central authority or a single point of failure. In this approach, users can authenticate themselves using decentralized identity systems, such as blockchain-based identity systems, without relying on a central authority.

Amazon Cognito, for example, can be used to manage user authentication and authorization in a decentralized way. It supports standard authentication protocols such as OAuth 2.0 and OpenID Connect, as well as decentralized identity systems such as blockchain-based identity systems.

# AWS Conginto Security Best Practices

1. Use strong passwords: Encourage users to choose strong passwords that contain a mix of upper and lower case letters, numbers, and symbols. Consider implementing password complexity requirements and enforcing password expiration policies.
2. Enable Multi-Factor Authentication (MFA): Enable MFA to add an extra layer of security to your authentication process. This ensures that even if a user’s password is compromised, an attacker still cannot gain access without the second factor.
3. Implement IP address restrictions: Limit access to your application from trusted IP addresses only. This helps to prevent unauthorized access from outside your organization.
4. Use SSL/TLS: Use SSL/TLS to encrypt communication between your application and Amazon Cognito. This helps to protect user data in transit and prevents man-in-the-middle attacks.
5. Implement access control: Use AWS Identity and Access Management (IAM) to control access to your resources. Assign IAM roles and permissions to specific users or groups to limit access to sensitive data.
6. Monitor access logs: Monitor access logs to detect suspicious activity or unauthorized access attempts. You can use Amazon CloudWatch to monitor access logs for Amazon Cognito.
7. Regularly review and rotate keys: Regularly review and rotate keys to prevent unauthorized access. Use AWS Key Management Service (KMS) to manage keys for encryption and decryption.
8. Keep software up-to-date: Keep your software up-to-date to ensure that you have the latest security patches and updates. This includes your application, operating system, and any third-party libraries or dependencies.
9. Regularly test security: Regularly test the security of your application and infrastructure to identify vulnerabilities and potential risks. You can use Amazon Inspector to automate security assessments of your Amazon Cognito resources.
10. Use AWS WAF: Use AWS WAF (Web Application Firewall) to protect your application from common web attacks such as SQL injection and cross-site scripting.
11. Follow compliance standards: Ensure that your application complies with relevant compliance standards such as HIPAA, PCI DSS, and GDPR.
12. Choose appropriate region: Choose a region for your Amazon Cognito deployment that complies with your data residency requirements.
13. AWS Organizations SCP: Use AWS Organizations Service Control Policies (SCPs) to manage permissions across multiple AWS accounts and enforce security best practices.
14. Enable AWS CloudTrail: Enable AWS CloudTrail to log all events and API calls related to your Amazon Cognito deployment.
15. Deletion and creation protection: Use deletion and creation protection to prevent accidental deletion or modification of your Amazon Cognito resources.


# AWS Authenticated in AWS Cloud
When a user is authenticated in AWS Cloud, it means that they have successfully proven their identity and have been granted access to the resources and services they are authorized to use. AWS provides several authentication mechanisms to ensure that only authorized users can access resources.

One of the most commonly used authentication mechanisms is AWS Identity and Access Management (IAM). IAM is a web service that enables you to manage access to AWS resources securely. You can create and manage users and groups, and assign them permissions to access AWS resources. IAM also allows you to use multifactor authentication (MFA) and enforce strong password policies to enhance security.

Another authentication mechanism provided by AWS is Security Assertion Markup Language (SAML) 2.0. SAML is an XML-based standard for exchanging authentication and authorization data between parties. SAML enables federated single sign-on (SSO) for web applications, where a user can sign in to multiple applications using the same set of credentials.

AWS also supports OpenID Connect (OIDC), which is a standard for building authentication and authorization workflows on top of OAuth 2.0. OIDC enables you to use third-party identity providers, such as Google, Facebook, or Amazon, to authenticate users in your application.

# Amazon Cognito is a managed service provided by Amazon Web Services

This allows developers to add user sign-up, sign-in, and access control to their web and mobile applications. It provides a secure and scalable way to handle user authentication and authorization, without the need for developers to build and manage their own authentication systems.

Amazon Cognito offers several different types of user pools and identity pools to meet different authentication and authorization requirements. Here's an overview of the types of Amazon Cognito pools:

1. User Pools: User Pools are used to handle user authentication and registration for web and mobile applications. They allow developers to create and manage user accounts, set up password policies, and enable multi-factor authentication (MFA) for added security. User Pools support standard authentication protocols such as OAuth 2. Identity Pools: Identity Pools are used to provide temporary AWS credentials to users who authenticate through external identity providers, such as Facebook, Google, or Amazon. Identity Pools allow developers to grant access to AWS resources based on user identity, without requiring users to create an AWS account. Identity Pools support standard authentication protocols such as OAuth 2.0 and OpenID Connect.
3. Social Identity Providers: Amazon Cognito allows developers to add support for external identity providers, such as Facebook, Google, and Amazon, to their applications. This enables users to sign in using their existing social media accounts, rather than creating a new account.
4. Custom Authentication: Amazon Cognito also provides a way for developers to create their own authentication flow using custom authentication providers. This allows developers to integrate with their own authentication systems or third-party authentication systems that are not supported by Amazon Cognito out of the box.

Amazon Cognito provides a flexible and scalable way to handle user authentication and authorization in web and mobile applications. With its various types of user and identity pools, social identity providers, and support for custom authentication, developers can choose the authentication and authorization method that best fits their application's needs.

# Why Use AWS Cognito

Amazon Cognito can simplify the development of your application by providing a secure and scalable way to handle user authentication and authorization. With its customization options, integration with other AWS services, and support for mobile platforms, Amazon Cognito can help you build a more secure and user-friendly application.

1. Security: Amazon Cognito provides a secure way to handle user authentication and authorization, using industry-standard protocols such as OAuth 2.0 and OpenID Connect. It supports multi-factor authentication (MFA) and encryption of user data at rest and in transit, helping to ensure the security and privacy of user data.
2. Scalability: Amazon Cognito is a fully managed service, meaning that AWS handles the infrastructure and scaling for you. It can handle millions of users and supports high availability across multiple regions, so you can focus on building your application instead of worrying about infrastructure.
3. Customization: Amazon Cognito offers a range of customization options to fit the needs of your application. You can customize the user interface for sign-in and sign-up pages, and you can also use your own identity providers and authentication flows.
4. ntegration with AWS Services: Amazon Cognito integrates with other AWS services, such as Amazon S3, AWS Lambda, and Amazon API Gateway, to provide secure access to AWS resources based on user identity. This can simplify the development of your application and reduce the need for custom integration code.
5. Support for Mobile Applications: Amazon Cognito supports mobile platforms, including iOS, Android, and Unity. It provides SDKs and libraries for mobile development, allowing developers to easily add user authentication and authorization to their mobile applications.

# Lifecycle Management In AWS Cognito

User lifecycle management in Amazon Cognito refers to the management of user accounts from creation to deletion, including various states of user accounts in between. Here are the different states of user accounts in Amazon Cognito -

1. UNCONFIRMED: This is the initial state of a user account after it has been created. Users can be created in this state via sign-up or imported from a CSV file. They can't access any features of your application until they have confirmed their email address or phone number.
2. CONFIRMED: This state indicates that the user has confirmed their email address or phone number. They can now access the features of your application 
3. ARCHIVED: This state is used to indicate that the user account has been archived and can no longer be used. Archived user accounts are deleted after a certain period of time.
4. COMPROMISED: This state is used to indicate that the user account has been compromised and access to the account has been suspended. This can occur if a user's account is hacked or if their login credentials have been exposed.
5. FORCE_CHANGE_PASSWORD: This state is used to indicate that the user.account requires a password reset. This can be triggered by an administrator or by the user themselves.
6. RESET_REQUIRED: This state is used to indicate that the user account requires a password reset or some other action before it can be used again. This can occur if the user's account has been inactive for a certain period of time.
7. DISABLED: This state is used to indicate that the user account has been disabled and access to the account has been suspended. This can be triggered by an administrator or by the user themselves.

# Token Lifecycle Management AWS

Token rotation: To ensure security, tokens should be rotated regularly, which means generating new tokens and revoking old ones. AWS provides tools for automatically rotating certain types of tokens, such as temporary security credentials issued by AWS Security Token Service (STS).
Token expiration: Tokens should have an expiration time or date to limit their lifespan and reduce the risk of unauthorized access. AWS services such as Amazon Cognito or AWS Security Token Service allow you to configure token expiration periods.
Token revocation: If a token is no longer needed or has been compromised, it should be revoked immediately to prevent further unauthorized access. AWS services such as AWS Identity and Access Management (IAM) allow you to revoke access keys or temporary security credentials.
Token permissions: Tokens should have the minimum necessary permissions to perform their intended function. AWS services such as AWS IAM allow you to define permissions for users and groups based on policies that specify what actions they are allowed to perform.
Token storage: Tokens should be stored securely, preferably in a vault or secure key store. AWS provides various options for storing and managing secrets, such as AWS Secrets Manager or AWS Key Management Service (KMS).
Token monitoring: Token usage should be monitored and audited regularly to detect unusual activity or potential security breaches. AWS provides various tools for monitoring access to AWS resources, such as AWS CloudTrail or Amazon GuardDuty.

# Implementing AWS Congito In Project

1. Navigate to Amazon Cognito in AWS
2. Click on create a new user pool
3. Authentication Providers --> Congnito user pool
4. Cognito user pool sign-in-options --> email only
5. User name requirements --> leave blank
6. Password Policy --> Password policy mode --> Cognito defaults
7. Mulit-Factor-Authentication --> No MFA
8. User account-recovery --> Enable self account recovery
9. Delivey method for user account recovery messages --> email
10. Configure sign-in experience --> self registration --> enable
11. Attribute verification and user account confirmation --> Cognito-assisted verfification and confirmation --> Allow cognito to automatically send messages to verify and confirm --> enable
12. Attributes to Verify --> Send email messages, verify email address
13. Veifying attribute changes --> keep original attribute value when an update is pending --> enable
14. Active attribute values when an update is pending --> email address
15. Required attributes --> select name and preferred_username
16. Configure message delivery --> Email --> Email Provider --> Send email with cognito --> enable
17. SES region --> set your aws region
18. From email address --> select --> no-reply@verificationemail.com
19. Reply to email address leave blank
20. Integrate your app --> User pool name --> enter user pool name cruddur-user-pool
21. Hosted authentication pages --> disable
22. Domain --> Domain type --> use coginto domain --> leave as it is
23. Intial app client --> App type --> select --> Public client
24. App client name --> enter name thats relevent to the project --> cruddur
25. Client secret --> select --> Dont generate a client secret
26. Advanced app client setting leave as default
27. Attribute read and write permission leave as default
28. Review and create user pool

# AWS Amplify(frontend implementation with aws cognito)

is a development platform and set of tools provided by Amazon Web Services (AWS) that helps developers build cloud-powered mobile and web applications quickly and efficiently. It provides a set of libraries, UI components, and tools to simplify the development process and enables developers to integrate their applications with various AWS services such as AWS Lambda, Amazon S3, Amazon DynamoDB, and others

1. Install AWS Amplify --> cd into frontend-react-js
```
npm i aws-amplify --save
```
2. Configuring Amplify in App.js
```
import { Amplify } from 'aws-amplify';

Amplify.configure({
  "AWS_PROJECT_REGION": process.env.REACT_APP_AWS_PROJECT_REGION,
  "aws_cognito_region": process.env.REACT_APP_AWS_COGNITO_REGION,
  "aws_user_pools_id": process.env.REACT_APP_AWS_USER_POOLS_ID,
  "aws_user_pools_web_client_id": process.env.REACT_APP_CLIENT_ID,
  "oauth": {},
  Auth: {
    // We are not using an Identity Pool
    // identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID, // REQUIRED - Amazon Cognito Identity Pool ID
    region: process.env.REACT_AWS_PROJECT_REGION, // REQUIRED - Amazon Cognito Region
    userPoolId: process.env.REACT_APP_AWS_USER_POOLS_ID,  // OPTIONAL - Amazon Cognito User Pool ID
    userPoolWebClientId: process.env.REACT_APP_CLIENT_ID,  // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
  }
});
```
3.  Setting the env variables for the frontend from App.js and backend-flask in docker-compose file (This needs to be done inside the frontend in docker-compose)
```
******************************************************************
  frontend-react-js:
    environment:
      -----------------------code--------------------------------
      REACT_APP_AWS_PROJECT_REGION: "${AWS_DEFAULT_REGION}"
      REACT_APP_AWS_COGNITO_REGION: "${AWS_DEFAULT_REGION}"
      REACT_APP_AWS_USER_POOLS_ID: "us-east-1_<enter user pool ID from aws>"
      REACT_APP_CLIENT_ID: "<enter aws App integration tab --> App client and analytics CLIENT ID>"
      
    build: ./frontend-react-js
    ports:
      - "3000:3000"
    volumes:
      - ./frontend-react-js:/frontend-react-js
      -----------------------code--------------------------------
******************************************************************
```
4. Conditionally Show Logged in or Logged out HomeFeedPage --> HomeFeedPage.js (this page will conditionally render is user is logged in or not)
```
import { Auth } from 'aws-amplify';

// set a state
const [user, setUser] = React.useState(null);

// check if we are authenicated
const checkAuth = async () => {
  Auth.currentAuthenticatedUser({
    // Optional, By default is false. 
    // If set to true, this call will send a 
    // request to Cognito to get the latest user data
    bypassCache: false 
  })
  .then((user) => {
    console.log('user',user);
    return Auth.currentAuthenticatedUser()
  }).then((cognito_user) => {
      setUser({
        display_name: cognito_user.attributes.name,
        handle: cognito_user.attributes.preferred_username
      })
  })
  .catch((err) => console.log(err));
};
```
5. Passing props to the components from HomeFeedPages.js
```
<DesktopNavigation user={user} active={'home'} setPopped={setPopped} />
<DesktopSidebar user={user} />
```
6. Upadte DesktopSideBar.js syntax
```
import './DesktopSidebar.css';
import Search from '../components/Search';
import TrendingSection from '../components/TrendingsSection'
import SuggestedUsersSection from '../components/SuggestedUsersSection'
import JoinSection from '../components/JoinSection'

export default function DesktopSidebar(props) {
  const trendings = [
    {"hashtag": "100DaysOfCloud", "count": 2053 },
    {"hashtag": "CloudProject", "count": 8253 },
    {"hashtag": "AWS", "count": 9053 },
    {"hashtag": "FreeWillyReboot", "count": 7753 }
  ]

  const users = [
    {"display_name": "Andrew Brown", "handle": "andrewbrown"}
  ]

  let trending;
  let suggested;
  let join;
  if (props.user) {
    trending = <TrendingSection trendings={trendings} />
    suggested = <SuggestedUsersSection users={users} />
  } else {
    join = <JoinSection />
  }
  
  return (
    <section>
      <Search />
      {trending}
      {suggested}
      {join}
      <footer>
        <a href="#">About</a>
        <a href="#">Terms of Service</a>
        <a href="#">Privacy Policy</a>
      </footer>
    </section>
  );
}
```
7. Update ProfileInfo.js
```
// remove Cookies from "js-cookie and replace with code below
import { Auth } from 'aws-amplify';

const signOut = async () => {
  try {
      await Auth.signOut({ global: true });
      window.location.href = "/"
  } catch (error) {
      console.log('error signing out: ', error);
  }
}
```
8. Update SignIn Page with Amplify Auth
```
// replace cookies with auth from aws-amplify
import { Auth } from 'aws-amplify';

// const [cognitoErrors, setCognitoErrors] = React.useState('');

const onsubmit = async (event) => {
  setErrors('')
  event.preventDefault();
    Auth.signIn(email, password)
      .then(user => {
        localStorage.setItem("access_token", user.signInUserSession.accessToken.jwtToken)
        window.location.href = "/"
      })
      .catch(err => {
          if (error.code == 'UserNotConfirmedException') {
      window.location.href = "/confirm"
      }
    setErrors(error.message)
  });
  return false
}

let errors;
if (Errors){
  errors = <div className='errors'>{Errors}</div>;
}
```
9. Update Signup Page with Amplify Auth
```
import { Auth } from 'aws-amplify';

//const [cognitoErrors, setCognitoErrors] = React.useState('');

  const onsubmit = async (event) => {
    event.preventDefault();
    setErrors('')
    console.log('username',username)
    console.log('email',email)
    console.log('name',name)
    try {
      const { user } = await Auth.signUp({
        username: email,
        password: password,
        attributes: {
          name: name,
          email: email,
          preferred_username: username,
        },
        autoSignIn: { // optional - enables auto sign in after user is confirmed
          enabled: true,
        }
      });
      console.log(user);
      window.location.href = `/confirm?email=${email}`
    } catch (error) {
        console.log(error);
        setErrors(error.message)
    }
    return false
  }
```
10. Update Confirmation Page to handle Auth to resend email
```
import { Auth } from 'aws-amplify';

const resend_code = async (event) => {
  setErrors('')
  try {
    await Auth.resendSignUp(email);
    console.log('code resent successfully');
    setCodeSent(true)
  } catch (err) {
    // does not return a code
    // does cognito always return english
    // for this to be an okay match?
    console.log(err)
    if (err.message == 'Username cannot be empty'){
      setErrors("You need to provide an email in order to send Resend Activiation Code")   
    } else if (err.message == "Username/client id combination not found."){
      setErrors("Email is invalid or cannot be found.")   
    }
  }
}

const onsubmit = async (event) => {
  event.preventDefault();
  setErrors('')
  try {
    await Auth.confirmSignUp(email, code);
    window.location.href = "/"
  } catch (error) {
    setErrors(error.message)
  }
  return false
}
```
11. Upadte Recovery Page
```
import { Auth } from 'aws-amplify';

const onsubmit_send_code = async (event) => {
  event.preventDefault();
  setErrors('')
  Auth.forgotPassword(username)
  .then((data) => setFormState('confirm_code') )
  .catch((err) => setErrors(err.message) );
  return false
}

const onsubmit_confirm_code = async (event) => {
  event.preventDefault();
  setErrors('')
  if (password == passwordAgain){
    Auth.forgotPasswordSubmit(username, code, password)
    .then((data) => setFormState('success'))
    .catch((err) => setErrors(err.message) );
  } else {
    setErrors('Passwords do not match')
  }
  return false
}

## Authenticating Server Side

Add in the `HomeFeedPage.js` a header eto pass along the access token

```js
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`
  }
```

12. Update backend-flask app.py to allow headers for Authorization
```
cors = CORS(
  app, 
  resources={r"/api/*": {"origins": origins}},
  headers=['Content-Type', 'Authorization'], 
  expose_headers='Authorization',
  methods="OPTIONS,GET,HEAD,POST"
)
```
14. AWS --> navigate to user pool --> select --> create a user
* click on email
* user name - enter name
* email address -  enter email address
* set password - enter password
* Users --> comfirm user by selecting the user to confirm
* check email for password from aws

# Resolving the issue with setting user with AWS INCOGNITO (step 14 did not work this will resolve the issue)
run this command in cli
```
cognito-idp admin-set-user-password --username <enter username> --password =<enter password> --user-pool-id <enter user pool ID>  --permanent
```

# Resolving Name In Frontend User Attributes --> frontend sidebar navigation
AWS navigate to user pool and inside the console click on user attributes and enter name and preffered name.

# Implementing signup in AWS Cognito --> frontend
1. delete the user created in AWS in the user pool (previously created manually now will be done in the frontend)
