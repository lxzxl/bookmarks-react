import * as wilddog from 'wilddog';

const config = {
    authDomain: 'startme.wilddog.com'
};
wilddog.initializeApp(config);

// export const signIn = function (email: string, pwd: string) {
//     return wilddog.auth().signInWithEmailAndPassword(email, pwd)
//         .then(function () {
//             console.info("login success, currentUser->", wilddog.auth().currentUser);
//         }).catch(function (err: Error) {
//         console.info('login failed ->', err);
//     });
// };
