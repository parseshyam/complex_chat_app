var generateMessage = (from,text) => {
    return {
        from : from,
        text : text,
        createAt : new Date().getTime()
    };
};

module.exports = {generateMessage};