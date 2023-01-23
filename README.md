# Gulp boilerplate. Pug + SCSS + ES6 + typescript (webpack-stream)

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

validate html files

```bash
  npm run validate
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
## Authors

- [@kenakula](https://github.com/kenakula)

