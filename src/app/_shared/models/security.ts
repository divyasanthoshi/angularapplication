import { UserToken, IUserClaim } from '../Interfaces/security';
/*
    This model is used to store user claim related information. It will be cached in session storage to keep
    this same setting with the server session manageemnt.
*/
export class UserClaim implements IUserClaim {
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

    constructor({token, clientId, clientSecret, sub, name, familly_name, given_name,
        middle_name, preferred_username, email, phone_number, expireAt, agency, region,
        role, personId, agencyId, regionId, roleId}) {

        this.token = token;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.sub = sub;
        this.name = name;
        this.familly_name = familly_name;
        this.given_name = given_name;
        this.middle_name = middle_name;
        this.preferred_username = preferred_username;
        this.phone_number = phone_number;
        this.agency = agency;
        this.region = region;
        this.role = role;
        this.personId = personId;
        this.expireAt = expireAt;
        this.agencyId = agencyId;
        this.regionId = regionId;
        this.roleId = roleId;
    }

    get expireIn() {
        if (this.expireAt) {
            const now = parseInt((Date.now() / 1000).toString(), 10);
            return this.expireAt - now;
        }
        return undefined;
    }
    set expireIn(value: number) {
        const expireIn = value;
        if (typeof expireIn === 'number' && expireIn > 0) {
            const now = parseInt((Date.now() / 1000).toString(), 10);
            this.expireAt = now + expireIn;
        }
    }

    get expired() {
        const expireIn = this.expireIn;
        if (expireIn !== undefined) {
            return expireIn <= 0;
        }
        return undefined;
    }

    // get scopes() {
    //     return (this.scope || '').split(' ');
    // }
    public toStorageString() {
        return JSON.stringify({
            token: this.token,
            clientId: this.clientId,
            clientSecret: this.clientSecret,
            sub: this.sub,
            name: this.name,
            familyName: this.familly_name,
            givenName: this.given_name,
            middleName: this.middle_name,
            preferredUserName: this.preferred_username,
            email: this.email,
            phoneNumber: this.phone_number,
            expireAt: this.expireAt,
            agency: this.agency,
            region: this.region,
            role: this.role,
            personId: this.personId,
            agencyId: this.agency,
            regionId: this.regionId,
            roleId: this.roleId
        });
    }

    public fromStorageString(storageString) {
        return new UserClaim(JSON.parse(storageString));
    }
}
