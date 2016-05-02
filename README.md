# aurelia-i18n

[![ZenHub](https://raw.githubusercontent.com/ZenHubIO/support/master/zenhub-badge.png)](https://zenhub.io)
[![Join the chat at https://gitter.im/aurelia/discuss](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/aurelia/discuss?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

This library is part of the [Aurelia](http://www.aurelia.io/) platform and contains a plugin that provides i18n support.
Under the hood it uses the [i18next](http://i18next.com/) library.

> To keep up to date on [Aurelia](http://www.aurelia.io/), please visit and subscribe to [the official blog](http://blog.durandal.io/). If you have questions, we invite you to [join us on Gitter](https://gitter.im/aurelia/discuss). If you would like to have deeper insight into our development process, please install the [ZenHub](https://zenhub.io) Chrome Extension and visit any of our repository's boards. You can get an overview of all Aurelia work by visiting [the framework board](https://github.com/aurelia/framework#boards).

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [How to install this plugin?](#how-to-install-this-plugin)
- [How to use this plugin](#how-to-use-this-plugin)
  - [Setting the active locale](#setting-the-active-locale)
  - [Getting the active locale](#getting-the-active-locale)
  - [Translating via code](#translating-via-code)
  - [Translating via html attributes](#translating-via-html-attributes)
    - [Specifying attributes](#specifying-attributes)
    - [Specifying multiple attributes](#specifying-multiple-attributes)
    - [Using nested and combined translations](#using-nested-and-combined-translations)
    - [Translating images](#translating-images)
    - [Passing parameters to the attribute](#passing-parameters-to-the-attribute)
  - [Translating with the TValueConverter](#translating-with-the-tvalueconverter)
  - [ValueConverter Examples](#valueconverter-examples)
  - [Translating with the TBindingBehavior](#translating-with-the-tbindingbehavior)
  - [Complex objects for variables](#complex-objects-for-variables)
  - [Formatting numbers via code](#formatting-numbers-via-code)
  - [Formatting numbers with NfValueConverter](#formatting-numbers-with-nfvalueconverter)
  - [ValueConverter Number Examples](#valueconverter-number-examples)
  - [Formatting dates via code](#formatting-dates-via-code)
  - [Formatting dates with DfValueConverter](#formatting-dates-with-dfvalueconverter)
  - [ValueConverter Date Examples](#valueconverter-date-examples)
  - [Rendering relative time](#rendering-relative-time)
  - [ValueConverter Relative Time Examples](#valueconverter-relative-time-examples)
- [Internationalization API Polyfill](#internationalization-api-polyfill)
- [Usage with webpack](#usage-with-webpack)
- [CLI Integration](#cli-integration)
- [Migration to new i18next version](#migration-to-new-i18next-version)
- [Polyfills](#polyfills)
- [Dependencies](#dependencies)
- [Used By](#used-by)
- [Platform Support](#platform-support)
- [Building The Code](#building-the-code)
- [Running The Tests](#running-the-tests)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## How to install this plugin?

1. In your project install the plugin via `jspm` with following command

    ```shell
    jspm install aurelia-i18n
    ```
2. Make sure you use [manual bootstrapping](http://aurelia.io/docs#startup-and-configuration). In order to do so open your `index.html` and locate the element with the attribute aurelia-app. Change it to look like this:

    ```html
    <body aurelia-app="main">
    ...
    ```
3. Create folder `locale` in your projects root
4. For each locale create a new folder with it's name (e.g. `en`, `de`, ...)
5. In those subfolders create a file named `translation.json` which contains your language specific translations. Below you can find a sample `en-EN` translation file. The full potential of i18next is achieved through a specific translation-file schema. Consult the [i18next docs](http://i18next.com/docs/) to find out more about it.

    ```javascript
    {
        "score": "Score: {{score}}",
        "lives": "{{count}} life remaining",
        "lives_plural": "{{count}} lives remaining",
        "lives_indefinite": "a life remaining",
        "lives_plural_indefinite": "some lives remaining",
        "friend": "A friend",
        "friend_male": "A boyfriend",
        "friend_female": "A girlfriend"
    }
    ```
6. NEW!: Install a backend plugin
From v.2 you have to pick your own backend service. For this guide we're going to leverage the [XHR Plugin](https://github.com/i18next/i18next-xhr-backend)
Install it in the root of your project via `jspm install npm:i18next-xhr-backend`.
7. Create (if you haven't already) a file `main.js` in your `src` folder with following content:

    ```javascript
    import {I18N} from 'aurelia-i18n';
    import Backend from 'i18next-xhr-backend'; // <-- your previously installed backend plugin 
    
    export function configure(aurelia) {
        aurelia.use
          .standardConfiguration()
          .developmentLogging()
          .plugin('aurelia-i18n', (instance) => {
            // register backend plugin
            instance.i18next.use(Backend);
            
            // adapt options to your needs (see http://i18next.com/docs/options/)
            // make sure to return the promise of the setup method, in order to guarantee proper loading
            return instance.setup({
              backend: {                                  // <-- configure backend settings
                loadPath: '/locales/{{lng}}/{{ns}}.json', // <-- XHR settings for where to get the files from
              },
              lng : 'de',
              attributes : ['t','i18n'],
              fallbackLng : 'en',
              debug : false
            });
          });
        
        aurelia.start().then(a => a.setRoot());
    }
    ```

    > You may also group your translations by namespaces, spread across multiple files. Say you have the standard translation.json
    and an additional `nav.json` for the navigation items, you can configure aurelia-i18n by passing the `ns` setting in the config object
    containing the different namespaces as well as the default namespace.

    ```javascript
    instance.setup({
      ...
      ns: { 
        namespaces: ['translation','nav'],
        defaultNs: 'translation'
      }
    });
    ```

8. If You use typescript

    Unfortunately creators of [i18next](http://i18next.com/) and [i18next-xhr-backend](https://github.com/i18next/i18next-xhr-backend) have not provided typings for these libraries for now. So, during typescript compilation process You will see next error messages:
    ``` javascript
    "/yourHost/pathToApp/pathToFile/filename.ts(3,26): Cannot find module 'i18next-xhr-backend'."
    "/yourHost/pathToApp/jspm_packages/npm/aurelia-i18n@0.5.2/aurelia-i18n.d.ts(2,23): Cannot find module 'i18next'."
    ```

    First of all You need to get `*.d.ts` files:
    
    1. **i18next**
    
        - If You use [typings](https://github.com/typings/typings) (it is most likely true) you can istall typings for [i18next](http://i18next.com/) with next command in console: 
            ``` javascript
            typings install i18next --ambient
            ```
        - on other hand You can use similar file from this repository (`doc/i18next.d.ts`)
        
    2. **i18next-xhr-backend**
        - use typings file from this repository `doc/i18next-xhr-backend.d.ts`
    > in order to comply with some neat project structure You would copy `*.d.ts` files from `doc/*.d.ts` to some other folder, e.g. `/customTypings`
    
    The next step - to give the compiler know about your  `*.d.ts` files. Add the following section to your `tsconfig.json` file.
    ```javascript
    //...some configuration code
    "filesGlob": [
        "./typings/browser.d.ts", //this must be specified in case if You use typings(https://github.com/typings/typings)
        "./your_custom_typings_folder_path/**/*.d.ts", //if You use two typings file from this repositorie (`doc/*.d.ts`)
      ],
    //...some configuration code
    ```

## How to use this plugin
i18next translations work by setting up an active locale, which you've setup above in the init phase with the property `lng`.

### Setting the active locale
In order to change the active language you'd have to call the function `setLocale(localeName)` via code.

```javascript
import {I18N} from 'aurelia-i18n';

export class MyDemoVM {
	static inject = [I18N];
	constructor(i18n) {
	  this.i18n = i18n;
		this.i18n
		    .setLocale('de-DE')
		    .then( () => {
			// locale is loaded
		});
	}
	...
}
```

### Getting the active locale
To get the active locale you'd go with `getLocale()`:

```javascript
import {I18N} from 'aurelia-i18n';

export class MyDemoVM {
	static inject = [I18N];
	constructor(i18n) {
	   this.i18n = i18n;
		 console.log(this.i18n.getLocale());
	}
	...
}
```

### Translating via code
Translating stuff via code works by using the method `tr`. You pass in the `key` as first parameter, followed by the optional second parameter `options` to specify in detail how the translations should be performed. Please consult the [i18next docs](http://i18next.com/translate/#overrideoptions) for a detailed list of those:

```javascript
import {I18N} from 'aurelia-i18n';

export class MyDemoVM {
	static inject = [I18N];
	constructor(i18n) {
	   this.i18n = i18n;
		 console.log(this.i18n.tr('mykey'));
	}
	...
}
```

### Translating via html attributes
Translation in html can be done alternatively using attributes. By default the plugin is configured to use the `t` and `i18n` attributes.
This can be configured during the plugin registration using the `attributes` property.

```javascript
...
instance.setup({
	...
	attributes : ['t','i18n'],
	...
});
...
```

Any element in your views that has one of those attributes, will be translated when the locale is changed.

```markup
<span t="title">Title</span>
```

The plugin will use the `title` as the key when translating that element.
Other attributes, specified in the `attributes` option, may be used as well.

```markup
<span i18n="home.title">Title</span>
```

Notice in the above example that the key was set to `home.title`. This will make the plugin look for a translation with nested objects in your translation json, ie:

```javascript
{
  "home": {
    "title": "Title",
  }
}
```

Use `updateTranslation()` to update all translations within the children of the element that is passed to it.
The following example shows how a view model can be configured to update it's contents when the view is attached and every time a locale is changed.

```javascript
import {I18N} from 'aurelia-i18n';
import {EventAggregator} from 'aurelia-event-aggregator';

export class MyDemoVM {
  static inject = [I18N,Element,EventAggregator];
  constructor(i18n,element,ea) {
    this.i18n = i18n;
    this.element = element;

	  ea.subscribe('i18n:locale:changed', payload => {
	    this.i18n.updateTranslations(this.element);
	  });
  }

  attached(){
    this.i18n.updateTranslations(this.element);
  }
}
```

Alternatively you may extend your VM with the provided Base-I18N-VM, which will set that up for you automatically.

```javascript
import {BaseI18N} from 'aurelia-i18n';

export class MyDemoVM extends BaseI18N {

}
```

> Just remember in case you define your own `constructor`, to call `this.super` and pass it the instances of its
dependencies as described in the previous example. Same applies to `attached`, although nothing needs to be passed
in here

#### Specifying attributes
By default the plugin will set the `textContent` property of an element.

```markup
//translation
{
  "title": "Title <b>bold</b>"
}

//markup
<span t="title">Title</span>
```

So in above example the html tags will be escaped and the output will be `&lt;b&gt;bold&lt;/b&gt;`.
To allow html-markup to be used, the `[html]` attribute needs to be added before the translation key.

```markup
<span t="[html]title">Title</span>
```
This will set the `innerHTML` of the element instead of the `textContent` property, so html-markup won't be escaped.
There are 4 special attributes including the shown `[html]`:

* `[text]`:  Sets the `textContent` property (default)
* `[html]`:  Sets the `innerHTML` property
* `[append]`:  appends the translation to the current content already present in the element (allows html).
* `[prepend]`: prepends the translation to the current content already present in the element (allows html).

Any other values will be used as actual attributes on the element.
The following example will not change the content of the element, but will set its `alt` attribute to the translated value of `title` when the locale changes.

```markup
<span t="[alt]title">Title</span>
```

#### Specifying multiple attributes

Multiple attributes can be specified by separating them with a semicolon.

```markup
<span t="[html]title;[class]title-class">Title</span>
```

When the locale changes it will set the `innerHTML` to the translated value of `title` due to the `[html]` attribute and the `class` property to the translated value of `title-class`.

#### Using nested and combined translations

In order to combine two or more translations, just include them with the `$t(yourkey)` markup

```markup
<span t="$t(title) $t(subtitle)">Title subtitle</span>
```

Nested keys may also be referenced and will be properly translated:

```javascript
{
  "translation": {
    "title": "Title",
    "nested_referencing": 'The $t(title) is the header',
    ...
  }
}
```

```markup
<span t="nested_referencing">Nested text</span>
```

#### Translating images

Images can be translated as well, for when a different image needs to be displayed in another language.

```markup
<img t="home.image" />
```

The plugin will automatically change the `src` attribute of the image when the locale changes.

You may specify a default value for images as well. In order to do so just define an attribute called `data-src` with the default value.

```markup
<img data-src="path/to/image.jpg" t="home.image" />
```
This will be picked up by the CLI when translations are extracted from the source files. (see the section on [CLI Integration](#cli-integration))

#### Passing parameters to the attribute
In order to use parameters for replaceable parts in your translation key, you can provide an additional `t-params` attribute and bind it to the object containing the replacement values.
Also note that for whatever attribute you registered, the corresponding \*-params attribute will get registered as well automatically.

```javascript
// Translation file
{
  "paramstest": "Some text with <strong>{{content}}</strong>"
}
```

```markup
<!-- View -->
<span t="[html]paramstest" t-params.bind="params"></span>
```

```javascript
// ViewModel
class MyVM {
  params = { content: 'ABC' }

  [...]
}
```

> The object passed to `t-params` is a complex object explained [in the next section](#complex-objects-for-variables)

### Translating with the TValueConverter
In order to do translations in a more declarative way from within your HTML markup you can use a custom ValueConverter named `t`. It takes exactly the same `options` as the code translation method `tr` but of course provides the key automatically.

You will find below a few examples of the available [i18next features](http://i18next.com/translate/)

```html
<template>
  <section>
    <div class="row">
      <div class="col-md-3">
        <h3>ValueConverter Examples</h3>
        <ul class="list-group">
          <li class="list-group-item">
            Translation with Variables: <br />
            ${ 'score' | t: {'score': userScore}}
          </li>

          <li class="list-group-item">
            Translation singular: <br />
            ${ 'lives' | t: { 'count': 1 } }
          </li>

          <li class="list-group-item">
            Translation plural: <br />
            ${ 'lives' | t: { 'count': 2 } }
          </li>

          <li class="list-group-item">
            Translation singular indefinite: <br />
            ${ 'lives' | t: { 'count': 1, indefinite_article: true  } }
          </li>

          <li class="list-group-item">
            Translation plural indefinite: <br />
            ${ 'lives' | t: { 'count': 2, indefinite_article: true } }
          </li>

          <li class="list-group-item">
            Translation without/with context: <br />
            ${ 'friend' | t } <br />
            ${ 'friend' | t: { context: 'male' } } <br />
            ${ 'friend' | t: { context: 'female' } }
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
```

### Translating with the TBindingBehavior
The TValueConverter is pretty useful if you prefer a declarative way to enhance DOM elements with i18n support. But it has a lack when it comes to automatically updating itself when changes happen outside, like locale switches. This is what the TBindingBehavior can do. Essentially you do the same thing like with the TValueConverter but use the `&` sign instead of `|` to indicate usage of the binding behavior.

```markup
<li class="list-group-item">
  Translation with Variables: <br />
  ${ 'score' & t: {'score': userScore}}
</li>
```

Now aurelia-i18n will automatically emit signals when internal changes happen and you can do so as well by emiting a `aurelia-translation-signal`. The following example depicts how this is done internally when the current locale changes. First you need to get hold of the `BindingSignaler` exported by the `aurelia-templating-resources` module and inject it either in your constructor or via the static `$inject` property. Next when you want to trigger the signal just use the signalers `signal` method and pass it the predefined string. 

```javascript
import {BindingSignaler} from 'aurelia-templating-resources';
// inject signaler to constructor ...
...

setLocale(locale) {
  return new Promise( resolve => {
    let oldLocale = this.getLocale();
    this.i18next.setLng(locale, tr => {
      this.ea.publish('i18n:locale:changed', { oldValue: oldLocale, newValue: locale });
      this.signaler.signal('aurelia-translation-signal');
      resolve(tr);
    });
  });
}
```

### Complex objects for variables
In some cases it might be useful to define variables via complex objects. Let's take a look at below example. It shows a validation message to hint the user that a given field should be in range of min and max.
Now we could easily pass min and max as separate variables but on the other hand that involves more work you'd have to do manually if the source is a object.

```javascript
var resources = {
  en: {
    translation: {
      "complex": '{{field}} should be between {{threshold.min}} and {{threshold.max}}'
    }
  }
};
```

So in order to avoid that you may simply pass in the object as a whole and the library will pickup all the necessary information and create the proper options object.
You can also mix and match it with simple variables.

```javascript
var options = {
  'threshold': {
    'min': 1,
    'max': 10
  },
  'field': 'Age'
};

i18n.tr('complex', options);
// --> Age should be between 1 and 10
```




### Formatting numbers via code
For displaying numbers in different formats, this plugin makes use of the [Internationalization API NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat). It leverages the same locales used for the translation methods mentioned in the install process of the plugin.

The API provides access to the `Intl NumberFormat` with the method `NumberFormat`. This function takes the an options object representing the formatting options as the first and the locale as the second parameter.

Below is an example how to access the NumberFormat via code:

```javascript
import {I18N} from 'aurelia-i18n';

export class MyDemoVM {
  static inject = [I18N];
	constructor(i18n) {
	  this.i18n = i18n;

	  // create a NumberFormat with German locale
    var nf = this.i18n.nf(undefined, 'de');
	  var result = nf.format(123456.123);

	  console.log(result);
	  // output => 123.456,123


	  // create a NumberFormat with currency options
	  var nf = this.i18n.NumberFormat({ style: 'currency', currency: 'EUR' }, 'de');

	  var result = nf.format(123456.123);

	  console.log(result);
	  // output => 123.456,123 �  	  
	}
	...
}
```


### Formatting numbers with NfValueConverter
A more declarative way is to use the `nf` ValueConverter from within your HTML markup. It essentially works the same way as the code version. Take a look at the following example:

```html
<div class="col-md-3">
  <h3>ValueConverter Number Examples</h3>
  <ul class="list-group">
    <li class="list-group-item">
      Numberformat with default locale/format:
      ${ 1234567.890 | nf : undefined : selectedLocale}
    </li>
    <li class="list-group-item">
      Numberformat with different locale default format:
      ${ 1234567.890 | nf : undefined : 'de'}
    </li>
    <li class="list-group-item">
      Numberformat with different locale/format:
      ${ 1234567.890 | nf : { style: 'currency', currency: 'EUR' } : 'de'}
    </li>
  </ul>
</div>
```

> Note that if you provide the active locale as a bound VM property, the ValueConverter will be re-evaluated as soon as the property value changes, resulting in automatic re-formatting of your number.


### Formatting dates via code

The Intl. API provides means to [format DateTimes](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat) as well. Use the method `df` to access that feature with the same arguments used for NumberFormat
Below you'll find an example how to use those via code:

```javascript
import {I18N} from 'aurelia-i18n';

export class MyDemoVM {
  static inject = [I18N];
	constructor(i18n) {
	  this.i18n = i18n;

	  // create a DateTimeFormat with German locale
    var df = this.i18n.df(undefined, 'de');
	  var result = df.format(new Date(2000, 0, 1, 0,0,1))

	  console.log(result);
	  // output => 1.1.2000


	  // create a DateTime with time and 2-digit display
	  var options = {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false
    };
	  var df = this.i18n.df(options, 'de');

	  var result = df.format(new Date(2000, 0, 1, 0,0,1));

	  console.log(result);
	  // output => 01.01.2000 00:00:01  	  
	}
	...
}
```

> Remember that if you pass in `undefined` for the options parameter you'll get the default formatting options

### Formatting dates with DfValueConverter
A more declarative way is to use the `df` ValueConverter from within your HTML markup. It essentially works the same way as the code version. Take a look at the following example, which defines a VM property myDate:


```html
<div class="col-md-3">
  <h3>ValueConverter Date Examples</h3>
  <ul class="list-group">
    <li class="list-group-item">
      DateFormat with default locale/format:
      ${ myDate | df : undefined : selectedLocale}
    </li>
    <li class="list-group-item">
      DateFormat with different locale default format:
      ${ myDate | df : undefined : 'de'}
    </li>
    <li class="list-group-item">
      DateFormat with different locale/format:
      ${ myDate | df : { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' } : 'de'}
    </li>
  </ul>
</div>
```

### Rendering relative time
In order to create a representation of relative time like `x days ago` or `in x days` you can leverage the Service relativeTime. This exposes a method `getRelativeTime` which accepts a valid JS date.
To use it via code get hold of the service via injection and call the method as needed:

```javascript
import {RelativeTime} from 'aurelia-i18n';

export class MyDemoVM {
  static inject = [I18N];
	constructor(relativeTime) {
	  this.rt = relativeTime;

	  var myDate = new Date();
    myDate.setHours(myDate.getHours() - 2);

	  console.log(result);
	  // output => 2 hours ago  	  
	}
	...
}
```

This is also tied in to the currentLocale of the library so changing that one will also translate relative time messages. Take a look at the file `src/defaultTranslations/relative.time.js` for available
translations. If you're missing yours I welcome you to provide a PR so everybody can benefit from it.

A more declarative approach is to use the RtValueConverter directly in your HTML markup. It's not taking any additional parameters so just drop it in and you're good to go:

```html
<div class="col-md-3">
  <h3>ValueConverter Relative Time Examples</h3>
  <ul class="list-group">
    <li class="list-group-item">
      2 hours ago:
      ${ myDate | rt }
    </li>
  </ul>
</div>
```

## Internationalization API Polyfill

The plugin leverages the JavaScript Internationalization API to perform certain tasks. Since not all browsers do fully support it ([compatibility table](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Intl#Browser_compatibility)) the aurelia-i18n conditionally loads the Polyfill if needed.

In case of bundling your app you should thus keep in mind that it will not be automatically included into the bundle. That means you have to manually adjust the bundle config to include the polyfill as well, if you intend to have your application run on browsers without full support. [related GitHub issue](https://github.com/aurelia/i18n/issues/61#issuecomment-178801842)

## Usage with webpack

This library has more than one file that needs to be resolved. But by default, only the main file is loaded. Which means that you will get a error like:

```
.*$:106 Uncaught (in promise) Error: Cannot find module './aurelia-i18n/t'.
.*$:106 Uncaught (in promise) Error: Cannot find module './aurelia-i18n/nf'.
.*$:106 Uncaught (in promise) Error: Cannot find module './aurelia-i18n/df'.
Uncaught (in promise) Error: Cannot find module './aurelia-i18n/rt'.
```

To correct this, you must, as described in the [aurelia-webpack-plugin documentation](https://github.com/aurelia/webpack-plugin/#configuration-options), use the `includeSubModules` option in the configuration of the `AureliaWebpackPlugin`:

```javascript
new AureliaWebpackPlugin({
  includeSubModules: [
    { moduleId: "aurelia-i18n" }
  ]
})
```

On top of that if you need the Intl polyfill included you have to manualy require and bundle it. To do so add the following import statement at the begin of your `main.js/ts` file:

```javascript
//main.js
import 'intl';
```

For additional information about Intl.js and Webpack please take a look at this [official repos information](https://github.com/andyearnshaw/Intl.js#intljs-and-browserifywebpack)

## CLI Integration

There will be a command line tool that can create `translation.json` files for you by extracting the values from the html and javascript files.
(coming soon)

## Migration to new i18next version
* Default interpolation is `{{` and `}}` instead of `__`
* API Changes: Keep those in mind if you accessed the original i18next object and performed custom actions
  the existing aurelia-i18n methods have been updated to use the new API
* Options removed/changed: `{ sendMissing, getAsync, resStore => resources }`
* plural_not_found won't be thrown but the given key if no plural is defined
* indefinite plural was removed in v2 (`I have 1 apple` -> `I have one apple`)
* No default backend

The new version requires the user to define its own backend service. This was done in order to keep the core clean and easily upgradable.
So from now on users of aurelia-i18n also need to setup their own backend service. In order to do so we can leverage a i18next plugin from [this list](http://i18next.com/docs/ecosystem/#backends)-
Take a look at the updated [How to install this plugin?](#how-to-install-this-plugin) section.

## Polyfills

* andyearnshaw/Intl.js

## Dependencies

* [i18next](https://github.com/i18next/i18next)
* aurelia-binding
* aurelia-dependency-injection
* aurelia-event-aggregator
* aurelia-loader
* aurelia-templating
* aurelia-templating-resources

## Used By

This library is used directly by applications only.

## Platform Support

This library can be used in the **browser** only.

## Building The Code

To build the code, follow these steps.

1. Ensure that [NodeJS](http://nodejs.org/) is installed. This provides the platform on which the build tooling runs.
2. From the project folder, execute the following command:

  ```shell
  npm install
  ```
3. Ensure that [Gulp](http://gulpjs.com/) is installed. If you need to install it, use the following command:

  ```shell
  npm install -g gulp
  ```
4. To build the code, you can now run:

  ```shell
  gulp build
  ```
5. You will find the compiled code in the `dist` folder, available in three module formats: AMD, CommonJS and ES6.

6. See `gulpfile.js` for other tasks related to generating the docs and linting.

## Running The Tests

To run the unit tests, first ensure that you have followed the steps above in order to install all dependencies and successfully build the library. Once you have done that, proceed with these additional steps:

1. Ensure that the [Karma](http://karma-runner.github.io/) CLI is installed. If you need to install it, use the following command:

  ```shell
  npm install -g karma-cli
  ```
2. Ensure that [jspm](http://jspm.io/) is installed. If you need to install it, use the following commnand:

  ```shell
  npm install -g jspm
  ```
3. Install the client-side dependencies with jspm:

  ```shell
  jspm install
  ```

4. You can now run the tests with this command:

  ```shell
  karma start
  ```
