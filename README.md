# heapfind

Simple function decorator/wrapping util, in typescript

[![build status](https://github.com/forivall/heapfind/actions/workflows/main.yml/badge.svg)](https://github.com/forivall/heapfind/actions/workflows/main.yml)
[![dependency status](https://david-dm.org/forivall/heapfind.svg)](https://david-dm.org/forivall/heapfind)
[![coverage status](https://coveralls.io/repos/github/forivall/heapfind/badge.svg)](https://coveralls.io/github/forivall/heapfind)
[![npm version](https://img.shields.io/npm/v/heapfind)](https://npm.im/heapfind)
[![bundle size](https://img.shields.io/bundlephobia/minzip/heapfind)](https://img.shields.io/bundlephobia/minzip/heapfind)

## Installation

```
npm install --save heapfind
```

## Usage

Using the following wrapper function for our examples

```ts
function log<F extends (...args: any[]): any>(fn: F, label: string): F {
  return (...args: Parameters<F>) => {
    console.log(`enter ${label}`)
    const out: ReturnType<F> = fn(...args)
    console.log(`exit ${label}`)
    return out
  } as F
}
```

### `wrap()`
```ts
import {wrap} from 'heapfind'
const doStuff = wrap(log, () => console.log('stuff'), 'doStuff')
doStuff()
// Output:
// enter doStuff
// stuff
// exit doStuff
```

### `decorator()`
Create a decorator function
```ts
import decorator from 'heapfind'
const logDecorator = decorator(log)
class Stuff {
  @logDecorator('doStuff')
  doIt() {
    console.log('stuff')
  }
}
new Stuff().doIt()
// Output:
// enter doStuff
// stuff
// exit doStuff
```

### `proxied()`
Add metadata to a function that proxies another. Useful for the proxy pattern.
```ts
class Stuff {
  doIt() {
    console.log('stuff')
  }
  somethingElse() {
    console.log('more stuff')
  }
}

import {proxied} from 'heapfind'
class StuffWrapper {
  stuff = new Stuff()
}
interface StuffWrapper implements Stuff {}
Object.keys(Stuff.prototype).forEach((k) => {
  StuffWrapper.prototype[k] = proxied(Stuff, k, function(this: StuffWrapper, ...args: unknown[]) {
    return this.stuff[k](...args)
  })
})
```

## Credits
[Emily Marigold Klassen](https://github.com/forivall/)

## License

ISC
