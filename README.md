# stickytoolbar TinyMCE Plugin

Have a large amount of content in your wysiwyg editor and hate having to scroll up to use the toolbar buttons? This is trying to solve that.

### Versions:
- latest version is for TinyMCE 5
- version 1.2.1 is for TinyMCE < 5

### Options:
- sticky_offset: By default the toolbar sticks to the top of the viewport, increase this number so the toolbar can stick below any fixed elements such as a header.
- If your implementation has different classes:
  - sticky_toolbar_container
  - sticky_menubar_container
  - sticky_statusbar_container

```js
tinymce.init({
  selector:'textarea',
  plugins: 'stickytoolbar',
  sticky_offset: 80,
  sticky_toolbar_container: '.tox-toolbar',
  sticky_menubar_container: '.tox-menubar',
  sticky_statusbar_container: '.tox-statusbar'
});
```

## The development server

By running the `npm start` command you start the development server and open a browser window with an instance of TinyMCE with your plugin added to it. This window will reload automatically whenever a change is detected in the `index.html` file in the `static` folder or in one of the JavaScript files in the `src` directory.

## The production build

By running the `npm run build` command Webpack will create a `dist` directory with a child directory with the name of your plugin (stickytoolbar) containing three files:

* `plugin.js` - the bundled plugin
* `plugin.min.js` - the bundles, uglified and minified plugin
* `LICENSE` - a file explaining the license of your plugin (copied over from `src/LICENSE`)
