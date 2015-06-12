'use strict';

module.exports = function(grunt) {

	// -----------------------------------
	//  Variables
	// -----------------------------------
	var pkg = grunt.file.readJSON('package.json');
	var ROOT_PATH           = '.'
	, PROJECT_PATH        = ROOT_PATH + '/htdocs'
	, ASSET_TEMPLATE_PATH = ROOT_PATH + '/assets/template'
	, imgSpacer = ('../common/img/spacer.gif')
	, imgSample = ('../common/img/sample/001_a.jpg')
	//, imgSpacer = ('/img/spacer.gif')
	//, imgSample = ('item image')
	;

	// -----------------------------------
	//  Options
	// -----------------------------------

	grunt.config.init({

		path:{
			resource:"assets",
			deploy:"htdocs"
		},

		ect: {
			options: {
				root: ASSET_TEMPLATE_PATH
			},
			render: {
				expand: true
				,flatten: false
				,cwd: ASSET_TEMPLATE_PATH
				,src: ['**/*.ect']
				,dest: PROJECT_PATH
				,ext: '.html'
				, variables: { // ★ここに書く
					title: 'Document Title'
					, img: imgSpacer
					, imgSample: imgSample
					//, imgLoading: imgLoading
					, links: [
						PROJECT_PATH + '/common/css/sp_login_common.css'
						//, 'http://example2.example'
						//, 'http://example3.example'
					]
				}
			}
		},

		// Compass
		compass: {
			dist: {
				options: {
					config: "config.rb"
				}
			}
		},
		//結合
		concat: {
			resJs: {
				src: ['<%= path.resource %>/common/js/lib/*.js','<%= path.resource %>/common/js/script/*.js'],
				dest: '<%= path.resource %>/common/js/script.js'
			},
			depJs: {
				src: ['<%= path.deploy %>/common/js/script.js','<%= path.resource %>/common/js/lib/license.js'],
				dest: '<%= path.deploy %>/common/js/script.js'
			},
			depCss: {
				src: ['<%= path.deploy %>/common/css/style.css','<%= path.deploy %>/common/css/sass/_license.scss'],
				dest: '<%= path.deploy %>/common/css/style.css'
			}
		},
		// LiveReload
		connect:{
			livereload:{
				options:{
					port:9001,
					hostname: 'localhost',
					open: true,
					base:"<%= path.deploy %>/"
				}
			}
		},
		//CSS min
		cssmin: {
			minify: {
				expand: true,
				cwd: '<%= path.deploy %>/common/css/',
				src: ['*.css', '!*.min.css'],
				dest: '<%= path.deploy %>/common/mincss/',
				//ext: '.min.css',
				ext: '.css',
				options: {
					noAdvanced: true
				}
			}
		},

		//ファイルの複製
		copy: {
			deploy: {
				files:[{
					expand : true,
					cwd : "<%= path.resource %>",
					src : ["**"],
					dest : "<%= path.deploy %>"
				}]
			}
		},

		//コマンド実行時にページをブラウザで開く
		open: {
			server: {
				path: 'http://localhost:<%= connect.livereload.options.port %>'
			}
		},

		//ベンダープレフィックス
		autoprefixer: {
			target: {
				expand: true,
				src: 'css/**/*.css',
				dest: 'dist'
		    },
			options: {
				browsers: [ "last 2 version","ie 8","ie 9" ]
			},
			default: {
				src: "<%= path.deploy %>/common/css/style.css",
				dest: "<%= path.deploy %>/common/css/style.css"
			}
		},

		// Watch
		watch: {
			options: {
				livereload: true
			},
			html: {
				files: "<%= path.resource %>/**/*.html",
				tasks: []
			},
			css: {
				files: ["<%= path.resource %>/**/*.scss","<%= path.resource %>/**/**/*.scss"],
				tasks: ['compass','cssmin'],
			},
			ect: {
				files: ["<%= path.resource %>/**/*.ect","<%= path.resource %>/**/**/*.ect"],
				tasks: ['ect']
			}
		},

		'gh-pages': {
      options: {
        base: 'assets',
        branch: 'master',
        repo: 'https://odego@bitbucket.org/odego/grunt_first_kit_1.git',
        message: 'Auto-generated commit by grunt-gh-pages'
      },
      src: ['**']
    },
    gitpush: {
      src: {
        options: {
          branch: 'master'
        }
      }
    }

	});

	//使うプラグインの読み込み
	var taskName;

	for(taskName in pkg.devDependencies) {
		if(taskName.substring(0, 6) == 'grunt-') {
			grunt.loadNpmTasks(taskName);
		}
	}

	//grunt.loadNpmTasks('grunt-ect');

	//デフォルト
	grunt.registerTask('default', [
		'connect',
		'ect',
		'watch'
	]);
	grunt.task.loadNpmTasks('assemble');
	// assemble(a) タスクコマンド grunt a
	grunt.registerTask('a', ['assemble']);

	//リリース用
	grunt.registerTask('deploy',[
		'clean:deleteRelease',
		'copy:deploy',
		'cssmin',
		'concat:depCss',
		'uglify',
		'concat:depJs',
		'clean:deleteSass',
		'clean:deleteJs',
		'clean:deleteSprites'
	])
};
