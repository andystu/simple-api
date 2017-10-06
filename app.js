var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');
var app = express();
var students = [];
app.use(bodyParser());

app.listen(8000, ()=>{
	console.log('Server started!');
});

app.get('/', (req,res)=>{
    res.send('Hello');
});

app.get('/students',(req,res)=>{
    var sortBy = req.query.sortBy;
    if(sortBy=='firstName'){
        students = _.sortBy(students, ['firstName'])
    }else if(sortBy == 'lastName'){
        students = _.sortBy(students, ['lastName'])        
    }
    res.send(students);
});

app.post('/students', (req, res)=>{
    var id = req.body.id;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    arr = _.filter(students,{id: id});
    if(arr.length > 0){
        throw new Error('ID exists! Whoops!');
    }
    students.push({
        id:id,
        firstName:firstName,
        lastName:lastName
    });
    res.send(students);
})

app.delete('/students', (req, res)=>{
    var id = req.body.id;
    arr = _.filter(students,{id: id});
    if(arr.length == 0){
        throw new Error('ID dose not exist!');
    }
    _.remove(students, (s)=>{ 
        return s.id == id
    });
    res.send(students);
})