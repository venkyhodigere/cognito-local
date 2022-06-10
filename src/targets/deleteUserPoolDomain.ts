import {
    DeleteUserPoolDomainRequest,
    DeleteUserPoolDomainResponse,
  } from "aws-sdk/clients/cognitoidentityserviceprovider";
import { Services } from "../services";
import { UserPoolDomain } from "../services/userPoolDomain";
import { Target } from "./Target";

export type DeleteUserPoolDomainTarget = Target<
    DeleteUserPoolDomainRequest, 
    DeleteUserPoolDomainResponse>;

type DeleteUserPoolDomainServices = Pick<Services, "cognito">;

export const DeleteUserPoolDomain =
    ({
        cognito
    }: DeleteUserPoolDomainServices): DeleteUserPoolDomainTarget =>
        async (ctx, req) => {
        const userPool = await cognito.getUserPool(ctx, req.UserPoolId);  //TODO: Do we need this?

        const userPoolDomain: UserPoolDomain = {        
            Domain: req.Domain,
            UserPoolId: req.UserPoolId,
        };

        await userPool.deleteUserPoolDomain(ctx, userPoolDomain);

        return null;
};
  