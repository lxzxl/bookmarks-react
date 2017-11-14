import * as wilddog from 'wilddog';

declare global {
    interface Window {
        ref: wilddog.sync.Reference;
    }

    interface BookmarkModel {
        id: string;
        name: string;
        url: string;
        iconUrl: string;
    }

}
