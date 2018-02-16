module.exports = {
    get: plain => {
        return plain;
    },

    isValid: (plain, hash) => {
        return plain === hash;
    },
};