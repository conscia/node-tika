/*jshint node:true*/
/*global test, suite, setup, teardown*/

'use strict';

const assert = require('assert');
const tika = require('../');

suite('document tests', () => {
  test('detect txt content-type', done => {
    tika.type('test/data/file.txt', (err, contentType) => {
      assert.ifError(err);
      assert.equal(typeof contentType, 'string');
      assert.equal(contentType, 'text/plain');
      done();
    });
  });

  test('detect txt content-type and charset', done => {
    tika.typeAndCharset('test/data/file.txt', (err, contentType) => {
      assert.ifError(err);
      assert.equal(typeof contentType, 'string');
      assert.equal(contentType, 'text/plain; charset=ISO-8859-1');
      done();
    });
  });

  test('extract from txt', done => {
    tika.text('test/data/file.txt', (err, text) => {
      assert.ifError(err);
      assert.equal(typeof text, 'string');
      assert.equal(text, 'Just some text.\n\n');
      done();
    });
  });

  test('extract meta from txt', done => {
    tika.meta('test/data/file.txt', (err, meta) => {
      assert.ifError(err);
      assert.ok(meta);
      assert.equal(typeof meta.resourceName[0], 'string');
      assert.deepEqual(meta.resourceName, ['file.txt']);
      assert.deepEqual(meta['Content-Type'], ['text/plain; charset=ISO-8859-1']);
      assert.deepEqual(meta['Content-Encoding'], ['ISO-8859-1']);
      done();
    });
  });

  test('extract meta and text from txt', done => {
    tika.extract('test/data/file.txt', (err, text, meta) => {
      assert.ifError(err);
      assert.equal(typeof text, 'string');
      assert.equal(text, 'Just some text.\n\n');
      assert.ok(meta);
      assert.equal(typeof meta.resourceName[0], 'string');
      assert.deepEqual(meta.resourceName, ['file.txt']);
      assert.deepEqual(meta['Content-Type'], ['text/plain; charset=ISO-8859-1']);
      assert.deepEqual(meta['Content-Encoding'], ['ISO-8859-1']);
      done();
    });
  });

  test('extract from extensionless txt', done => {
    tika.text('test/data/extensionless/txt', (err, text) => {
      assert.ifError(err);
      assert.equal(text, 'Just some text.\n\n');
      done();
    });
  });

  test('extract from doc', done => {
    tika.text('test/data/file.doc', (err, text) => {
      assert.ifError(err);
      assert.equal(text, 'Just some text.\n');
      done();
    });
  });

  test('extract meta from doc', done => {
    tika.meta('test/data/file.doc', (err, meta) => {
      assert.ifError(err);
      assert.ok(meta);
      assert.deepEqual(meta.resourceName, ['file.doc']);
      assert.deepEqual(meta['Content-Type'], ['application/msword']);
      assert.deepEqual(meta['dcterms:created'], ['2013-12-06T21:15:26Z']);
      done();
    });
  });

  test('extract from extensionless doc', done => {
    tika.text('test/data/extensionless/doc', (err, text) => {
      assert.ifError(err);
      assert.equal(text, 'Just some text.\n');
      done();
    });
  });

  test('extract from docx', done => {
    tika.text('test/data/file.docx', (err, text) => {
      assert.ifError(err);
      assert.equal(text, 'Just some text.\n');
      done();
    });
  });

  test('extract meta from docx', done => {
    tika.meta('test/data/file.docx', (err, meta) => {
      assert.ifError(err);
      assert.ok(meta);
      assert.deepEqual(meta.resourceName, ['file.docx']);
      assert.deepEqual(meta['Content-Type'], ['application/vnd.openxmlformats-officedocument.wordprocessingml.document']);
      assert.deepEqual(meta['Application-Name'], ['LibreOffice/4.1.3.2$MacOSX_x86 LibreOffice_project/70feb7d99726f064edab4605a8ab840c50ec57a']);
      done();
    });
  });

  test('extract from extensionless docx', done => {
    tika.text('test/data/extensionless/docx', (err, text) => {
      assert.ifError(err);
      assert.equal(text, 'Just some text.\n');
      done();
    });
  });

  test('extract meta from extensionless docx', done => {
    tika.meta('test/data/extensionless/docx', (err, meta) => {
      assert.ifError(err);
      assert.ok(meta);
      assert.deepEqual(meta.resourceName, ['docx']);
      assert.deepEqual(meta['Content-Type'], ['application/vnd.openxmlformats-officedocument.wordprocessingml.document']);
      assert.deepEqual(meta['Application-Name'], ['LibreOffice/4.1.3.2$MacOSX_x86 LibreOffice_project/70feb7d99726f064edab4605a8ab840c50ec57a']);
      done();
    });
  });

  test('extract from pdf', done => {
    tika.text('test/data/file.pdf', (err, text) => {
      assert.ifError(err);
      assert.equal(text.trim(), 'Just some text.');
      done();
    });
  });

  test('detect content-type of pdf', done => {
    tika.type('test/data/file.pdf', (err, contentType) => {
      assert.ifError(err);
      assert.equal(contentType, 'application/pdf');
      done();
    });
  });

  test('extract meta from pdf', done => {
    tika.meta('test/data/file.pdf', (err, meta) => {
      assert.ifError(err);
      assert.ok(meta);
      assert.deepEqual(meta.resourceName, ['file.pdf']);
      assert.deepEqual(meta['Content-Type'], ['application/pdf']);
      assert.deepEqual(meta.producer, ['LibreOffice 4.1']);
      done();
    });
  });

  test('extract from extensionless pdf', done => {
    tika.text('test/data/extensionless/pdf', (err, text) => {
      assert.ifError(err);
      assert.equal(text.trim(), 'Just some text.');
      done();
    });
  });

  test('extract meta from extensionless pdf', done => {
    tika.meta('test/data/extensionless/pdf', (err, meta) => {
      assert.ifError(err);
      assert.ok(meta);
      assert.deepEqual(meta.resourceName, ['pdf']);
      assert.deepEqual(meta['Content-Type'], ['application/pdf']);
      assert.deepEqual(meta.producer, ['LibreOffice 4.1']);
      done();
    });
  });

  test('extract from protected pdf', done => {
    tika.text('test/data/protected/file.pdf', (err, text) => {
      assert.ifError(err);
      assert.equal(text.trim(), 'Just some text.');
      done();
    });
  });

  test('extract meta from protected pdf', done => {
    tika.meta('test/data/protected/file.pdf', (err, meta) => {
      assert.ifError(err);
      assert.ok(meta);
      assert.deepEqual(meta.resourceName, ['file.pdf']);
      assert.deepEqual(meta['Content-Type'], ['application/pdf']);
      assert.deepEqual(meta.producer, ['LibreOffice 4.1']);
      done();
    });
  });
});

