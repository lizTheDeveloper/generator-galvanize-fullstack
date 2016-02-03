'use strict';
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = require('yeoman-generator').Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the slick ' + chalk.blue('generator-galvanize-fullstack') + ' generator!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'knex',
      message: 'Would you like to use knex and postgres?',
      default: true
    },
    {
      type: 'confirm',
      name: 'sample',
      message: 'Would you like some sample code?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: function () {
    //front end
    this.fs.copy(this.templatePath('src/public/js/main.js'), this.destinationPath('public/js/main.js'));
    this.fs.copy(this.templatePath('src/public/css/main.css'), this.destinationPath('public/css/main.css'));

    //setup
    this.fs.copy(this.templatePath('src/bin/www'), this.destinationPath('bin/www'));
    
    //views
    this.fs.copy(this.templatePath('src/views/index.ejs'), this.destinationPath('views/index.ejs'), this.props);
    this.fs.copy(this.templatePath('src/views/error.ejs'), this.destinationPath('views/error.ejs'), this.props);

    this.fs.copyTpl(this.templatePath('src/app.js'), this.destinationPath('app.js'), this.props);
    this.fs.copy(this.templatePath('package.json'), this.destinationPath('package.json'));
    if (this.props.knex) {
      this.fs.copy(this.templatePath('src/knexfile.js'), this.destinationPath('knexfile.js'));
      this.fs.copy(this.templatePath('src/db/knex.js'), this.destinationPath('db/knex.js'));
      this.fs.copy(this.templatePath('src/routes/index_with_knex.js'), this.destinationPath('routes/index.js'));
    } else {
      this.fs.copy(this.templatePath('src/routes/index.js'), this.destinationPath('routes/index.js'));
    }

    if (this.props.sample) {
      this.fs.copy(this.templatePath('src/migrations/20160202202148_books.js'), this.destinationPath('migrations/20160202202148_books.js'));
      this.fs.copy(this.templatePath('src/migrations/20160202202021_authors.js'), this.destinationPath('migrations/20160202202021_authors.js'));
      this.fs.copy(this.templatePath('src/api/books.js'), this.destinationPath('api/books.js'));
      this.fs.copy(this.templatePath('src/api/authors.js'), this.destinationPath('api/authors.js'));
    }

    this.fs.copy(this.templatePath('_gitignore'), this.destinationPath('.gitignore'));
    this.fs.copy(this.templatePath('gulpfile.js'), this.destinationPath('gulpfile.js'));
  },

  install: function () {
    this.installDependencies();
  }
});
