/**
 * @param {Array} data – массив CSS классов
 */
module.exports = function(data) {
    //определение частоты встречаемости классов в массиве
    var counter = [];
    data.forEach(className => {
        var find = counter.find(item => item.className === className);
        find ? find.freq++ : counter.push({
            className,
            freq: 1
        });
    });
    //сортировка массива CSS классов по частотате их встречаемости
    counter.sort((item1, item2) => item1.freq > item2.freq ? -1 : 1);
    //формирование результирующего объекта с новыми названиями классов
    var alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-";
    var getNewClassName = permutation(alphabet, alphabet.length - alphabet.indexOf('0')).next;
    var result = {};
    counter.forEach(item => result[item.className] = getNewClassName());
    console.log(result);
    return result;
};

module.exports.permutation = permutation;

/**
    Функция делает последовательную перестановку символов алфавита с повторением
*   @param {String} alphabet - алфавит
*   @param {Number} exclude - количество символов в конце алфавита, с которых не должен начинаться класс
*/
function permutation(alphabet, exclude) {
    var hashLength = 1,
        hashIndex = 0,
        alphabetIndex = 0,
        stopIndex = alphabet.length - exclude,
        alphabetLength = stopIndex, // т.к. классы должны начинаться только с латинских символов
        hash = [],
        stack = [];

    function next() {
        while (true) {
            while (alphabetIndex < alphabetLength) {
                hash[hashIndex] = alphabet[alphabetIndex++];
                if (hashIndex == hashLength - 1)
                    return hash.join('');
                else {
                    if (alphabetIndex < alphabetLength) {
                        stack.push(hashIndex);
                        stack.push(alphabetIndex);
                    }
                    hashIndex++;
                    alphabetIndex = 0;
                }
            }
            /*если выполнены все перестановки для текущего кол-ва символов hashLength
            или если следующим первым символом будет запрещенный символ, то увеличиваем длину хеша и начинаем перестановку заного */
            if (stack.length == 0 || (stack.length == 2 && stack[0] == 0 && stack[1] == stopIndex)) {
                reset(hashLength + 1);
                continue;
            }

            alphabetIndex = stack.pop();
            hashIndex = stack.pop();
        }
    }

    function reset(_hashLength) {
        alphabetLength = alphabet.length;
        hashLength = _hashLength;
        alphabetIndex = 0;
        hashIndex = 0;
        hash = [];
        stack = [];
    }

    return {
        next,
        reset
    };
}
