var mocha = require('mocha');
var should = require('should');
var books = require('../lib/google-books-search.js');

describe('Searching', function() {

	it('should return a JSON object of books', function(done) {
		books.search('Guinness World Records', {}, function(error, results) {
			should.not.exist(error);
			should.exist(results);
			results[0].should.have.property('title');
			done();
		});
	});

	it('the options argument should be optional', function(done) {
		books.search('Guinness World Records', function(error, results) {
			should.not.exist(error);
			should.exist(results);
			results[0].should.have.property('title');
			done();
		});
	});

	it('should return an empty object if there are no results', function(done) {
		books.search('JCEhrrpxF2E1s7aPW8zd2903tQ4AlCB9', {}, function(error, results) {
			should.not.exist(error);
			should.exist(results);
			results.length.should.equal(0);
			done();
		});
	});

	it('should return a specified number of results', function(done) {
		books.search('Guinness World Records', {
			limit: 15
		}, function(error, results) {
			should.not.exist(error);
			results.length.should.equal(15);
			done();
		});
	});

	it('should only accept an limit below 40', function(done) {
		books.search('Guinness World Records', {
			limit: 50
		}, function(error, results) {
			should.exist(error);
			done();
		});
	});

	it('should accept multiple fields (no query)', function(done) {
		books.search('', {
			fields: {
				author:'Rowling',
				title:'Harry Potter and the prisoner of Azkaban'
			}
		}, function(error, results) {
			should.not.exist(error);
			should.exist(results);
			results[0].should.have.property('title');
			done();
		});
	});

	it('should accept multiple fields (with query)', function(done) {
		books.search('Hello', {
			fields: {
				author:'Rowling',
				title:'Harry Potter and the prisoner of Azkaban'
			}
		}, function(error, results) {
			should.not.exist(error);
			should.exist(results);
			results[0].should.have.property('title');
			done();
		});
	});

});