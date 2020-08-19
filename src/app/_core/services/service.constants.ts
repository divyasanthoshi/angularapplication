export class ServiceConstants {
    public static readonly securityBaseUrl = '';

    public static readonly security = {
        url: {
            userToken: `${ServiceConstants.securityBaseUrl}/api/User/Token`,
            userClaim: `${ServiceConstants.securityBaseUrl}/api/User/Claim`
        }
    };
}
