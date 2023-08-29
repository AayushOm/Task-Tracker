import Header from "./components/Header";
import Tasks from './components/Tasks'
import { useState,useEffect } from 'react'
import Addtask from "./components/Addtask";



function App() {
  const [showaddtask,setShowaddtask]=useState(false)

  const [tasks,setTasks]=useState([])

  useEffect(()=>{
    const getdata=async()=>{
      const ans=await Fetchdata()
      setTasks(ans)
    }
    getdata()
  },[])

  const Fetchdata=async()=>{
    const res=await fetch("http://localhost:5000/tasks")
    const data=await res.json()
    return data
}

const addtask=(task)=>{
  const id=Math.floor(Math.random()*10000)+1 
  const newTask={id,...task}
  setTasks([...tasks,newTask])
}

const deletetask=async(id)=>{
  await fetch(`http://localhost:5000/tasks/${id}`,{method:"DELETE",})

  setTasks(tasks.filter((task)=>task.id!==id))
}

const togglereminder=(id)=>{
  setTasks(tasks.map((task)=>task.id===id?{...task,reminder:!task.reminder}:task))
}

  return (
    <div className="container">
      <Header showadd={showaddtask} onAddtask={()=>{setShowaddtask(!showaddtask)}}/>
      {showaddtask && <Addtask onAdd={addtask} setTasks={setTasks}/>}
      {tasks.length>0?<Tasks tasks={tasks} onDelete={deletetask} onToggle={togglereminder}/>:"No Task to show"}
      

    </div>
  );
}

export default App;
