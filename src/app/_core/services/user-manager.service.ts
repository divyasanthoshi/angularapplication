import { Injectable } from '@angular/core';
import { UserToken } from 'src/app/_shared/Interfaces/security';
import { AuthService } from './auth.service';
import { Storage } from '@ionic/storage';
import { UserClaim } from 'src/app/_shared/models/security';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {

  _userClaim: UserClaim;

  constructor(
    private authService: AuthService,
    private storage: Storage,
  ) {
  }

  private get _userStoreKey() {
    return `user_claim`;
  }
  // this will be used to retrieve the user claim information
  getUserClaim() {
    return this.storage.get(this._userStoreKey).then(userClaim => {
      if (userClaim) {
        this._userClaim = new UserClaim(userClaim);
        return this._userClaim.fromStorageString(userClaim);
      }
      return null;
    });
  }

  // remove the user information from the storage
  removeUserClaim() {
    return this._storeUserClaim(null);
  }

  // sign in the user with user crendentials
  signin(userToken: UserToken): Observable<boolean>  {
    return this.authService.login(userToken).pipe(
      tap(result => {
        if (result) {
          // if the token result get back from API is valid, then get user claim
          this.authService.getUserClaim().subscribe(userClaim => {
            if (userClaim) {
              this._storeUserClaim(new UserClaim(userClaim));
            } else {
              this._storeUserClaim(null);
            }
          });
        }
      })
    );
  }

  // silent sign in, this will be used to refresh the user's token automatically
  signinSilent() {
    return this.getUserClaim().then(userClaim => {
      if (userClaim) {
        this.authService.loginSilent().subscribe(token => {
          if (token) {
            // whenever the token is refreshed, there will be a new expiration date for the session, need to update user claim
            this.authService.getUserClaim().subscribe(udpatedUserClaim => {
              if (udpatedUserClaim) {
                this._storeUserClaim(new UserClaim(udpatedUserClaim));
              } else {
                this._storeUserClaim(null);
              }
            });
          }
        });
      }
    });
  }

  // signout the user
  signOut() {
    return this.authService.logout().pipe(
      tap(isLoggedOut => {
        if (isLoggedOut) {
          // clear the value for the user claim if the user is logged out
          this._storeUserClaim(null);
        }
      })
    );
  }

  // check if the user is logged in
  isSignnedIn() {
    return this.getUserClaim().then(user => {
      const userCurrent = !!user && !user.expired;
      return userCurrent;
    });
  }

  // store user claim in the storage
  _storeUserClaim(userClaim: UserClaim) {
    if (userClaim) {
      const storageString = userClaim.toStorageString();
      return this.storage.set(this._userStoreKey, storageString);
    } else {
      return this.storage.remove(this._userStoreKey);
    }
  }
}
