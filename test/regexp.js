const expect = require('chai').expect;
const {
  EOL_REGEXP,
  ROBOTS_LINE_REGEXP,
} = require('../src/regexp');

describe('Module regexp', () => {
  describe('EOL_REGEXP', () => {
    it('Should be an instance of RegExp', () => {
      EOL_REGEXP.should.be.instanceOf(RegExp);
    });
    it('Should allow next line terminators: "\\r", "\\n" and "\\r\\n"', () => {
      EOL_REGEXP.test('\r').should.be.true;
      EOL_REGEXP.test('\n').should.be.true;
      EOL_REGEXP.test('\r\n').should.be.true;
    });
    it('Should not allow empty line', () => {
      EOL_REGEXP.test('').should.be.false;
    });
    it('Should not allow whitespace', () => {
      EOL_REGEXP.test(' ').should.be.false;
    });
    it('Should not allow other strings', () => {
      EOL_REGEXP.test('a').should.be.false;
      EOL_REGEXP.test('2').should.be.false;
      EOL_REGEXP.test('0').should.be.false;
      EOL_REGEXP.test('abc').should.be.false;
      EOL_REGEXP.test('\\').should.be.false;
    });
  }); // EOL_REGEXP

  describe('ROBOTS_LINE_REGEXP', () => {
    it('Should be an instance of RegExp', () => {
      ROBOTS_LINE_REGEXP.should.be.instanceOf(RegExp);
    });
    it('Should not allow empty string', () => {
      expect(ROBOTS_LINE_REGEXP.exec('')).to.be.null;
    });
    it('Should not allow commeted string', () => {
      expect(ROBOTS_LINE_REGEXP.exec('# asdasdas')).to.be.null;
      expect(ROBOTS_LINE_REGEXP.exec('# test: test')).to.be.null;
      expect(ROBOTS_LINE_REGEXP.exec('#test: test')).to.be.null;
    });
    it('Should correctly parse correct line without whitespaces', () => {
      let [, key, value] = ROBOTS_LINE_REGEXP.exec('User-agent:CCBot');

      key.should.be.equal('User-agent');
      value.should.be.equal('CCBot');

      [, key, value] = ROBOTS_LINE_REGEXP.exec('Disallow:/*/*/blob/*');

      key.should.be.equal('Disallow');
      value.should.be.equal('/*/*/blob/*');

      [, key, value] = ROBOTS_LINE_REGEXP.exec('Allow:/*/*/blob/master');

      key.should.be.equal('Allow');
      value.should.be.equal('/*/*/blob/master');
    });
    it('Should correctly parse correct line with whitespaces', () => {
      let [, key, value] = ROBOTS_LINE_REGEXP.exec('  User-agent  : CCBot ');

      key.should.be.equal('User-agent');
      value.should.be.equal('CCBot');

      [, key, value] = ROBOTS_LINE_REGEXP.exec('Disallow: /*/*/blob/*');

      key.should.be.equal('Disallow');
      value.should.be.equal('/*/*/blob/*');

      [, key, value] = ROBOTS_LINE_REGEXP.exec(' Allow  :/*/*/blob/master');

      key.should.be.equal('Allow');
      value.should.be.equal('/*/*/blob/master');
    });
  }); // ROBOTS_LINE_REGEXP
}); // Module regexp
