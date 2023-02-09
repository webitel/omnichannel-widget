import BrowserSprite from 'svg-baker-runtime/src/browser-sprite';
import domready from 'domready';

/*
https://my.webitel.com/browse/WPRO-621

Problem: html has a <base> tag: "Specify a default URL and a default target for all links on a page"
if base tag is declared, svg-sprite-loader writes to already embedded sprites
(client svg sprites -- which are already declared when we are loading wt-omni-widget)
usages this base: (<use xlink:href="#location"></use> -> <use xlink:href="https:/base.url/#location"></use>)
which brakes these icons.

Solution: change svg-sprite-loader config to prevent writing base to icon usage

https://stackoverflow.com/questions/18259032/using-base-tag-on-a-page-that-contains-svg-marker-elements-fails-to-render-marke
https://www.npmjs.com/package/svg-sprite-loader#sprite-module
https://github.com/JetBrains/svg-sprite-loader/issues/116
https://github.com/JetBrains/svg-mixer/blob/v1/packages/svg-baker-runtime/src/browser-sprite.js#L41
 */

const sprite = new BrowserSprite({
  syncUrlsWithBaseTag: false,
});
domready(() => sprite.mount(document.body));

export default sprite;
