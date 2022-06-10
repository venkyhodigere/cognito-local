import {
    DescribeUserPoolDomainRequest,
    DescribeUserPoolDomainResponse,
  } from "aws-sdk/clients/cognitoidentityserviceprovider";
import { Services } from "../services";
import { UserPoolDomain } from "../services/userPoolDomain";
import { Target } from "./Target";
import { DomainNotFoundError } from "../errors";

export type DescribeUserPoolDomainTarget = Target<
    DescribeUserPoolDomainRequest, 
    DescribeUserPoolDomainResponse>;

type DescribeUserPoolDomainServices = Pick<Services, "cognito">;

export const DescribeUserPoolDomain =
    ({
        cognito
    }: DescribeUserPoolDomainServices): DescribeUserPoolDomainTarget =>
        async (ctx, req) => {

            // const userPool = await cognito.getUserPoolDomain(ctx, req.UserPoolId);   //TODO: How do we get the user pool ID?
        
            const userPoolDomain: (UserPoolDomain|null) = await cognito.getUserPoolDomain(ctx, req.Domain);

            if(userPoolDomain === null) {
                throw new DomainNotFoundError();
            }

        return {
            DomainDescription: {
                AWSAccountId: "",
                CloudFrontDistribution: "",
                CustomDomainConfig: null, //TODO not supported
                Domain: userPoolDomain.Domain,
                S3Bucket: "",
                Status: "",
                UserPoolId: "",
                Version: ""
            } 
        };
};
  