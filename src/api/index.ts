import wilddog from 'wilddog';
import {appID} from '../config/wilddog';
import Auth from './auth';
import Collections from './collections';

const config = {
    syncURL: `https://${appID}.wilddogio.com`,
    websocketOnly: false,
    authDomain: `${appID}.wilddog.com`
};

export const app = wilddog.initializeApp(config);
export const AuthApi = new Auth(app);
export const CollectionsApi = new Collections(app);
