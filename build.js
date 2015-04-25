/**
 * 将markdown文件转化为html文件
 */
var marked = require('./mark2html');
var ejs = require('ejs');
var fs = require('fs-extra');
var path = require('path');

buildMarkdown();
function buildMarkdown() {
	var dir = './articles-src';
	var files = fs.readdirSync(dir);
	files.forEach(function(file) {
		var title = file.split('.')[0];
		var type = file.split('.')[1];

		var data = fs.readFileSync(path.resolve(dir, file), 'utf-8')
		var tmpl = fs.readFileSync('./article-tmpl.html', 'utf-8');
		var article = marked(data);
		var html = ejs.render(tmpl, {
			title: title,
			date: '2015-4-28',
			content: article
		});
		
		fs.writeFile(path.resolve('./articles', title + '.html'), html);
	});
}