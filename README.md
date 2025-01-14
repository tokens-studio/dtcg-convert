# DTCG Convert Web Component & App

![NPM version badge](https://img.shields.io/npm/v/@tokens-studio/dtcg-convert) ![License badge](https://img.shields.io/github/license/tokens-studio/dtcg-convert)

A reusable Web Component for converting a Style Dictionary formatted JSON file or ZIP of JSON files to DTCG format.

Using [Style Dictionary's DTCG conversion utilities](https://styledictionary.com/reference/utils/dtcg/).

[Click here for the demo](https://dtcg-convert.netlify.app).

## Installation

With [NPM](https://www.npmjs.com/):

```sh
npm install @tokens-studio/dtcg-convert
```

## Usage

```js
// registers <dtcg-convert>
import '@tokens-studio/dtcg-convert/define';
```

```html
<dtcg-convert></dtcg-convert>
```

Or with a custom label (which can also be set as a property through JS):

```html
<dtcg-convert label="Convert me!"></dtcg-convert>
```

Or with a different button element, which does not have to be a shoelace button, it could be your own:

```html
<dtcg-convert>
  <sl-button variant="neutral">Convert me!</sl-button>
</dtcg-convert>
```

Note that since the component uses Shoelace button as a default, you will have to load a theme when using it, for light mode:

```html
<head>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.19.1/cdn/themes/dark.css"
  />
</head>
```

For dark mode you'll also have to set the dark theme class on the `html` element:

```html
<html class="sl-theme-dark">
  <head>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.19.1/cdn/themes/dark.css"
    />
  </head>
</html>
```

> See [Shoelace Themes Docs](https://shoelace.style/getting-started/themes) for more info

### Extending

You may want to further customize this component's functionality.

The recommended way is by extending the base class and using method overrides:

```js
import { html } from 'lit';
import { DtcgConvert } from '@tokens-studio/dtcg-convert';

class CustomDtcgConvert extends DtcgConvert {
  // overrides
}
```

### Bare import specifiers

This Web Component is published to NPM as an ES Module.
It's usable in any modern JavaScript context out of the box with the exception that it uses bare import specifiers, for example:

```js
import { render } from 'lit';
```

By default, browsers won't know how to resolve the specifier `'lit'`, only absolute and relative paths are allowed.

This means you either need:

- a bundler like [Rollup](https://rollupjs.org/) (needs `@rollup/plugin-node-resolve`)
- a smart dev server like [Vite](https://vitest.dev/)
- inject an import map that tells the browser how to resolve the specifier

The easiest solution if you're not familiar with bundlers and dev servers is to create an import map e.g. using [JSPM](https://jspm.org/).

If you've installed this module from NPM into your local project:

```sh
npx jspm install -p nodemodules @tokens-studio/dtcg-convert
```

Which creates an `importmap.json` file, the contents of which you can put inside an `importmap` script in your HTML:

```html
<script type="importmap">
  ... import map contents here ...
</script>
```

Alternatively, if you don't want to install from NPM locally and would rather just consume from a CDN like JSPM:

```sh
npx jspm install @tokens-studio/dtcg-convert
```

Some CDNs like [JSDelivr ESM](https://www.jsdelivr.com/esm) or [unpkg](https://www.unpkg.com/) (using `?module` query parameter) have ways of auto-resolving bare import specifiers for you, so adding an importmap might be optional in that case.
