<a name="2.3.0"></a>
# [2.3.0](https://github.com/aurelia/i18n/compare/2.2.0...2.3.0) (2018-06-21)


### Features

* **i18n:** allow multiple attributes with the same key by listing them comma-seperated ([666cfba](https://github.com/aurelia/i18n/commit/666cfba))



<a name="2.2.0"></a>
# [2.2.0](https://github.com/aurelia/i18n/compare/2.1.2...2.2.0) (2018-05-08)


### Bug Fixes

* **DI:** use static method for Element ([#266](https://github.com/aurelia/i18n/issues/266)) ([71099bc](https://github.com/aurelia/i18n/commit/71099bc))


### Features

* **relative-time:** months and years to Arabic translation ([0ae50d8](https://github.com/aurelia/i18n/commit/0ae50d8))
* **relative-time:** months and years to Japanese translation ([af2ecce](https://github.com/aurelia/i18n/commit/af2ecce)), closes [#261](https://github.com/aurelia/i18n/issues/261)
* **t-attribute:** fallback on missing key ([976157b](https://github.com/aurelia/i18n/commit/976157b))



<a name="2.1.2"></a>
## [2.1.2](https://github.com/aurelia/i18n/compare/2.1.1...2.1.2) (2018-02-24)


### Bug Fixes

* **i18n:** stop forcing lng option ([#259](https://github.com/aurelia/i18n/issues/259)) ([5692e30](https://github.com/aurelia/i18n/commit/5692e30))



<a name="2.1.1"></a>
## [2.1.1](https://github.com/aurelia/i18n/compare/2.1.0...2.1.1) (2018-01-25)


### Bug Fixes

* **t-attribute:** convert to string ([6d962d3](https://github.com/aurelia/i18n/commit/6d962d3))



<a name="2.1.0"></a>
# [2.1.0](https://github.com/aurelia/i18n/compare/2.0.0...2.1.0) (2017-11-15)


### Bug Fixes

* **PAL:** support for pal-nodejs ([66412a8](https://github.com/aurelia/i18n/commit/66412a8))
* **relative-time:** error on missing lng ([5deb4d2](https://github.com/aurelia/i18n/commit/5deb4d2))
* **relative-time:** fix japanese locale name ([42ec461](https://github.com/aurelia/i18n/commit/42ec461))
* **ts:** workaround for allowSyntheticDefaultImports ([ec6dbbe](https://github.com/aurelia/i18n/commit/ec6dbbe))


### Features

* **relative-time:** aurelia-relativetime-signal ([cce3b09](https://github.com/aurelia/i18n/commit/cce3b09))



<a name="2.0.0"></a>
# [2.0.0](https://github.com/aurelia/i18n/compare/1.6.2...v2.0.0) (2017-10-02)


### Bug Fixes

* **attribute:** check parent node on remove ([375a745](https://github.com/aurelia/i18n/commit/375a745))
* **relative-time:** updated translations for french locale ([fa922db](https://github.com/aurelia/i18n/commit/fa922db))


### Features

* **i18next:** update to v9.0.0 ([fa64f3e](https://github.com/aurelia/i18n/commit/fa64f3e))


### BREAKING CHANGES

* i18next: all tests passed, this might introduce some compatibility issues due to dropping support for i18next options of type v1. See details in i18next changelog

fixes https://github.com/aurelia/i18n/issues/199



<a name="1.6.2"></a>
## [1.6.2](https://github.com/aurelia/i18n/compare/1.6.1...v1.6.2) (2017-07-10)

### Bug Fixes

* Don't try to parse translation json if already parsed.

<a name="1.6.1"></a>
## [1.6.1](https://github.com/aurelia/i18n/compare/1.6.0...v1.6.1) (2017-05-31)


### Bug Fixes

* **t-attribute:** warning when using reserved word ([a5b833f](https://github.com/aurelia/i18n/commit/a5b833f)), closes [/github.com/aurelia/i18n/issues/218#issuecomment-304611266](https://github.com//github.com/aurelia/i18n/issues/218/issues/issuecomment-304611266)
* **uf:** properly escape dot in RegExp ([0ee7dbb](https://github.com/aurelia/i18n/commit/0ee7dbb))
* **uf():** remove all thousand separators ([5741270](https://github.com/aurelia/i18n/commit/5741270))
* **uf():** remove all thousand seperators ([40f549d](https://github.com/aurelia/i18n/commit/40f549d))



<a name="1.6.0"></a>
# [1.6.0](https://github.com/aurelia/i18n/compare/1.5.1...v1.6.0) (2017-04-27)


### Bug Fixes

* **df:** Number.isInteger helper ([8bb1a87](https://github.com/aurelia/i18n/commit/8bb1a87))



<a name="1.5.0"></a>
# [1.5.0](https://github.com/aurelia/i18n/compare/1.4.0...v1.5.0) (2017-04-10)


### Bug Fixes

* **rt:** default interpolation as fallback ([9407c58](https://github.com/aurelia/i18n/commit/9407c58))


### Features

* **relative-time:** relative time bindingbehavior ([fdddded](https://github.com/aurelia/i18n/commit/fdddded))



<a name="1.4.0"></a>
# [1.4.0](https://github.com/aurelia/i18n/compare/1.3.2...v1.4.0) (2017-03-25)


### Bug Fixes

* **t:** expose configuration of aliases ([0e928ea](https://github.com/aurelia/i18n/commit/0e928ea))



<a name="1.3.1"></a>
## [1.3.1](https://github.com/aurelia/i18n/compare/1.3.0...v1.3.1) (2017-02-27)

* Documentation update.

<a name="1.3.0"></a>
# [1.3.0](https://github.com/aurelia/i18n/compare/1.2.3...v1.3.0) (2017-01-07)


### Bug Fixes

* **attr:** fix camel-casing attributes ([8a458a8](https://github.com/aurelia/i18n/commit/8a458a8))
* **attribute:** bindable attribute check ([2c45b08](https://github.com/aurelia/i18n/commit/2c45b08))


### Features

* **aurelia-i18n-loader:** Added backend for i18next to use aurelia's loader ([eb5909a](https://github.com/aurelia/i18n/commit/eb5909a))
* **aurelia-i18n-loader:** Added backend for i18next to use aurelia's loader ([f4d3166](https://github.com/aurelia/i18n/commit/f4d3166))



<a name="1.2.1"></a>
## [1.2.1](https://github.com/aurelia/i18n/compare/1.2.0...v1.2.1) (2016-11-08)


### Bug Fixes

* **attribute:** fix support for dashed bindables ([e70372c](https://github.com/aurelia/i18n/commit/e70372c))
* **debug:** remove debugger statement ([1d5f312](https://github.com/aurelia/i18n/commit/1d5f312))



<a name="1.2.0"></a>
# [1.2.0](https://github.com/aurelia/i18n/compare/1.1.2...v1.2.0) (2016-10-21)


### Bug Fixes

* **attribute:** TAttribute related fixes ([d2f8d72](https://github.com/aurelia/i18n/commit/d2f8d72))
* **doc:** inject `RelativeTime` ([8cb0bff](https://github.com/aurelia/i18n/commit/8cb0bff))
* **rt:** corrected French translations for relative time ([b3142dc](https://github.com/aurelia/i18n/commit/b3142dc))


### Features

* **df:** add support for ISO8601 strings ([e4771df](https://github.com/aurelia/i18n/commit/e4771df))
* **rt:** add support for rt value converter to accept ISO8601 strings and empty values ([58e0b30](https://github.com/aurelia/i18n/commit/58e0b30))



<a name="1.1.2"></a>
## [1.1.2](https://github.com/aurelia/i18n/compare/1.1.1...v1.1.2) (2016-09-05)


### Bug Fixes

* **ts:** fix wrong type information ([c86cd3f](https://github.com/aurelia/i18n/commit/c86cd3f)), closes [/github.com/aurelia/i18n/issues/136#issuecomment-243419568](https://github.com//github.com/aurelia/i18n/issues/136/issues/issuecomment-243419568)



<a name="1.1.1"></a>
## [1.1.1](https://github.com/aurelia/i18n/compare/1.1.0...v1.1.1) (2016-08-24)


### Bug Fixes

* **attribute:** check for undefined controller ([8c6e6bc](https://github.com/aurelia/i18n/commit/8c6e6bc))



<a name="1.1.0"></a>
# [1.1.0](https://github.com/aurelia/i18n/compare/1.0.0...v1.1.0) (2016-08-22)


### Bug Fixes

* **eslint:** fix linting issues ([0ddf93d](https://github.com/aurelia/i18n/commit/0ddf93d))
* **ts:** declare missing props ([c8102c8](https://github.com/aurelia/i18n/commit/c8102c8))


### Features

* **i18n:** add dependency injection ([0545999](https://github.com/aurelia/i18n/commit/0545999))
* **TCustomAttribute:** support custom-elements ([06373f0](https://github.com/aurelia/i18n/commit/06373f0))



<a name="1.0.0"></a>
# [1.0.0](https://github.com/aurelia/i18n/compare/1.0.0-rc.1.0.0...v1.0.0) (2016-07-27)


### Bug Fixes

* **binding:** sourceExpression only once ([5963396](https://github.com/aurelia/i18n/commit/5963396))
* **i18n:** make sure translations parameters are always applied ([3060e7a](https://github.com/aurelia/i18n/commit/3060e7a)), closes [#116](https://github.com/aurelia/i18n/issues/116)
* **i18n.update-translations.spec.js:** set locale before testing to be sure 1st translation is applied ([0496b41](https://github.com/aurelia/i18n/commit/0496b41))
* **logger:** use LogManager instead console ([b6ffedb](https://github.com/aurelia/i18n/commit/b6ffedb))
* **logging:** use aurelia-logging ([d2552e7](https://github.com/aurelia/i18n/commit/d2552e7))
* **nf-vc:** changed signature of NfValueConverter ([168f556](https://github.com/aurelia/i18n/commit/168f556))
* **relativeTime:** fix fallbackLng reading ([ffb0dcb](https://github.com/aurelia/i18n/commit/ffb0dcb))
* **updateTranslation:** check elem param ([e8373a8](https://github.com/aurelia/i18n/commit/e8373a8))



<a name="1.0.0-rc.1.0.0"></a>
# [1.0.0-rc.1.0.0](https://github.com/aurelia/i18n/compare/1.0.0-beta.1.0.4...v1.0.0-rc.1.0.0) (2016-06-22)



### 0.5.2 (2016-04-13)


#### Features

* **relative time:** Use the fallback language if needed ([10ef19c0](http://github.com/aurelia/i18n/commit/10ef19c082bd2c4311e254e67d7a3422dee0efb2))
* **translation:**
  * Add italian translation ([d610aeb9](http://github.com/aurelia/i18n/commit/d610aeb9da8b12cc82a53108a736697cf4d50760))
  * Add italian translation ([0d8e65b1](http://github.com/aurelia/i18n/commit/0d8e65b108bce4d75c3cbc0ecdafedf8b39cbab6))


### 0.5.1 (2016-04-06)


#### Bug Fixes

* **i18n:** use a promise to wait for i18next to be ready before updating value ([2b69cfeb](http://github.com/aurelia/i18n/commit/2b69cfeb09e017209b3510daccd68c7e91dcb7f5))
* **relativeTime:** prevent relativeTime to add resources to soon ([21a37e62](http://github.com/aurelia/i18n/commit/21a37e62814280601a5fc6e0a23ae3764a126cf6))


### 0.5.0 (2016-03-25)


#### Bug Fixes

* **deps:**
  * added missing pal dependency ([451e7a1a](http://github.com/aurelia/i18n/commit/451e7a1add18adca536091f7ca2d882465318730))
  * proper dependency order ([a7ea034e](http://github.com/aurelia/i18n/commit/a7ea034e62cb2f0ef8be8411ab8f68dd5f8cb2fe))
* **installs:** prepare package.json and config.js ([a5d89539](http://github.com/aurelia/i18n/commit/a5d89539dd964f86baa2a6c3a94d9911e245e04e))
* **polyfills:** added aurelia-polyfills ([a7656aec](http://github.com/aurelia/i18n/commit/a7656aec2d3e6b950b86ee49470ba7253da92ed2))


#### Features

* **i18next:** update to i18next v2 ([b5ca8caa](http://github.com/aurelia/i18n/commit/b5ca8caab5d7bdd3639bf75adb1bc748be3b8683))


### 0.4.13 (2016-03-03)


#### Bug Fixes

* **normalize:** fix normalized name of intl ([f8701c55](http://github.com/aurelia/i18n/commit/f8701c5543a774950fb1b98e9022b0542f8dee8e))
* **versions:** update dependencies ([67e7f9dc](http://github.com/aurelia/i18n/commit/67e7f9dc82818f90507de7ad3f6cedbeaac80eb5))


### 0.4.12 (2016-03-02)


#### Bug Fixes

* **for-of:** remove for of loop ([9c6c1417](http://github.com/aurelia/i18n/commit/9c6c14173e6236c100020d1e2bce4ff63ec94881))


### 0.4.11 (2016-02-25)


### 0.4.10 (2016-02-09)


#### Bug Fixes

* **deps:** fixes intl dependency ([4e62d3cf](http://github.com/aurelia/i18n/commit/4e62d3cf227bf3d1555582b9ac66e5178aa69262))


### 0.4.9 (2016-02-08)


#### Bug Fixes

* **Intl.js:** update intl.js ([79d26ee7](http://github.com/aurelia/i18n/commit/79d26ee742479474a3a321c639328997e31ffbc3))


### 0.4.7 (2016-01-29)


#### Bug Fixes

* **attribute:** removed timeout usage ([019fd7bd](http://github.com/aurelia/i18n/commit/019fd7bd6b21f917f8e59b2adda81e5c5784d1e0))
* **i18next:** missing default export ([3aafbded](http://github.com/aurelia/i18n/commit/3aafbdeda6c1653efe7aa4db3dcebd74df2ededa))


#### Features

* **all:** update jspm meta; core-js; aurelia deps ([8360ceaf](http://github.com/aurelia/i18n/commit/8360ceaf4426efde40bfa9222663c0c21d6d2dcc))
* **unformat:** unformat numbers using locale ([1da0817c](http://github.com/aurelia/i18n/commit/1da0817c4588059d67ef93d1606235f637f30d95))


### 0.4.6 (2016-01-09)


#### Bug Fixes

* **normalize:** replace normalizeSync with normalize ([466e6ae5](http://github.com/aurelia/i18n/commit/466e6ae5ce974f023f94a43dacd89c999e9b0959))
* **params:** add missing htmlParamsResource ([cfb058f5](http://github.com/aurelia/i18n/commit/cfb058f5627cb25e31eed760d1b9503ab8648bfb))


## 0.4.5 (2016-01-08)


#### Bug Fixes

* **i18n:** marked optional arguments ([cc9b48b4](http://github.com/aurelia/i18n/commit/cc9b48b4c81fa4300ba130d800f8bf03b0483624))
* **unbind:** Clear timers and dispose subscription only if really subscribed ([ee497706](http://github.com/aurelia/i18n/commit/ee497706ad247b7ea8a74382737c4308b024d1c1))


#### Features

* **signaling:** add alias for t-params ([3fd242f2](http://github.com/aurelia/i18n/commit/3fd242f24eb320b2dad9b4ad22048f778635ef66))


### 0.4.4 (2015-12-16)


#### Bug Fixes

* **all:** add missing dependencies ([73370c8f](http://github.com/aurelia/i18n/commit/73370c8fb75cf1e024fd6c22c616752c1b4a11a3))
* **lint:** fixes linter issues and adds build ([1f60c4f5](http://github.com/aurelia/i18n/commit/1f60c4f522bc4b22225d1b7a4d52ad7028e2873e))
* **tr:** fixes object flattening ([2fba7fbb](http://github.com/aurelia/i18n/commit/2fba7fbb589b4b2e6cfe1216ebc57b6e4eb3cbdf))


#### Features

* **signaling:** provides TBindingBehavior ([d9877eea](http://github.com/aurelia/i18n/commit/d9877eea7f5de73e75f5fa00a6c39a8613ce40ab))


### 0.4.3 (2015-12-09)


#### Bug Fixes

* **Intl:** fix Intl.js polyfill loading ([de20e1b1](http://github.com/aurelia/i18n/commit/de20e1b11846ef79dbc02de0eb0f068c57ae4906))
* **all:**
  * add missing dependencies ([73370c8f](http://github.com/aurelia/i18n/commit/73370c8fb75cf1e024fd6c22c616752c1b4a11a3))
  * update to latest templating engine and DI ([a49941af](http://github.com/aurelia/i18n/commit/a49941af8eef97998f5d1a1299ba6880ad7af85d))
* **attribute:**
  * t attribute update on locale change ([ecdfeb28](http://github.com/aurelia/i18n/commit/ecdfeb281032ce35fc35e981314b2c13e1a9b84b))
  * fix null check ([f14e4cc0](http://github.com/aurelia/i18n/commit/f14e4cc03eb5e3683659f7fca94d9200c70a5a8b))
* **attributes:**
  * register default i18n attributes ([bab353cc](http://github.com/aurelia/i18n/commit/bab353cc34851a5e148c3815eddc34e4a9ffda80))
  * register default i18n attributes ([8dcb9785](http://github.com/aurelia/i18n/commit/8dcb97852129a7e8111d3844d4bf41b5ca020769))
  * allow omitting attributes in options ([1febda9e](http://github.com/aurelia/i18n/commit/1febda9e3dc13dcd3e36c9de7d2204e8e122a551))
* **build:** removes babel runtime ([10566453](http://github.com/aurelia/i18n/commit/1056645358a03acc4ce3b0990996bf41c439794d))
* **eslint:** comply with linting rules ([528ec668](http://github.com/aurelia/i18n/commit/528ec66897289824f1008b0fdc9c2fbed1a4698a))
* **event-aggregator:** dispose ea subscriptions correctly ([c387adbf](http://github.com/aurelia/i18n/commit/c387adbf4d41957bb06f64104c1073bca4507c9a))
* **nf:** fixes nfvalueconverter with null||undefined options ([ff9ce638](http://github.com/aurelia/i18n/commit/ff9ce638d3d8f8888ca4ed6738664fa200ea8cbc))
* **resolver:** custom params resolver ([8c6a0b58](http://github.com/aurelia/i18n/commit/8c6a0b58b091346d87f97c326810eb1e19471dfd))
* **subscription:** fix subscription disposal ([b9896be4](http://github.com/aurelia/i18n/commit/b9896be48109a0af6d06ed4f5c6e31f337f596b6))
* **tests:** fix unit tests ([203a3ce6](http://github.com/aurelia/i18n/commit/203a3ce63db9f3c912b732d9473e17ce001e3726))
* **tr:** fixes object flattening ([2fba7fbb](http://github.com/aurelia/i18n/commit/2fba7fbb589b4b2e6cfe1216ebc57b6e4eb3cbdf))


#### Features

* **params:** params for attribute based translation ([138193aa](http://github.com/aurelia/i18n/commit/138193aab876d2bd89de06c971a213ea6dae8d6a))
* **signaling:** provides TBindingBehavior ([d9877eea](http://github.com/aurelia/i18n/commit/d9877eea7f5de73e75f5fa00a6c39a8613ce40ab))


### 0.4.1 (2015-11-16)


#### Bug Fixes

* **all:** update to latest templating engine and DI ([a49941af](http://github.com/aurelia/i18n/commit/a49941af8eef97998f5d1a1299ba6880ad7af85d))
* **attribute:**
  * t attribute update on locale change ([ecdfeb28](http://github.com/aurelia/i18n/commit/ecdfeb281032ce35fc35e981314b2c13e1a9b84b))
  * fix null check ([f14e4cc0](http://github.com/aurelia/i18n/commit/f14e4cc03eb5e3683659f7fca94d9200c70a5a8b))
* **attributes:**
  * register default i18n attributes ([bab353cc](http://github.com/aurelia/i18n/commit/bab353cc34851a5e148c3815eddc34e4a9ffda80))
  * register default i18n attributes ([8dcb9785](http://github.com/aurelia/i18n/commit/8dcb97852129a7e8111d3844d4bf41b5ca020769))
  * allow omitting attributes in options ([1febda9e](http://github.com/aurelia/i18n/commit/1febda9e3dc13dcd3e36c9de7d2204e8e122a551))
* **build:** removes babel runtime ([10566453](http://github.com/aurelia/i18n/commit/1056645358a03acc4ce3b0990996bf41c439794d))
* **eslint:** comply with linting rules ([528ec668](http://github.com/aurelia/i18n/commit/528ec66897289824f1008b0fdc9c2fbed1a4698a))
* **event-aggregator:** dispose ea subscriptions correctly ([c387adbf](http://github.com/aurelia/i18n/commit/c387adbf4d41957bb06f64104c1073bca4507c9a))
* **nf:** fixes nfvalueconverter with null||undefined options ([ff9ce638](http://github.com/aurelia/i18n/commit/ff9ce638d3d8f8888ca4ed6738664fa200ea8cbc))
* **resolver:** custom params resolver ([8c6a0b58](http://github.com/aurelia/i18n/commit/8c6a0b58b091346d87f97c326810eb1e19471dfd))
* **subscription:** fix subscription disposal ([b9896be4](http://github.com/aurelia/i18n/commit/b9896be48109a0af6d06ed4f5c6e31f337f596b6))
* **tests:** fix unit tests ([203a3ce6](http://github.com/aurelia/i18n/commit/203a3ce63db9f3c912b732d9473e17ce001e3726))


#### Features

* **params:** params for attribute based translation ([138193aa](http://github.com/aurelia/i18n/commit/138193aab876d2bd89de06c971a213ea6dae8d6a))


### 0.4.0 (2015-11-16)


## 0.3.0 (2015-11-10)


#### Bug Fixes

* **all:** update to latest templating engine and DI ([a49941af](http://github.com/aurelia/i18n/commit/a49941af8eef97998f5d1a1299ba6880ad7af85d))


### 0.2.6 (2015-10-15)


#### Bug Fixes

* **event-aggregator:** dispose ea subscriptions correctly ([c387adbf](http://github.com/aurelia/i18n/commit/c387adbf4d41957bb06f64104c1073bca4507c9a))
* **tests:** fix unit tests ([203a3ce6](http://github.com/aurelia/i18n/commit/203a3ce63db9f3c912b732d9473e17ce001e3726))


### 0.2.5 (2015-10-14)


### 0.1.1 (2015-09-08)


#### Bug Fixes

* **attribute:** fix null check ([f14e4cc0](http://github.com/aurelia/i18n/commit/f14e4cc03eb5e3683659f7fca94d9200c70a5a8b))


### 0.1.0 (2015-08-27)


#### Bug Fixes

* **attribute:** fix null check ([f14e4cc0](http://github.com/aurelia/i18n/commit/f14e4cc03eb5e3683659f7fca94d9200c70a5a8b))
