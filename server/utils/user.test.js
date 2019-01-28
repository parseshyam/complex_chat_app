const expect = require('expect');

const {Users} = require('./user');

describe('Users',()=>{
    var users ;
    beforeEach (()=>{
        users = new Users();
        users.users = [{
            id :'1',
            name :'shyam1',
            room :'node1'
        },
        {
            id :'2',
            name :'shyam2',
            room :'node2'
        },
        {
            id :'3',
            name :'shyam3',
            room :'node3'
        }];
    });
    it('shuld add new user',()=>{
        var users = new Users();
        var user = {
            id :'123',
            name : 'shyam',
            room :'college group'
        };
        var resUser = users.addUser(user.id,user.name,user.room);
        expect(users.users).toEqual([user]);
    });

    it('should remove a user',()=>{
        
    })

    it('should not remove a user',()=>{
        var userId = '67';
        var user = users.removeUser(userId);

        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it('should find a user',()=>{
        var userId = '2';
        var user = users.getUser(userId);
        expect(user.id).toBe(userId);
    });

    it('should not find a user',()=>{
        var userId = '99';
        var user = users.getUser(userId);
        expect(user).toNotExist();
    });

    it('should return names for test cases',() =>{
        var userList = users.getUserList('node1');
        expect(userList).toEqual(['shyam1']);
    })
})