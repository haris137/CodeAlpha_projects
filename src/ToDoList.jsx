import React, {useState} from "react";

export default function ToDoList() {
    const [task,setTask]=useState([])
    const [newTask,setNewTask]=useState("");
    const [isShown, setIsShown] = useState(false); // State to toggle the "show" className
    const [message,setMessage]=useState("")

    function handleInputChange(e){
        setNewTask(e.target.value);
    }
    function addTask(e){
        if(newTask.trim() !== ""){
            setTask(t=>[...t,newTask])
            setNewTask("")
            setMessage("Task added successfully!")
            setTimeout(()=>{
                setMessage("")
            },2500)
        }
    }
    function deleteTask(index){
        const updateTask=task.filter((_,i)=>i!==index)
        setTask(updateTask)
    }
    function moveUp(index){
        if(index>0){
            const updateTask=[...task];
            [updateTask[index],updateTask[index-1]] = [updateTask[index-1],updateTask[index]]
            setTask(updateTask)
        }
    }
    function moveDown(index){
        if(index < task.length-1){
            const updateTask=[...task];
            [updateTask[index],updateTask[index+1]] = [updateTask[index+1],updateTask[index]]
            setTask(updateTask)
        }
    }
    function showInputContainer() {
        setIsShown(prev => !prev); // Toggle the state
    }

    return(
        <>
            <p className="top-heading">Welcome Back👋</p>

            <div className="container">
                {isShown &&  (<div className="input-container">
                    <input
                        type="text" 
                        value={newTask} 
                        className="input-task" 
                        placeholder="Add task..."
                        onChange={handleInputChange}/>
                    <button className="add-task-btn" onClick={addTask}>Add</button>
                    {message && <p className="doneTask">{message}</p>}
                </div>)}

                <div className="task-container">
                    <ol>{task.map((el,index)=><li key={index}>
                        <span className="task">{el}</span>
                        <button className="del-task-btn" onClick={()=>deleteTask(index)}>Delete</button>
                        <button className="move-up-btn" onClick={()=>moveUp(index)}><i className="fa-solid fa-circle-up"></i></button>
                        <button className="move-down-btn" onClick={()=>moveDown(index)}><i className="fa-solid fa-circle-down"></i></button>
                    </li>)}</ol>
                </div>

                <button className="plus" onClick={showInputContainer}><i className="fa-solid fa-plus"></i></button>
            </div>
        </>
    )
};
