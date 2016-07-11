var assert = require('chai').assert;
var permutation = require('../task2.js').permutation;

describe('#permutation()', function() {
    it('should consistantly permutate values in correct order', function() {
        var getClassName = permutation('abc', 0).next;
        var actual = [];
        for (var i = 0; i < 40; i++) {
            actual.push(getClassName());
        }
        var expected = [
            'a', 'b', 'c',
            'aa', 'ab', 'ac', 'ba', 'bb', 'bc', 'ca', 'cb', 'cc',
            'aaa', 'aab', 'aac', 'aba', 'abb', 'abc', 'aca', 'acb', 'acc',
            'baa', 'bab', 'bac', 'bba', 'bbb', 'bbc', 'bca', 'bcb', 'bcc',
            'caa', 'cab', 'cac', 'cba', 'cbb', 'cbc', 'cca', 'ccb', 'ccc',
            'aaaa'
        ];
        assert.deepEqual(actual, expected, 'These arrays are not equal');
    });

    it('should be correct length', function() {
        var actual = [],
            alphabet = 'abc12',
            alphabetLength = alphabet.length,
            exclude = alphabetLength - alphabet.indexOf('1'),
            getClassName = permutation(alphabet, exclude).next,
            testPower = 5;

        for (var i = 0; i <= getSum(testPower); i++) {
            actual.push(getClassName());
        }
        for (var power = 1; power <= testPower; ++power) {
            assert.equal(actual[getSum(power)].length, power + 1, 'Incorrect length of class');
        }

        function getSum(power) {
            var sum = 0;
            for (var i = 1; i <= power; ++i) {
                var mathPow = Math.pow(alphabetLength, i);
                sum += mathPow - mathPow / alphabetLength * exclude;
            }
            return sum;
        }
    });

    it('should start only with Latin symbols', function() {
        var getClassName = permutation('ab12', 2).next;
        var actual = [];
        for (var i = 0; i < 42; i++) {
            actual.push(getClassName());
        }
        var expected = [
            'a', 'b',
            'aa', 'ab', 'a1', 'a2', 'ba', 'bb', 'b1', 'b2',
            'aaa', 'aab', 'aa1', 'aa2', 'aba', 'abb', 'ab1', 'ab2',
            'a1a', 'a1b', 'a11', 'a12', 'a2a', 'a2b', 'a21', 'a22',
            'baa', 'bab', 'ba1', 'ba2', 'bba', 'bbb', 'bb1', 'bb2',
            'b1a', 'b1b', 'b11', 'b12', 'b2a', 'b2b', 'b21', 'b22'
        ];
        assert.deepEqual(actual, expected, 'These arrays are not equal');
    });
});
