import { Backend } from '../../src/aurelia-i18n-loader';

export function bootstrapTestEnvironment(component, config) {
  component.bootstrap((aurelia) => {
    aurelia.use
      .standardConfiguration()
      .feature('src', (instance) => {
        let aliases = ['t', 'i18n'];

        // register backend plugin
        instance.i18next.use(Backend.with(aurelia.loader));


        return instance.setup(Object.assign({
          backend: {                                  // <-- configure backend settings
            loadPath: './locales/{{lng}}/{{ns}}.json' // <-- XHR settings for where to get the files from
          },
          interpolation: {
            prefix: '{{',
            suffix: '}}'
          },
          attributes: aliases,
          lng: 'en',
          defaultNS: 'translation',
          fallbackLng: 'en',
          debug: false
        }, config));
      });
  });
}
