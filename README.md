# Gulp boilerplate. Pug + SCSS + ES6 (webpack-stream)

Simple but comfy boilerplate for fast building static sites
## Features

- Component approach
- ES6 syntax
- Fast builds and recompiling
- Autoincluding pug and scss files

## Run Locally

Clone the project

```bash
  git clone https://github.com/kenakula/boiler-gulp-pug-sass.git
```

Go to the project directory

```bash
  cd boiler-gulp-pug-sass
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```


## Commands

build production files

```bash
  npm run build
```

lint js files

```bash
  npm run lint
```

lint with fixing js files

```bash
  npm run lint-fix
```

lint scss files

```bash
  npm run stylelint
```
## Usage/Examples

### pug

include pug mixins in src/pug/base/mixins.pug
```
include ../path/to/pug/mixin
```

put your pages in src/pug/views

### scss
include scss files in src/styles/style.scss
```
@import '../path/to/some/style.scss'
```

### js
export components or blocks js files in index.js
```
export * from './component/component.js'
```

then import component script in src/js/main.js

```javascript
import { initSomething } from '../components';

document.addEventListener('DOMContentLoaded', () => {
    initSomething();
})
```
## Authors

- [@kenakula](https://github.com/kenakula)

