var expect = require('expect');
var {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage',() => {
    it('should generate correct message object', () => {
        var from = 'shyam';
        var text =' hey dude';
        var message = generateMessage(from,text);
        expect(message.createAt).toBeA('number');
        expect(message).toInclude({from,text});
    });
});

describe('generateLocationMessage',() => {
    it('should generate correct location object',()=>{
        var from = ' shyam';
        var latitude = 15;
        var longitude = 13;
        var url = 'https://www.google.com/maps?q=15,13';
        var message = generateLocationMessage(from,latitude,longitude);
        expect(message.createAt).toBeA('number');
        expect(message).toInclude({from,url});
    });
})