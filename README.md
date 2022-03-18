# heapfind

Efficient sorted find function, using a heap to efficiently sort until a match is found.

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

```
import heapfind from 'heapfind';

const firstFoo = heapfind(
  [
    { index: 3, name: 'foo' },
    { index: 1, name: 'bar' },
    { index: 2, name: 'foo' },
  ],
  (a, b) => a.index - b.index,
  ({ name }) => name === 'foo'
);
```

## Credits
[Emily Marigold Klassen](https://github.com/forivall/)

## License

ISC
