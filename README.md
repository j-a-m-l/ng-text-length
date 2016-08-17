# ng-text-length

This module includes 2 directives that are intended to evaluate the length of the text inside a HTML string:
 * minTextLength: equal or shorter.
 * maxTextLength: equl or longer.

## Installation

Via Bower:

```shell
bower install ng-text-length
```

## Usage

Include the source file in your HTML:

```html
<script src="bower_components/ng-text-length/ng-text-length.js"></script>
```

Add the module `ngTextLength` as a dependency to your app module:

```js
var app = angular.module('example', ['ngTextLength']);
```

Now, any form component can use both directives:

```html
<form name="testForm">
	<input name='myField' min-text-length="minimum" max-text-length="maximum" ng-model="myModel" />
</form>
```

### Examples

Some values:

```js
// Invalid
myModel = '<div></div>'
minimum = 1

// Valid
myModel = '<div>example</div>'
minimum = 1

// Invalid
myModel = '<div>example</div>'
maximum = 3

// Valid
myModel = '<div>x</div>'
maximum = 3

// Valid
myModel = '<div>yes</div>'
minimum = 1
maximum = 3
```

## Repository

The main repository is: https://github.com/j-a-m-l/ng-text-length

## Authors

Juan A. Martín Lucas (https://github.com/j-a-m-l)

## License

This project is licensed under the MIT license. See [LICENSE](https://github.com/j-a-m-l/ng-text-length/blob/master/LICENSE) for details.
