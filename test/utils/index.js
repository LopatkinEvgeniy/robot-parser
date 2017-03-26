const fs = require('fs');
const {
  normalizeDomainName,
  parseRobotsTxt,
} = require('../../src/utils');

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

  describe('Function parseRobotsTxt', () => {
    it('Should be a function', () => {
      parseRobotsTxt.should.be.a.function;
    });
    it('Should return empty object when empty string given', () => {
      parseRobotsTxt('').should.be.deep.equal({});
    });
    it('Should return empty object when whitespaces given', () => {
      parseRobotsTxt(' ').should.be.deep.equal({});
      parseRobotsTxt('    ').should.be.deep.equal({});
    });
    it('Should return empty object when multiline whitespaces given', () => {
      parseRobotsTxt('\n  \n\n \n').should.be.deep.equal({});
      parseRobotsTxt('\n\n  \n \n').should.be.deep.equal({});
    });
    it('Should correctly parse file without comments', () => {
      const fileData = fs.readFileSync('test/utils/robots-no-comments.txt')
        .toString();

      parseRobotsTxt(fileData).should.be.deep.equal({
        CCBot: {
          Allow: ['/*/*/tree/master', '/*/*/blob/master'],
          Disallow: ['/ekansa/Open-Context-Data', '/ekansa/opencontext-*'],
        },
      });
    });
    it('Should correctly parse file with comments', () => {
      const fileData = fs.readFileSync('test/utils/robots-with-comments.txt')
        .toString();

      parseRobotsTxt(fileData).should.be.deep.equal({
        Daumoa: {
          Allow: ['/*/*/tree/master', '/*/*/blob/master'],
          Disallow: ['/ekansa/Open-Context-Data', '/ekansa/opencontext-*', '/*/*/pulse'],
        },
      });
    });
    it('Should correctly parse file with multiple User-agents', () => {
      const fileData = fs.readFileSync('test/utils/robots-multy-agents.txt')
        .toString();

      parseRobotsTxt(fileData).should.be.deep.equal({
        CCBot: {
          Allow: ['/*/*/tree/master', '/*/*/blob/master'],
          Disallow: ['/ekansa/Open-Context-Data', '/ekansa/opencontext-*'],
        },
        Daumoa: {
          Allow: ['/*/*/tree/master', '/*/*/blob/master'],
          Disallow: ['/ekansa/Open-Context-Data', '/ekansa/opencontext-*', '/*/*/pulse'],
        },
      });
    });
  }); // Function parseRobotsTxt
}); // Module utils