suite('partial document extraction tests', () => {
  test('extract from long txt', done => {
    tika.text('test/data/big/file.txt', { maxLength: 10 }, (err, text) => {
      assert.ifError(err);
      assert.equal(text.length, 10);
      assert.equal(text, 'Lorem ipsu');
      done();
    });
  });

  test('extract from pdf', done => {
    tika.text('test/data/file.pdf', { maxLength: 10 }, (err, text) => {
      assert.ifError(err);
      assert.equal(text.length, 10);
      assert.equal(text.trim(), 'Just some');
      done();
    });
  });
});

suite('obscure document tests', () => {
  test('extract from Word 2003 XML', done => {
    tika.text('test/data/obscure/word2003.xml', (err, text) => {
      assert.ifError(err);
      assert.ok(-1 !== text.indexOf('Just some text.'));
      assert.ok(-1 === text.indexOf('<?xml'));
      done();
    });
  });
});

suite('structured data tests', () => {
  test('extract from plain XML', done => {
    tika.text('test/data/structured/plain.xml', (err, text) => {
      assert.ifError(err);
      assert.ok(-1 !== text.indexOf('Just some text.'));
      assert.ok(-1 === text.indexOf('<?xml'));
      done();
    });
  });
});

suite('image tests', () => {
  test('extract from png', done => {
    tika.text('test/data/file.png', (err, text) => {
      assert.ifError(err);
      assert.equal(text, '');
      done();
    });
  });

  test('extract from extensionless png', done => {
    tika.text('test/data/extensionless/png', (err, text) => {
      assert.ifError(err);
      assert.equal(text, '');
      done();
    });
  });

  test('extract from gif', done => {
    tika.text('test/data/file.gif', (err, text) => {
      assert.ifError(err);
      assert.equal(text, '');
      done();
    });
  });

  test('extract meta from gif', done => {
    tika.meta('test/data/file.gif', (err, meta) => {
      assert.ifError(err);
      assert.ok(meta);
      assert.deepEqual(meta.resourceName, ['file.gif']);
      assert.deepEqual(meta['Content-Type'], ['image/gif']);
      assert.deepEqual(meta['Dimension ImageOrientation'], ['Normal']);
      done();
    });
  });

  test('extract from extensionless gif', done => {
    tika.text('test/data/extensionless/gif', (err, text) => {
      assert.ifError(err);
      assert.equal(text, '');
      done();
    });
  });

  test('extract meta from extensionless gif', done => {
    tika.meta('test/data/extensionless/gif', (err, meta) => {
      assert.ifError(err);
      assert.ok(meta);
      assert.deepEqual(meta.resourceName, ['gif']);
      assert.deepEqual(meta['Content-Type'], ['image/gif']);
      assert.deepEqual(meta['Dimension ImageOrientation'], ['Normal']);
      done();
    });
  });
});

