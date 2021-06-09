function resolveCheck(module) {
    try {
        require.resolve(module);
        return true;
    } catch (e) {
        return false;
    }
}

module.exports = {
    resolveCheck,
};