# Bookmark collection page

> A bookmark collection page.

- Frontend is based on React.js and Bulma.css;
- Backend is based on wilddog service (BaaS);

##Steps to deploy the site:

### 1. register a [Wilddog](https://www.wilddog.com/) service.

### 2. Set up wilddog rules

```json
{
  "rules": {
    ".read": "false",
    ".write": "false",
    "$user": {
      ".read": "auth.uid == $user",
      ".write": "auth.uid == $user"
    }
  }
}
```

p.s. I think firebase has similar configuration.


### 3. Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:3000
npm start

# build for production with minification
npm run build
```

### 4. Deploy to git pages.

- If you are using `<username>.github.io`, just add all files under build/ to you `<username>.github.io` repo.
- If you want to attach the site to a sub path, then change `assetsPublicPath` in `config.js` to `/<your-repo-name>/` and rebuild.

##License
[MIT License](LICENSE)