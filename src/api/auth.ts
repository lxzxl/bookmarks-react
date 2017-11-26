import * as wilddog from 'wilddog';

export default class Auth {
    private auth: wilddog.auth.Auth;

    constructor(app: wilddog.app.App) {
        this.auth = app.auth();
    }

    signInAnonymously() {
        return this.auth.signInAnonymously().then(function(user: {}) {
            console.log(user);
        }).catch(function(err: Error) {
            throw(err);
        });
    }

    signIn(email: string, pwd: string) {
        return this.auth.signInWithEmailAndPassword(email, pwd)
            .then(function() {
                console.info('login success, currentUser->', wilddog.auth().currentUser);
            }).catch(function(err: Error) {
                throw(err);
            });
    }

    signOut() {
        return this.auth.signOut().then(function() {
            console.info('user sign out.');
        });
    }
}
