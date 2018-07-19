var supertest = require('supertest');
var assert = require('chai').assert;
var UrlShort = require('../../../api/models/UrlShort.js');

describe('UrlShortController.bulk', function () {
	describe('POST /url/bulk', function () {
		it('responds with json', function (done) {
			supertest(sails.hooks.http.app)
			.post('/url/bulk')
			.set('Accept', 'application/json')
			.send([])
			.expect('Content-Type', /json/)
			.expect({ message: 'Json is required for this endpoint' })
			.expect(200, done);
		});
	});
	var urls = ['https://github.com/visionmedia/supertest', 'https://sailsjs.com/documentation/concepts/testing'];
	describe('POST /url/bulk', function () {
		it('responds with json', function (done) {
		 	supertest(sails.hooks.http.app)
			.post('/url/bulk')
			.set('Accept', 'application/json')
			.send(urls)
			.expect('Content-Type', /json/)
			.expect(200)
			.then(res=>{
				assert.isArray(res.body);
				assert.lengthOf(res.body, 2);
				assert.isTrue(res.body.every((element)=>{
					return element.hasOwnProperty('hash') && element.hasOwnProperty('url');
				}), "Each element espected hash and url.");
				done();
			}).catch(function(e){
				done(e);
			});
		});
	});
	var failUrls = ['wqeqweqwe','https://sailsjs.com/documentation/concepts/testing'];
	describe('POST /url/bulk', function () {
		it('responds with json', function (done) {
			supertest(sails.hooks.http.app)
			.post('/url/bulk')
			.set('Accept', 'application/json')
			.send(failUrls)
			.expect('Content-Type', /json/)
			.expect({
				message:"Some element in the array is empty or not have the url format"
			})
			.expect(200, done);
		});
	});
	var massiveUrls = [];
	var amountElements = 2000;
	for(var i = 0; i < amountElements; i++){
		massiveUrls.push('https://sailsjs.com/documentation/concepts/testing');
	}
	describe('POST /url/bulk', function () {
		it('responds with json', function (done) {
			supertest(sails.hooks.http.app)
			.post('/url/bulk')
			.set('Accept', 'application/json')
			.send(massiveUrls)
			.expect('Content-Type', /json/)
			.expect(200)
			.then(res=>{
				assert.isArray(res.body);
				assert.lengthOf(res.body, amountElements);
				assert.isTrue(res.body.every((element)=>{
					return element.hasOwnProperty('hash') && element.hasOwnProperty('url');
				}), "Each element espected hash and url.");
				done();
			}).catch(function(e){
				done(e);
			});
		});
	});
});
describe('UrlShortController.redirectUrl', function () {
	var urlsToRedirect = ['https://www.google.com'];
	
	describe('Get /', function () {
		it('responds with redirect', function (done) {
			supertest(sails.hooks.http.app)
			.post('/url/bulk')
			.set('Accept', 'application/json')
			.send(urlsToRedirect)
			.expect('Content-Type', /json/)
			.expect(200)
			.then((urlsToGet)=>{
				assert.isArray(urlsToGet.body);
				assert.lengthOf(urlsToGet.body, 1);
				assert.isTrue(urlsToGet.body.every((element)=>{
					return element.hasOwnProperty('hash') && element.hasOwnProperty('url');
				}), "Each element espected hash and url.");
				var firstUrl = urlsToGet.body[0];
				return supertest(sails.hooks.http.app)
				.get('/'+firstUrl.hash)
				.expect(302)
				.expect('Location', firstUrl.url)
				.then(function(res){
					done();
				}).catch((e)=>{
					done(e);
				});
			}).catch((e)=>{
				done(e);
			});
			
		});
	});
	describe('Get /', function () {
		it('responds with Not Found', function (done) {
			supertest(sails.hooks.http.app)
			.get('/123')
			.expect(404, done);
		});
	});
});