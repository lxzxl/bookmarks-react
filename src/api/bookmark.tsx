import * as wilddog from 'wilddog';

export default class Bookmark {
    private ref: wilddog.sync.Reference;

    constructor(app: wilddog.app.App) {
        this.ref = app.sync().ref('collections');
    }

    get() {
        return this.ref;
    }

    add() {
        return this.ref;
    }

    delete() {
        return this.ref;
    }
}
