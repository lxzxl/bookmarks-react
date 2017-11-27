import * as wilddog from 'wilddog';
import Auth from './auth';
import Collections from './collections';

const config = {
    syncURL: 'https://wd2170735258enospc.wilddogio.com',
    websocketOnly: false,
    authDomain: 'wd2170735258enospc.wilddog.com'
};
const app = wilddog.initializeApp(config);
export const AuthApi = new Auth(app);
export const CollectionsApi = new Collections(app);
