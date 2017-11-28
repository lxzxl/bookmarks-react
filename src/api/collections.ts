import * as wilddog from 'wilddog';

export default class {
    private app: wilddog.app.App;
    private ref: wilddog.sync.Reference;

    constructor(app: wilddog.app.App) {
        this.app = app;
        this.setRef();
    }

    setRef() {
        const user = this.app.auth().currentUser;
        if (!user) {
            return;
        }
        this.ref = this.app.sync().ref(`${user.uid}`).child('collections');
    }

    register(callback: (data: CollectionList<CollectionData>) => void) {
        this.ref.on('value', function(snapshot: wilddog.sync.DataSnapshot) {
            const collectionList: CollectionList<CollectionData> = [];
            snapshot.forEach((child) => {
                collectionList.push({
                    key: child.key(),
                    collection: child.val()
                });
            });

            callback(collectionList);
        });
    }

    unregister(event?: string) {
        this.ref.off(event);
    }

    add(collection: CollectionData) {
        return this.ref.push(collection);
    }

    update(key: string, collection: CollectionData) {
        const collectionSchema: CollectionSchema = {
            title: collection.title,
            bookmarks: [...collection.bookmarks, ...collection.newBookmarks]
        };
        return this.ref.child(key).update(collectionSchema);
    }

    remove(key: string) {
        return this.ref.child(key).remove();
    }
}
