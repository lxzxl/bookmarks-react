import wilddog from 'wilddog';

export default class Auth {
    private auth: wilddog.auth.Auth;

    constructor(private app: wilddog.app.App) {
        this.app = app;
        this.auth = app.auth();
    }

    async signIn(email: string, pwd: string) {
        try {
            await this.auth.signInWithEmailAndPassword(email, pwd);
            this.app.sync().goOnline();
        } catch (err) {
            throw err;
        }
    }

    async signInAnonymously() {
        try {
            await this.auth.signInAnonymously();
            this.app.sync().goOnline();
        } catch (err) {
            throw(err);
        }
    }

    async signOut() {
        await this.auth.signOut();
        this.app.sync().goOffline();
    }
}
