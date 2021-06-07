//! test[0] lints valid @param native types

/**
 * @param {string} arg0
 * @param {Object} arg1
 * @param {Array} arg2
 */
exports.foo = (arg0, arg1, arg2) => null;

//! test[3] lints invalid @param native types

/**
 * @param {String} arg0
 * @param {array} arg1
 * @param {object} arg2
 */
exports.foo = (arg0, arg1, arg2) => null;

//! test[0] lints valid @param array types

/**
 * @param {number[]} arg0
 * @param {(string | number)[]} arg1
 * @param {string[][]} arg2
 */
exports.foo = (arg0, arg1, arg2) => null;

//! test[3] lints invalid @param array types

/**
 * @param {Number[]} arg0
 * @param {Array<number>} arg1
 * @param {Array<string>[]} arg2
 */
exports.foo = (arg0, arg1, arg2) => null;

//! test[0] lints valid @param object types

/**
 * @param {Object<string, number>} arg0
 * @param {Object<string, Array>} arg1
 * @param {{ key: string, value: number }} arg2
 */
exports.foo = (arg0, arg1, arg2) => null;

//! test[3] lints invalid @param object types

/**
 * @param {Object.<string, number>} arg0
 * @param {Object<String, number>} arg1
 * @param {Object<string, Array<number>>} arg2
 */
exports.foo = (arg0, arg1, arg2) => null;