import {
    CreateUserPoolDomainRequest,
    CreateUserPoolDomainResponse,
  } from "aws-sdk/clients/cognitoidentityserviceprovider";
import { Services } from "../services";
import { UserPoolDomain } from "../services/userPoolDomain";
import { Target } from "./Target";

export type CreateUserPoolDomainTarget = Target<
    CreateUserPoolDomainRequest, 
    CreateUserPoolDomainResponse>;

type CreateUserPoolDomainServices = Pick<Services, "cognito">;

export const CreateUserPoolDomain =
    ({
        cognito
    }: CreateUserPoolDomainServices): CreateUserPoolDomainTarget =>
        async (ctx, req) => {
        const userPool = await cognito.getUserPool(ctx, req.UserPoolId);   //TODO: Do we need this?

        const userPoolDomain: UserPoolDomain = {        
            CustomDomainConfig: req.CustomDomainConfig,
            Domain: req.Domain,
            UserPoolId: req.UserPoolId,
        };

        const cloudFrontDomain = await userPool.saveUserPoolDomain(ctx, userPoolDomain);

        return {
            CloudFrontDomain: cloudFrontDomain
        };
};
  