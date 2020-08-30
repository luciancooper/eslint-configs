//! test[0] Valid Mixed Operators (Arithmetic)

exports.opps = [
    1 + 2 - 3 * 4 / 5,
    (2 ** 2) - 5,
    5 * (2 ** 2),
    (2 ** 2) % 5,
    5 + (3 % 2),
    (3 % 2) / 5,
];

//! test[10] Invalid Mixed Operators (Arithmetic)

exports.opps = [
    2 ** 2 - 5,
    5 * 3 / 2 ** 2,
    2 ** 2 % 5,
    5 + 3 % 2,
    3 % 2 / 5,
];

//! test[0] Valid Mixed Operators (Bitwise, Comparison, & Relational)

exports.opps = [
    (5 & 6) | 6,
    (5 & 6) === 4,
    (5 instanceof Number) === ('a' instanceof String),
    (5 !== 6) === (7 !== 8),
    5 < 6 && 7 <= 8,
];

//! test[12] Invalid Mixed Operators (Bitwise, Comparison, & Relational)

exports.opps = [
    5 & 6 | 6,
    5 & 6 === 4,
    5 instanceof Number === 'a' instanceof String,
    5 !== 6 === 7 !== 8,
];

//! test[0] Valid Mixed Operators (Logical & Coalesce)

exports.opps = [
    (5 && 6) || 7,
];

//! test[2] Invalid Mixed Operators (Logical & Coalesce)

exports.opps = [
    5 && 6 || 7,
];