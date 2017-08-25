/**
 * ideo-static-site-boilerplate
 *
 * Copyright 2017 ideonetwork (@ideonetwork)
 * Released under the MIT license (http://mit-license.org)
*/

import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import browserSync from 'browser-sync'
import del from 'del'
import runSequence from 'run-sequence'
import merge from 'merge2'
import { argv } from 'yargs'
import config from './config.json'
import pkg from './package.json'

const $ = gulpLoadPlugins()
const reload = browserSync.reload

const banner = `
/**
 * @project:  ${pkg.name}
 * @author:   ${pkg.author} (@${pkg.author})
 * Copyright (c) ${(new Date()).getFullYear()} ${pkg.author}
 * Released under the ${pkg.license} license
*/
`

// List all tasks and subtasks
gulp.task('help', $.taskListing)

gulp.task('templates', () => gulp.src(config.templates_src)
  .pipe($.plumber())
  .pipe($.pug({
    pretty: argv.pretty,
  }))
  .pipe(gulp.dest(config.templates_dest)))

// Sass compile, autprefixer, minify, sourcemaps
gulp.task('styles', () => gulp.src(config.sass_src)
  .pipe($.plumber())
  .pipe($.if(argv.pretty, $.sourcemaps.init()))
  .pipe($.sass({
    precision: 10,
    includePaths: ['.src/css/'],
  }).on('error', $.sass.logError))
  .pipe($.autoprefixer(config.autoprefixer_options))
  .pipe($.if(!argv.pretty, $.cssnano()))
  .pipe($.size({ title: 'Styles' }))
  .pipe($.header(banner, { pkg }))
  .pipe($.if(argv.pretty, $.sourcemaps.write('./')))
  .pipe(gulp.dest(config.sass_dest)))

// Concat, babelify, sourcemaps and minify js files
gulp.task('scripts', () => merge(
  gulp.src(config.js_vendor_src)
    .pipe($.plumber())
    .pipe($.size({ title: 'Vendor scripts' })),
  gulp.src(config.js_build_src)
    .pipe($.plumber())
    .pipe($.babel())
    .pipe($.size({ title: 'Build scripts' })),
)
  .pipe($.if(argv.pretty, $.sourcemaps.init()))
  .pipe($.concat(config.js_file_name))
  .pipe($.if(!argv.pretty, $.uglify({ preserveComments: 'some' })))
  .pipe($.header(banner, { pkg }))
  .pipe($.if(argv.pretty, $.sourcemaps.write('./')))
  .pipe($.size({ title: 'Scripts' }))
  .pipe(gulp.dest(config.js_dest)))

// Optimize images
gulp.task('img', () =>
  gulp.src(config.img_src)
    .pipe($.plumber())
    .pipe($.newer(config.img_dest))
    .pipe($.imagemin({
      progressive: true,
      interlaced: true,
      multipass: true,
      svgoPlugins: [{
        removeViewBox: false,
        removeUselessStrokeAndFill: false,
        removeEmptyAttrs: true,
      }],
    }))
    .pipe($.size({ title: 'img' }))
    .pipe(gulp.dest(config.img_dest)),
)

// Clean the dist/ folder
gulp.task('clean', () => del.sync([
  config.del_folder,
]))

// Copy the content from src/ to dist/
gulp.task('copy', ['clean'], () => gulp.src(config.src_folder)
  .pipe($.plumber())
  .pipe($.size({ title: 'Copying ./src content in ./dist' }))
  .pipe(gulp.dest(config.dist_folder)))

// Serve the content, live reload with browsersync
gulp.task('serve', () => {
  const startTime = Date.now()
  runSequence(['clean', 'templates', 'styles', 'scripts'], () => {
    console.log('\x1b[42m************************************\x1b[0m\n')
    console.log('\x1b[32m  Project ready for coding 😎\x1b[0m\n')
    console.log('\x1b[42m************************************\x1b[0m\n')
    console.log('[\x1b[32m\x1b[0m]', `All finished in \x1b[35m${Date.now() - startTime} ms`, '\x1b[0m\n')
    browserSync.init({
      notify: config.notify,
      server: {
        baseDir: config.base_dir,
      },
      port: config.port,
    })

    gulp.watch(['./src/templates/**/*.pug'], ['templates', reload])
    gulp.watch(['./src/css/**/*.scss'], ['styles', reload])
    gulp.watch(['./src/js/vendor/*.js'], ['scripts', reload])
    gulp.watch(['./src/js/build/*.js'], ['scripts', reload])
    gulp.watch(['./src/img/**/*'], reload)
  })
})

gulp.task('production', ['templates', 'styles', 'scripts'], () => {
  runSequence('copy')
})

gulp.task('compile', () => {
  runSequence(['templates', 'styles', 'scripts'])
})

// This is the default task :)
gulp.task('default', ['clean'], () => {
  const startTime = Date.now()
  runSequence('serve', () => {
    console.log('\x1b[42m************************************\x1b[0m\n')
    console.log('\x1b[32m  Project ready for coding 😎\x1b[0m\n')
    console.log('\x1b[42m************************************\x1b[0m\n')
    console.log('[\x1b[32m\x1b[0m]', `All finished in \x1b[35m${Date.now() - startTime} ms`, '\x1b[0m\n')
  })
})
