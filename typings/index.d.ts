import * as wilddog from 'wilddog';

declare global {
    interface Window {
        ref: wilddog.sync.Reference;
    }

    interface BookmarkModel {
        id?: number;
        name: string;
        url: string;
        iconName: string;
        iconUrl: string;
    }

    interface NewBookmarkModel extends BookmarkModel {
        id: number;
    }
}
