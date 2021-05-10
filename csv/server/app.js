const express=require('express')
const path = require('path')
const router=express.Router() 
const db=require('mysql') 
const app=express()
const PORT=8000;
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
const fs = require("fs");
const csv = require("fast-csv");
var temp=0;
global.__basedir = __dirname + "/..";
var connection = db.createConnection({  
  host: "localhost",  
  user: "root",  
  password: "password",
  database:"csvdatabase"
});  
connection.connect(function(err) {  
  if (err) throw err;  
  console.log("Connected to MySQL Datebase");  
});  
router.post('/',function(req,res)
{
  if (req.body.file.length>=1){
    let file_path =  __dirname+"\\"+req.body.file.split('\\')[2];
    fs.createReadStream(file_path)
      .pipe(csv.parse({ headers: true }))
      .on("error", (error) => {
        throw error.message;
      })
      
      .on("data", (r) => {
        const keys = Object.keys(r);
        if (temp==0)
        {
          console.log(keys[0],keys[1]);
          var sql = "create table if not exists csv_datatable(Game_Number varchar(150),Game_Length varchar(150))";
          con.query(sql,function (err, result) {
            if (err) throw err;
          });
          temp=1;
        }
        else
        {
          var sql="insert into csv_datatable values (?,?)"
          con.query(sql,[row[keys[0]],row[keys[1]]],function (err, result) {
            if (err) throw err;
          });
        }
      })
      .on('end', () => {
        console.log("All data Updated in database")
        var sql="select * from csv_datatable"
        con.query(sql,function (err,result)
        {
          if (err) throw err
          console.log(result)
          res.json(result)
        })
      });      
}
})
app.use(router)

app.listen(PORT,()=>{
    console.log("Server on ",PORT); 
 })
