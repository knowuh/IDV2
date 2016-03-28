module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    markdown: {
      top: {
        files: [
          {
            expand: true,
            src: '*.md',
            ext: '.html'
          }
        ],
        options: {
          template: 'markdown.jst',
          templateContext: {},
          contextBinder: true,
          contextBinderMark: '@@@'
        }
      },
      days: {
        files: [
          {
            expand: true,
            src: '0*/*.md',
            ext: '.html'
          }
        ],
        options: {
          template: 'markdown2.jst',
          templateContext: {},
          contextBinder: true,
          contextBinderMark: '@@@'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-markdown');

};