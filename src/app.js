const express = require('express')
const fs = require('fs')


const app = express()
app.get('', function(req, resp) {
    fs.readFile('index.html', function(err, data) {
        resp.send(data.toString())
    })
})

app.get('/app/todo', function(req, resp) {    //function(req,resp) is the callback that needs to be invoked when the url has been hit
    var x = fs.readFileSync("todos.json").toString()
//    if(x === ""){
//        x = ('{"key1" : "Empty"}');
//    }
    resp.send(JSON.parse(x))
    
})

app.get('/app/todo/add',function(req,resp){
    console.log(req.query)         // req.query checks if there are any query params in the url 
//    req.query.

    if(typeof(req.query.todoname) != undefined && req.query.todoname != ""){       // todoname is the parametre(that we decided) that should be in the request url, ..think of it as key in key value pairs
        var todo_Name = req.query.todoname    
        var array = todo_Name.split("-->")
        console.log(array)
        var key = array[0].toString()
        console.log(key,array[1].toString())
        
//        resp.send(todo_Name)
        fs.readFile("todos.json",function(err,TodosData){
            
            var todo_list_data = JSON.parse(TodosData)
            todo_list_data[key].push(array[1].toString());
            /*
            todo_list_data.array[0].push(array[1])
*/
            fs.writeFile("todos.json",JSON.stringify(todo_list_data),function(err,data){
                resp.send("Added new todo data"+JSON.stringify(todo_Name))      
            })  
        })

    }
    else{
        resp.status().send("Invalid todoname data")
    }  
})



app.listen(3000, function() {
    console.log("Server Started")
})