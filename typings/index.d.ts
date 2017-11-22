import * as wilddog from 'wilddog';

declare global {
    interface Window {
        ref: wilddog.sync.Reference;
    }

    interface BookmarkModel {
        name: string;
        url: string;
        iconName?: string;
        iconUrl: string;
    }

}
