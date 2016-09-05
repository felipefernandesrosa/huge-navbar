module.exports = function (grunt) {

	grunt.initConfig({
		sass: {
			dist: {
				files: {
					'public/styles/main.css': 'sass/main.scss'
				}
			}
		},
		watch: {
			files: ['sass/**/*.scss', 'public/js/**/*.js'],
			tasks: ['sass']
		},
		jshint: {
			all: ['Gruntfile.js', 'public/**/*.css']
		}
		
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	
	grunt.registerTask('default', ['sass', 'watch']);
};