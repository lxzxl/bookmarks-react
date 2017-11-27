import * as wilddog from 'wilddog';

declare global {
    interface Window {
        ref: wilddog.sync.Reference;
    }

    interface CollectionModel {
        title: string;
        bookmarks: Array<BookmarkModel>;
    }

    type CollectionList = Array<{ key: string, collection: CollectionModel }>;

    interface BookmarkModel {
        id?: number;
        name: string;
        url: string;
        iconName: string;
        iconUrl: string;
    }
}
