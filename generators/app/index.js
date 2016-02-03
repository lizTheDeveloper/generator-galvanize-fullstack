'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the slick ' + chalk.blue('generator-galvanize-fullstack') + ' generator!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'knex',
      message: 'Would you like to use knex with postgres?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: function () {
    this.copy('./src/client/js/main.js', './src/client/js/main.js');
    this.copy('./src/client/css/main.css', './src/client/css/main.css');
    this.copy('./src/server/bin/www', './src/server/bin/www');
    
    this.copy('./src/server/views/error.ejs', './src/server/views/error.ejs');
    this.copy('./src/server/views/index.ejs', './src/server/views/index.ejs');
    this.copy('./src/server/app.js', './src/server/app.js');
    this.copy('package.json');
    if (this.props.usingKnex) {
      this.copy('./src/server/knexfile.js', './src/server/knexfile.js');
      this.copy('./src/db/knex.js', './src/server/db/knex.js');
      this.copy('./src/server/routes/index_with_knex.js', './src/server/routes/index.js');
    } else {
      this.copy('./src/server/routes/index.js', './src/server/routes/index.js');
    }
    this.copy('_gitignore', '.gitignore');
    this.copy('gulpfile.js', 'gulpfile.js');
  },

  install: function () {
    this.installDependencies();
    if (this.props.usingKnex) {
      this.npmInstall(['knex', 'pg'], {'save': true});
    }
  }
});
