//! test[0] lints valid mixtures of arithmatic operators

exports.opps = [
    1 + 2 - 3 * 4 / 5,
    (2 ** 2) - 5,
    5 * (2 ** 2),
    (2 ** 2) % 5,
    5 + (3 % 2),
    (3 % 2) / 5,
];

//! test[10] lints invalid mixtures of arithmatic operators

exports.opps = [
    2 ** 2 - 5,
    5 * 3 / 2 ** 2,
    2 ** 2 % 5,
    5 + 3 % 2,
    3 % 2 / 5,
];

//! test[0] lints valid mixtures of bitwise, comparison, & relational operators

const [a, b, c] = [5, 6, 7];

exports.opps = [
    (a & b) | b,
    (a & b) === 4,
    (a instanceof Number) === ('a' instanceof String),
    (a !== b) === (c !== 8),
    a < b && c <= 8,
];

//! test[12] lints invalid mixtures of bitwise, comparison, & relational operators

exports.opps = [
    5 & 6 | 6,
    5 & 6 === 4,
    5 instanceof Number === 'a' instanceof String,
    5 !== 6 === 7 !== 8,
];

//! test[0] lints valid mixtures of logical & coalesce operators

const k = 5;

exports.opps = [
    (k && 6) || 7,
];

//! test[2] lints invalid mixtures of logical & coalesce operators

const [x, y, z] = [5, 6, 7];

exports.opps = [
    x && y || z,
];