suite('non-utf8 encoded document tests', () => {
  test('extract Windows Latin 1 text', done => {
    tika.text('test/data/nonutf8/windows-latin1.txt', (err, text) => {
      assert.ifError(err);
      assert.equal(text, 'Algún pequeño trozo de texto.\n\n');
      done();
    });
  });

  test('detect Windows Latin 1 text charset', done => {
    tika.charset('test/data/nonutf8/windows-latin1.txt', (err, charset) => {
      assert.ifError(err);
      assert.equal(typeof charset, 'string');
      assert.equal(charset, 'ISO-8859-1');
      done();
    });
  });

  test('detect Windows Latin 1 text content-type and charset', done => {
    tika.typeAndCharset('test/data/nonutf8/windows-latin1.txt', (err, contentType) => {
      assert.ifError(err);
      assert.equal(contentType, 'text/plain; charset=ISO-8859-1');
      done();
    });
  });

  test('extract UTF-16 English-language text', done => {
    tika.text('test/data/nonutf8/utf16-english.txt', (err, text) => {
      assert.ifError(err);
      assert.equal(text, 'Just some text.\n\n');
      done();
    });
  });

  test('detect UTF-16 English-language text charset', done => {
    tika.charset('test/data/nonutf8/utf16-english.txt', (err, charset) => {
      assert.ifError(err);
      assert.equal(charset, 'UTF-16LE');
      done();
    });
  });

  test('detect UTF-16 English-language text content-type and charset', done => {
    tika.typeAndCharset('test/data/nonutf8/utf16-english.txt', (err, contentType) => {
      assert.ifError(err);
      assert.equal(contentType, 'text/plain; charset=UTF-16LE');
      done();
    });
  });

  test('extract UTF-16 Chinese (Simplified) text', done => {
    tika.text('test/data/nonutf8/utf16-chinese.txt', (err, text) => {
      assert.ifError(err);
      assert.equal(text, '\u53ea\u662f\u4e00\u4e9b\u6587\u5b57\u3002\n\n');
      done();
    });
  });

  test('detect UTF-16 Chinese (Simplified) text charset', done => {
    tika.charset('test/data/nonutf8/utf16-chinese.txt', (err, charset) => {
      assert.ifError(err);
      assert.equal(charset, 'UTF-16LE');
      done();
    });
  });

  test('detect UTF-16 Chinese (Simplified) text content-type and charset', done => {
    tika.typeAndCharset('test/data/nonutf8/utf16-chinese.txt', (err, contentType) => {
      assert.ifError(err);
      assert.equal(contentType, 'text/plain; charset=UTF-16LE');
      done();
    });
  });
});

