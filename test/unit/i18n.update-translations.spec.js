import {I18N} from '../../src/i18n';
import {BindingSignaler} from 'aurelia-templating-resources';
import {EventAggregator} from 'aurelia-event-aggregator';

describe('testing i18n translation update', () => {
  let sut;
  let resources;
  let template;
  let ea;

  beforeEach((done) => {
    System.config({
      'paths': {
        'fixture:*': 'test/unit/fixtures/*.js'
      }
    });

    resources = {
      en: {
        translation: {
          'title': 'Title',
          'description': 'Description',
          'description2': 'Description <b>with some bold</b>',
          'nested_referencing': 'The $t(title) is the header',
          'description-class': 'red',
          'testimage': 'testimage-english.jpg'
        }
      },
      de: {
        translation: {
          'title': 'Titel',
          'description': 'Beschreibung',
          'description2': 'Beschreibung <b>mit Fettdruck</b>',
          'nested_referencing': 'Der $t(title) ist der Kopf',
          'description-class': 'blue',
          'testimage': 'testimage-german.jpg'
        }
      }
    };

    ea  = new EventAggregator();
    sut = new I18N(ea, new BindingSignaler());
    sut.setup({
      resources: resources,
      lng: 'en',
      attributes: ['t', 'data-i18n'],
      fallbackLng: 'en',
      debug: false
    });

    //load the the html fixture
    System.import('fixture:template.html!text').then((result) => {
      template           = document.createElement('div');
      template.innerHTML = result;
      if (template.firstChild instanceof HTMLTemplateElement) template.innerHTML = template.firstChild.innerHTML;
      document.body.appendChild(template);
      done();
    });

    //update the translations in the template when the locale changes
    ea.subscribe('i18n:locale:changed', payload => {
      sut.updateTranslations(template);
    });
  });


  it('should not update translations if no attributes defined in options', (done) => {
    ea  = new EventAggregator();
    sut = new I18N(ea, new BindingSignaler());
    sut.setup({
      resStore: resources,
      lng: 'en',
      getAsync: false,
      sendMissing: false,
      fallbackLng: 'en',
      debug: false
    });

    //load the the html fixture
    System.import('fixture:template.html!text').then((result) => {
      template           = document.createElement('div');
      template.innerHTML = result;
      if (template.firstChild instanceof HTMLTemplateElement) template.innerHTML = template.firstChild.innerHTML;
      document.body.appendChild(template);
      done();
    });

    expect(template.querySelector('#test1').innerHTML.trim()).toBe('Title');
    expect(template.querySelector('#test2').innerHTML.trim()).toBe('Description');
    sut.setLocale('de');
    expect(template.querySelector('#test1').innerHTML.trim()).toBe('Title');
    expect(template.querySelector('#test2').innerHTML.trim()).toBe('Description');
  });

  it('should translate contents of elements with a translation attribute', () => {
    expect(template.querySelector('#test1').innerHTML.trim()).toBe('Title');
    expect(template.querySelector('#test2').innerHTML.trim()).toBe('Description');
    sut.setLocale('de');
    expect(template.querySelector('#test1').innerHTML.trim()).toBe('Titel');
    expect(template.querySelector('#test2').innerHTML.trim()).toBe('Beschreibung');
  });

  it('should translate nested keys', () => {
    expect(template.querySelector('#test-nested').innerHTML.trim()).toBe('Description Title');
    sut.setLocale('de');
    expect(template.querySelector('#test-nested').innerHTML.trim()).toBe('Der Titel ist der Kopf');
  });

  it('should work with all attributes specified in the options', () => {
    let el = template.querySelector('#test-other-attr');
    expect(el.innerHTML.trim()).toBe('Description');
    sut.setLocale('de');
    expect(el.innerHTML.trim()).toBe('Beschreibung');
  });

  it('should set the textContent when using the [text] attribute', () => {
    let el = template.querySelector('#test-text');
    expect(el.innerHTML.trim()).toBe('Description');
    sut.setLocale('de');
    expect(el.innerHTML.trim()).toBe('Beschreibung');
  });

  it('should escape html tags by default or when using [text]', () => {
    let el = template.querySelector('#test-text-with-tags');
    expect(el.innerHTML.trim()).toBe('Description <b>with some bold</b>');
    sut.setLocale('de');
    expect(el.innerHTML.trim()).toBe('Beschreibung &lt;b&gt;mit Fettdruck&lt;/b&gt;');
  });

  it('should allow tags when using the [html] attribute', () => {
    let el = template.querySelector('#test-html');
    expect(el.innerHTML.trim()).toBe('Description <b>with some bold</b>');
    sut.setLocale('de');
    expect(el.innerHTML.trim()).toBe('Beschreibung <b>mit Fettdruck</b>');
  });

  it('should prepend the translation when using the [prepend] attribute, and it allows html', () => {
    let el = template.querySelector('#test-prepend');
    expect(el.innerHTML.trim()).toBe('content');
    sut.setLocale('de');
    expect(el.innerHTML.trim()).toBe('Beschreibung <b>mit Fettdruck</b>content');
    sut.setLocale('en');
    expect(el.innerHTML.trim()).toBe('Description <b>with some bold</b>content');
  });

  it('should append the translation when using the [append] attribute, and it allows html', () => {
    let el = template.querySelector('#test-append');
    expect(el.innerHTML.trim()).toBe('content');
    sut.setLocale('de');
    expect(el.innerHTML.trim()).toBe('contentBeschreibung <b>mit Fettdruck</b>');
    sut.setLocale('en');
    expect(el.innerHTML.trim()).toBe('contentDescription <b>with some bold</b>');
  });

  it('should set multiple keys when separated with a semicolon', () => {
    let el = template.querySelector('#test-multiple');
    expect(el.innerHTML.trim()).toBe('Description <b>with some bold</b>');
    expect(el.className).toBe('');
    sut.setLocale('de');
    expect(el.innerHTML.trim()).toBe('Beschreibung <b>mit Fettdruck</b>');
    expect(el.className).toBe('blue');
    sut.setLocale('en');
    expect(el.innerHTML.trim()).toBe('Description <b>with some bold</b>');
    expect(el.className).toBe('red');
  });

  it('should set the src attribute for images', () => {
    let el = template.querySelector('#test-img');
    expect(el.getAttribute('src')).toBeNull();
    sut.setLocale('de');
    expect(el.getAttribute('src')).toBe('testimage-german.jpg');
    sut.setLocale('en');
    expect(el.getAttribute('src')).toBe('testimage-english.jpg');
  });

});
