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
