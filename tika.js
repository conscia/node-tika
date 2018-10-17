/**
 * @overview
 * @author Matthew Caruana Galizia <mcaruana@icij.org>
 * @license MIT
 * @copyright Copyright (c) 2013 The Center for Public Integrity®
 */

/*jshint node:true*/

'use strict';

const java = require('java');

java.classpath.push(__dirname + '/jar/node-tika-1.19.1.jar');
java.options.push('-Djava.awt.headless=true');
java.options.push('-Xrs');

const NodeTika = java.import('org.icij.nodetika.NodeTika');

const extract = function (uri, options, cb) {
  if (arguments.length < 3) {
    cb = options;
    options = null;
  }

  text(uri, options, function (err, text) {
    if (err) {
      return cb(err);
    }

    meta(uri, options, function (err, meta) {
      cb(err, text, meta);
    });
  });
};

const text = function (uri, options, cb) {
  if (arguments.length < 3) {
    cb = options;
    options = null;
  }

  NodeTika.extractText(uri, JSON.stringify(options), cb);
};

const xhtml = function (uri, options, cb) {
  if (arguments.length < 3) {
    cb = options;
    options = null;
  }

  NodeTika.extractXml(uri, 'html', JSON.stringify(options), cb);
};

const meta = function (uri, options, cb) {
  const handler = function (err, meta) {
    if (err) {
      return cb(err);
    }

    cb(null, JSON.parse(meta));
  };

  if (arguments.length < 3) {
    cb = options;
    options = null;
  }

  if (options) {
    NodeTika.extractMeta(uri, options.contentType, handler);
  } else {
    NodeTika.extractMeta(uri, handler);
  }
};

const type = function (uri, cb) {
  NodeTika.detectContentType(uri, cb);
};

const charset = function (uri, options, cb) {
  if (arguments.length < 3) {
    cb = options;
    options = null;
  }

  if (options) {
    NodeTika.detectCharset(uri, options.contentType, cb);
  } else {
    NodeTika.detectCharset(uri, cb);
  }
};

const typeAndCharset = function (uri, cb) {
  NodeTika.detectContentTypeAndCharset(uri, cb);
};

const language = function (text, cb) {
  NodeTika.detectLanguage(text, function (err, language) {
    if (err) {
      cb(err);
    } else {
      language = JSON.parse(language);
      cb(null, language.language, language.reasonablyCertain);
    }
  });
};

module.exports = {
  extract,
  charset,
  typeAndCharset,
  language,
  meta,
  contentType: type,
  type,
  text,
  xhtml
};
