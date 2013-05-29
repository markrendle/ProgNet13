module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        typescript: {
            base: {
                src: ['app/app.ts'],
                dest: 'Scripts/app.js',
                options: {
                    target: 'ES5'
                }
            }
        },

        uglify: {
            app: {
                files: {
                    'Scripts/app.min.js': ['Scripts/app.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadTasks('grunt.tasks');
    grunt.registerTask('default', ['typescript', 'uglify']);
}