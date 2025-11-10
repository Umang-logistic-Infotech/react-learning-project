const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
        process.exit(1);
    }
    console.log('Connected to the MySQL database');
});

app.get('/', (req, res) => {
    return res.send("Backend is connected and database is accessible!"+ process.env.DB_NAME);
});

app.get('/users', (req, res) => {
    const sql="select * from users";
    db.query(sql,(err,data)=>{
          if(err) return res.json(err);
          return res.json(data);
    })
  });

app.get('/api/users/:id', (req, res) => {
  const sql = 'select name,password from users where id='+req.params.id;
  db.query(sql,(err,data)=>{
      if(err) {return res.json(err)};

     if (data.length === 0) {
      return res.status(401).json({ message: 'Unauthorized' }); 
    }else{
      return res.status(200).json({message : 'success',data,access_token:'hjdsdjndbyusdbjsdbsaidjsdbsadsduy'});
    }      
    })
});


app.post('/authorize', (req, res) => {
  const sql = `select * from users where email='${req.body.email}' AND password='${req.body.password}'`;
  db.query(sql,(err,data)=>{
      if(err) {return res.json(err)};

     if (data.length === 0) {
      return res.status(200).json({ message: 'Unauthorized' }); 
    }else{
      return res.status(200).json({message : 'success',data,access_token:'hjdsdjndbyusdbjsdbsaidjsdbsadsduy'});
    }      
    })
});

app.post('/register', (req, res) => {
  const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const insertSql = `INSERT INTO users (name, email, password) VALUES ('${name}', '${email}', '${password}')`;

    db.query(insertSql, (err, data) => {
      if (err) return res.status(500).json({ message: 'Database error', error: err });

      return res.status(201).json({ message: 'User registered successfully' });
  });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
