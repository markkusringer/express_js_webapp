'use strict';
module.exports = function(grunt){
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-browserify');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      options: {
        transform: [
          ['reactify', {}]
        ]
      },
      dist: {
        src: ['src/griddle.jsx'],
        dest: 'public/bundle.js'
      }
    },
  });

  grunt.registerTask('default', ['browserify']);
};
