import express from 'express';
import sql from 'mysql2';
import cors from 'cors';

const exp = express();
exp.use(cors()); 
exp.use(express.json());
//for my database connection
const database = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dblist',
});

//to know if db has connected or not.
database.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to the MySQL database.');
    }
});
//route to load data from db
exp.get('/task',(req, res) => {
   let sql = "Select * from task";
  database.query(sql, (err,results) =>{
    err ? res.status(500).send(err) : res.json(results);
  });

});
//route for insertion in db
exp.post('/task', (req, res) => {
    const { taskName } = req.body;
    if (!taskName) { //if empty return or send the bad request error alongside with message
        return res.status(400).send({ message: 'Input Task Name' });
    }
    let sql = "Insert into task(TaskName) VALUE(?)";
    database.query(sql, [taskName], (err, results) => {
        if (err) {
            return res.status(500).send(err);//return error message.
        }
        //send the details.
        res.status(201).send({ TaskID: results.insertId, TaskName: taskName });
    });
});

//route for deletion of adta in db
exp.delete('/task/:id',(req,res) =>{
  const {id} = req.params; //req params is the id in the url 
  let sql = "Delete from task where TaskID = ?";
   database.query(sql,[id], (err,results) =>{// return or send the error  or send the message if succesfull
    err ? res.status(500).send(err) : res.send({message:'Task Deleted'});
  });

})
//for server
exp.listen(3000,() => {
    console.log(`Server running on http://localhost:3000}`);
});


