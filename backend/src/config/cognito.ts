import { CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider';

interface ICognitoClient {
  region: string;
}

export const CognitoClient = ({ region }: ICognitoClient) =>
  new CognitoIdentityProviderClient({
    region,
  });
