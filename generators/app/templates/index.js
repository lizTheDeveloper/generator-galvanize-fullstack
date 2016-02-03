var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var GalvanizeExpreessGenerator = yeoman.generators.Base.extend({

  promptUser: function() {
    // greeting
    console.log(chalk.magenta("Welcome to Galvanize's Node/Express Generator"));

    this.prompt({
      type    : 'input',
      name    : 'knex',
      message : 'Do you want to use knex?(Y/n)',
      store   : true,
      default : true // Default to current folder name
    }, function (answers) {
      this.log(answers.knex);
      this.usingKnex = (answers.knex.toLowerCase() == "y");
      done();
    }.bind(this));



  },

  createApp: function(){
    this.copy('./src/client/js/main.js', './src/client/js/main.js');
    this.copy('./src/client/css/main.css', './src/client/css/main.css');
    this.copy('./src/server/bin/www', './src/server/bin/www');
    
    this.copy('./src/server/views/error.ejs', './src/server/views/error.ejs');
    this.copy('./src/server/views/index.ejs', './src/server/views/index.ejs');
    this.copy('./src/server/app.js', './src/server/app.js');
    this.copy('package.json');
    if (this.usingKnex) {
      this.copy('./src/server/knexfile.js', './src/server/knexfile.js');
      this.copy('./src/db/knex.js', './src/server/db/knex.js');
      this.npmInstall(['knex', 'pg'], {'save': true});
    } else {
      this.copy('./src/server/routes/index.js', './src/server/routes/index.js');
    }
    this.copy('_gitignore', '.gitignore');
    this.copy('gulpfile.js', 'gulpfile.js');
  },

});

module.exports = GalvanizeExpreessGenerator;
