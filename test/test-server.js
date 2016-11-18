let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server.js')

let should = chai.should();
let app = server.app;
let storage = server.storage

chai.use(chaiHttp);


describe('Shopping List', function() {
    it('should list items on get');
    it('should add an item on post');
    it('should edit an item on put');
    it('should delete an item on delete');
});