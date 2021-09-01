const word_unit = ['nghìn', 'triệu', 'tỷ']
const word = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];

const spell_group_of_2 = (_2, _3) => {
    let spell = ''
    if (_2 === '0' && _3 === '0') return '';
    switch (_2) {
        case '0': spell = 'lẻ'; break;
        case '1': spell = 'mười'; break;
        default: spell = `${word[_2]} mươi`;
    }
    switch (_3) {
        case '0': return spell;
        case '1': return `${spell} ${(_2 === '1' || _2 === '0') ? 'một' : 'mốt'}`;
        case '5': return `${spell} lăm`;
        default: return `${spell} ${word[_3]}`;
    }
}
const spell_group_of_3 = (num) => {
    let [_3, _2, _1] = num.split(''); // 432
    if (_2 === undefined) return word[_3]; // 1 2 3 4 5 6 7 8 9 0
    else if (_1 === undefined) return spell_group_of_2(_2, _3) // 10 11 12 21 23 25 53 55 99
    else return `${(_1 === '0' && next) ? 'không trăm' : `${word[_1]} trăm`} ${spell_group_of_2(_2, _3)}`;
}

export const spell = num => {  // 1235 => một trăm hai mươi ba
    // config
    let _spell = [], is_negative = num < 0;
    // remove negative
    num = num * (is_negative || -1) // -100 => 100

    let rev = ("" + num).split('').reverse().join("") // 4321
    let group_of_3 = rev.match(/\d{1,3}/g) // 432 1
    group_of_3.forEach((g, i) =>
        g != '000' &&
        _spell.push(
            spell_group_of_3('' + g, i !== group_of_3.length - 1) +
            (i != 0 ? ` ${word_unit[(i - 1) % 3]}` : '')
        )
    )
    return (is_negative ? 'âm ' : '') + _spell.reverse().join(" ")
}
