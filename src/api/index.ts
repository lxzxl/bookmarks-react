import * as wilddog from 'wilddog';
import Auth from './auth';
import Bookmark from './bookmark';

const config = {
    syncURL: 'https://startme.wilddogio.com',
    websocketOnly: false,
    authDomain: 'startme.wilddog.com'
};
const app = wilddog.initializeApp(config);
export const auth = new Auth(app);
export const bookmark = new Bookmark(app);