suite('archive tests', () => {
  test('extract from compressed archive', done => {
    tika.text('test/data/archive/files.zip', (err, text) => {
      assert.ifError(err);
      assert.equal(text.trim(), 'file1.txt\nSome text 1.\n\n\n\n\nfile2.txt\nSome text 2.\n\n\n\n\nfile3.txt\nSome text 3.');
      done();
    });
  });

  test('extract from compressed zlib archive', done => {
    tika.text('test/data/archive/files.zlib', (err, text) => {
      assert.ifError(err);
      assert.equal(text.trim(), 'files\nSome text 1.\nSome text 2.\nSome text 3.');
      done();
    });
  });

  test('detect compressed archive content-type', done => {
    tika.type('test/data/archive/files.zip', (err, contentType) => {
      assert.ifError(err);
      assert.equal(contentType, 'application/zip');
      done();
    });
  });

  test('extract from twice compressed archive', done => {
    tika.text('test/data/archive/files-files.zip', (err, text) => {
      assert.ifError(err);
      assert.equal(text.trim(), 'file4.txt\nSome text 4.\n\n\n\n\nfile5.txt\nSome text 5.\n\n\n\n\nfile6.txt\nSome text 6.\n\n\n\n\nfiles.zip\n\n\nfile1.txt\n\nSome text 1.\n\n\n\n\n\n\n\nfile2.txt\n\nSome text 2.\n\n\n\n\n\n\n\nfile3.txt\n\nSome text 3.');
      done();
    });
  });
});

suite('encrypted doc tests', () => {
  test('detect encrypted pdf content-type', done => {
    tika.type('test/data/encrypted/file.pdf', (err, contentType) => {
      assert.ifError(err);
      assert.equal(contentType, 'application/pdf');
      done();
    });
  });

  test('detect encrypted doc content-type', done => {
    tika.type('test/data/encrypted/file.doc', (err, contentType) => {
      assert.ifError(err);
      assert.equal(contentType, 'application/msword');
      done();
    });
  });

  test('specify password to decrypt document', done => {
    tika.text('test/data/encrypted/file.pdf', {
      password: 'password'
    }, (err, text) => {
      assert.ifError(err);
      assert.equal(text.trim(), 'Just some text.');
      done();
    });
  });
});

suite('error handling tests', () => {
  test('extract from encrypted doc', done => {
    tika.text('test/data/encrypted/file.doc', err => {
      assert.ok(err);
      assert.ok(-1 !== err.toString().indexOf('EncryptedDocumentException: Unable to process: document is encrypted'));
      done();
    });
  });

  test('extract from encrypted pdf', done => {
    tika.text('test/data/encrypted/file.pdf', err => {
      assert.ok(err);
      assert.ok(-1 !== err.toString().indexOf('Unable to process: document is encrypted'));
      done();
    });
  });
});

suite('http extraction tests', function () {
  test('extract from pdf over http', function (done) {
    this.timeout(10000);
    tika.text('https://tools.ietf.org/pdf/rfc2324.pdf', (err, text) => {
      assert.ifError(err);
      assert.ok(-1 !== text.indexOf('Hyper Text Coffee Pot Control Protocol'));
      done();
    });
  });
});

suite('ftp extraction tests', function () {
  test('extract from text file over ftp', function (done) {
    this.timeout(10000);
    tika.text('ftp://ftp.ietf.org/rfc/rfc959.txt', (err, text) => {
      assert.ifError(err);
      assert.ok(-1 !== text.indexOf('FILE TRANSFER PROTOCOL'));
      done();
    });
  });
});

suite('language detection tests', () => {
  test('detect English text', done => {
    tika.language('This just some text in English.', (err, language, reasonablyCertain) => {
      assert.ifError(err);
      assert.equal(typeof language, 'string');
      assert.equal(typeof reasonablyCertain, 'boolean');
      assert.equal(language, 'en');
      done();
    });
  });
});
