## log-with-line-info
This is a little utility to allow for including line info when emitting quick and dirty `console.log` calls. It's opinionated and not meant to be particularly robust... meant for dirty debugging, not production.
a meaningless change
## Usage

ESM
```js
import { logWithLineInfo } from 'log-with-line-info';

logWithLineInfo('any message'); // ./index.js:3:1 - any message
```

CommonJS
```js
const { logWithLineInfo } = require('log-with-line-info')

logWithLineInfo('any message'); // ./index.js:3:1 - any message
```

When code is executed within a terminal that supports colors, the file/line info will be printed in grey to help visually distinguish it from the message.
- ![#aaaaaa](https://placehold.co/15x15/aaaaaa/aaaaaa.png) on dark backgrounds
- ![#666666](https://placehold.co/15x15/666666/666666.png) on light backgrounds

### Notes on browser usage

Major browsers already include rich links to the line where `console.log` was called. When this library detects it's being run in a browser environment, it simply passes the message straight to `console.log` and doesn't do anything special. This allows for the same utility function to be used in workflows that execute in _both_ node and the browser... but for browser-only usage, this package is not needed.