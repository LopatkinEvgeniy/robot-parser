const { normalizeDomainName } = require('../../src/utils');

describe('Module utils', () => {
  describe('Function normalizeDomainName', () => {
    it('Should be a function', () => {
      normalizeDomainName.should.be.a.function;
    });
    it('Should add "http://" prefix if it does not exist', () => {
      normalizeDomainName('test.com').should.be.equal('http://test.com');
      normalizeDomainName('ya.ru').should.be.equal('http://ya.ru');
    });
    it('Should not add "http://" prefix if it exists', () => {
      normalizeDomainName('http://test.com').should.be.equal('http://test.com');
      normalizeDomainName('http://ya.ru').should.be.equal('http://ya.ru');
    });
    it('Should not add "http://" prefix if there is "https://" prefix', () => {
      normalizeDomainName('https://test.com').should.be.equal('https://test.com');
      normalizeDomainName('https://ya.ru').should.be.equal('https://ya.ru');
    });
    it('Should delete trailing spaces', () => {
      normalizeDomainName('  http://test.com   ').should.be.equal('http://test.com');
      normalizeDomainName('    https://ya.ru ').should.be.equal('https://ya.ru');
    });
    it('Should delete trailing slashes from right', () => {
      normalizeDomainName('http://test.com///   ').should.be.equal('http://test.com');
      normalizeDomainName('    https://ya.ru/ ').should.be.equal('https://ya.ru');
      normalizeDomainName('http://test.ru/').should.be.equal('http://test.ru');
    });
  }); // Function normalizeDomainName
}); // Module utils
