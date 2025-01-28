import React, { useState, useEffect } from "react";
import axios from "axios";
function App() {
  const [taskneym, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  // to load 
  useEffect(() => {
    axios.get('http://localhost:3000/task')
    .then((response) => {
      setTasks(response.data);
    })
    .catch((error) => console.error('Error Loading Task',error));
  },[]);
 // for adding
 const AddTask = () => {
  if (taskneym) {
      axios.post('http://localhost:3000/task', { taskName: taskneym })
          .then((response) => {
             
              setTasks([...tasks, response.data]); //add the data to the array
              setTask('');  // Clear the input field
          })
          .catch((error) => {
              console.error("Error Adding:", error);
          });
  }
};
  //for deletion in database
  const DeleteTask = (id) => {
    axios.delete(`http://localhost:3000/task/${id}`)
        .then((response) => {
            setTasks(tasks.filter((task) => task.TaskID !== id));//filter delete by id
        })
        .catch((error) => console.error('Error deleting task:', error));
};

  return (
    <div className="h-screen w-screen bg-gray-100 flex flex-col items-center p-6">
      {/* Header Section*/}
      <div className=" w-full max-w-2xl bg-blue-600 text-white rounded-lg shadow-lg p-4 border-b-[2px] border-blue-500">
        <h1 className="font-bold text-center flex items-center justify-center text-[200%] "><img className="w-24" src="Images\done.png"></img>To-Do List</h1>
      </div>

       {/* Task Adding Section*/}
      <div className="w-full max-w-2xl mt-6">
        <div className="flex gap-4">
          <input
            type="text"
            value={taskneym}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add a new task..."
          className="flex-1 px-4 py-2 border rounded-lg shadow-sm  text-black border-gray-500"
          />
          <button
            onClick={AddTask}
            className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700"
          >
            Add
          </button>
        </div>
      </div>

        {/* Task List and Deletion Section*/}
      <ul className="w-full max-w-2xl mt-6 bg-white rounded-lg shadow-lg divide-y">
        {tasks.length === 0 ? (<p className="text-center p-4 text-gray-500">No tasks yet</p>) : (
            tasks.map((task) => (
              <li
                key={task.TaskID}
                className="flex justify-between items-center px-4 py-3 hover:bg-gray-100 text-black"
                >
                 <span className="flex-1 break-words">{task.TaskName}</span>
                <button onClick={() => DeleteTask(task.TaskID)}  className="text-white bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none">Delete</button>
              </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;
