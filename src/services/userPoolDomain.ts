import {
    CustomDomainConfigType
  } from "aws-sdk/clients/cognitoidentityserviceprovider";

  export interface UserPoolDomain {

    /**
     * The configuration for a custom domain that hosts the sign-up and sign-in webpages for your application.
     * Provide this parameter only if you want to use a custom domain for your user pool. 
     * Otherwise, you can exclude this parameter and use the Amazon Cognito hosted domain instead.
     */
    CustomDomainConfig?: CustomDomainConfigType

    /**
     * The domain string. For custom domains, this is the fully-qualified domain name, such as auth.example.com. 
     * For Amazon Cognito prefix domains, this is the prefix alone, such as auth.
     */
    Domain: string

    /**
     * The user pool ID.
     */
    UserPoolId: string
  }
