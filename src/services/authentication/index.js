'use strict';

const authentication = require('feathers-authentication');

// const BitbucketStrategy = require('passport-bitbucket-oauth2').Strategy;
// const DropboxStrategy = require('passport-dropbox-oauth2').Strategy;
// const FacebookStrategy = require('passport-facebook').Strategy;
// const FacebookTokenStrategy = require('passport-facebook-token');
// const GithubStrategy = require('passport-github').Strategy;
// const GithubTokenStrategy = require('passport-github-token');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GoogleTokenStrategy = require('passport-google-token').Strategy;

module.exports = function() {
  const app = this;

  let config = app.get('auth');

  // config.bitbucket.strategy = BitbucketStrategy;
  // config.dropbox.strategy = DropboxStrategy;
  // config.facebook.strategy = FacebookStrategy;
  // config.facebook.tokenStrategy = FacebookTokenStrategy;
  // config.github.strategy = GithubStrategy;
  // config.github.tokenStrategy = GithubTokenStrategy;
  config.google.strategy = GoogleStrategy;
  config.google.tokenStrategy = GoogleTokenStrategy;

  app.set('auth', config);
  app.configure(authentication(config));
};
