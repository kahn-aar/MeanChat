module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      },
      my_target: {
        files: {
          'public/angular/chat.min.js': ['public/chat/init.js', 'public/chat/services/chatService.js', 'public/chat/routes/route.js', 'public/chat/filters/customFilters.js', 'public/chat/controllers/chatController.js'],
          'public/angular/articles.min.js': ['public/articles/init.js', 'public/articles/services/articleFactory.js', 'public/articles/routes/route.js', 'public/articles/controllers/articlesController.js']
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};