module.exports = function(grunt) {

    grunt.initConfig({

        // merge minify js
        uglify: {

            global: {
                options: {
                    banner: '/* http://lorem.in  @author Loeify@gmail.com */ \n'
                },
                files: {
                    'dist/am0200.js': [
                        'js/am0200.js'
                    ]
                }
            }
            
        },


        // merge minify css
        cssmin: {

            global: {
                options: {
                    banner: '/* http://lorem.in  @author Loeify@gmail.com */ \n'
                },
                files: {
                    'dist/am0200.css': [
                        'css/font.css',
                        'css/icon.css',
                        'css/am0200.css'
                    ]
                }
            }

        }

    });

    // grunt plugin
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('js', ['uglify:global']);
    grunt.registerTask('css', ['cssmin:global']);
    grunt.registerTask('all', ['uglify:global', 'cssmin:global']);

};
