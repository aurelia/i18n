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
