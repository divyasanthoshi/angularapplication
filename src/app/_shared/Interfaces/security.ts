export interface UserToken {
    username?: string;
    password?: string;
    clientId?: string;
    clientSecret?: string;
    accessToken?: string;
    refreshToken?: string;
    tokenType?: string;
    scope?: string;
    expiresAt?: number;
}

export interface UserAccess {
    moduleId: number;
    pageId: number;
    sectionControlId: number;
    isVisible: boolean;
    isEnabled: boolean;
}

// has 'I' prefix to avoid conflict with UserClaim model
export interface IUserClaim {
    token: string;
    clientId: string;
    clientSecret: string;
    sub: string;
    name: string;
    familly_name: string;
    given_name: string;
    middle_name: string;
    preferred_username: string;
    email: string;
    phone_number: number;
    expireAt: number;
    agency: string;
    region: string;
    role: string;
    personId: number;
    agencyId: number;
    regionId: number;
    roleId: number;
}
