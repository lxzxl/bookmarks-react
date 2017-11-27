import * as wilddog from 'wilddog';

export default class Bookmark {
    private ref: wilddog.sync.Reference;

    constructor(app: wilddog.app.App) {
        this.ref = app.sync().ref('collections');
    }

    register(callback: (data: CollectionList) => void) {
        this.ref.on('value', function(snapshot: wilddog.sync.DataSnapshot) {
            const collectionList: CollectionList = [];
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

    add(collection: CollectionModel) {
        return this.ref.push(collection);
    }

    update(key: string, collection: CollectionModel) {
        return this.ref.child(key).set(collection);
    }

    remove(key: string) {
        return this.ref.child(key).remove();
    }
}
