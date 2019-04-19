<div align="center">
<h1>V-clamp :speech_balloon:</h1> 

[![MIT license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/SparingSoftware/v-clamp/blob/master/LICENSE)
[![Downloads number](https://img.shields.io/npm/dt/@sparing-software/v-clamp.svg)](https://www.npmjs.com/package/@sparing-software/v-clamp)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Vue directive plugin for text truncate.
Plugin cuts too long text and replace it with ellipsis.
</div>

![Comparison basic multiline text-overflow and multiline text with use v-clamp directive](https://user-images.githubusercontent.com/33500690/56319221-5ce8e680-6161-11e9-9bba-6cd484a17eb7.png)

## How to use
### Installation
Install package in your project 
```bash
$ npm install @sparing-software/v-clamp
```
 
### Configuration
Basic config in Vue app by global import plugin in main.js file
```javascript
import Clamp from '@sparing-software/v-clamp'

Vue.use(Clamp)
```

### Implementation
All you need to do is add **v-clamp** directive to element on which you want to ellipsis overflow and specify its **height** or **max-height** style property.

Look at the example below:
```html
<template>
  <p v-clamp class="text">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
  </p>
</template>

<style>
  .text {
     max-height: 100px;
  }
</style>
```

### Options
- **replacement** (type: _String_) - replacement character  
_default_ '…' - standard ellipsis character  
Warning! Usage space in this string causes errors!
- **debounceTime** (type: _Number_) - debounce time in milliseconds for listeners on resize and orientation change  
_default_ 300

Example config with own options
```javascript
Vue.use(Clamp, {
  replacement: '...',
  debounceTime: 100
})
```

## Contributing
Want to help improve this plugin? Great!  
Project is open-source so fork repo and join us!

## License
MIT License © [Sparing Interactive](https://github.com/SparingSoftware)
