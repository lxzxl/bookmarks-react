import * as wilddog from 'wilddog';

const config = {
    authDomain: 'startme.wilddog.com'
};
wilddog.initializeApp(config);

export const signInAnonymously = function() {
    return wilddog.auth().signInAnonymously().then(function(user: {}) {
        console.log(user);
    }).catch(function(err: Error) {
        throw(err);
    });
};

export const signIn = function(email: string, pwd: string) {
    return wilddog.auth().signInWithEmailAndPassword(email, pwd)
        .then(function() {
            console.info('login success, currentUser->', wilddog.auth().currentUser);
        }).catch(function(err: Error) {
            throw(err);
        });
};

export const signOut = function() {
    return wilddog.auth().signOut().then(function() {
        console.info("user sign out.");
    });
};
