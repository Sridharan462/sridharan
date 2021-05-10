
import { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import './App.css';
function App(){
    var file_content=[]
    const [File,setFile]=useState('')
    useEffect(()=>{
    fetch("/",{
      method:'post',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        File,
      })
    })
    .then(res=>res.json())
    .then(result=>{
      file_content=result
    })
    })
  return (
    <div className="App">
      <header className="App-header">
        <label>
          Select the CSV File 
        </label>
        <input type="file" value={File} onChange={(e)=>setFile(e.target.value)}/>
        <button>Submit</button>
        {content.map(data=><li key={data.Game_Number}>{data}</li>)}
      </header>
    </div>
  );
}

export default App;
