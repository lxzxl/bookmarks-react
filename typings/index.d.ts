import * as wilddog from 'wilddog';

declare global {
    interface Window {
        ref: wilddog.sync.Reference;
    }

    interface CollectionSchema {
        title: string;
        bookmarks: Array<BookmarkModel>;
    }

    interface CollectionData extends CollectionSchema {
        newBookmarks: Array<BookmarkModel>;
    }

    type CollectionList<T extends CollectionSchema | CollectionData> = Array<{ key: string, collection: T }>;

    interface BookmarkModel {
        id?: number;
        name: string;
        url: string;
        iconName: string;
        useIconName?: boolean;
        iconUrl: string;
    }
}
