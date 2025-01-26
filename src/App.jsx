import React, { useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  // for adding
  const AddTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, task]);
    setTask("");
  };
  //for deletion
  const DeleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (

    <div className="h-screen w-screen bg-gray-100 flex flex-col items-center p-6]">
      {/* Header Section*/}
      <div className=" w-full max-w-2xl bg-blue-600 text-white rounded-lg shadow-lg p-4 border-b-[2px] border-blue-500 shadow-lg">
        <h1 className="text-2xl font-bold text-center flex items-center justify-center text-[200%] "><img className="w-24" src="Images\done.png"></img>To-Do List</h1>
      </div>

       {/* Task Adding Section*/}
      <div className="w-full max-w-2xl mt-6">
        <div className="flex gap-4">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 text-black border-blue-500"
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
          tasks.map((t, index) => (
            <li
              key={index}
              className="flex justify-between items-center px-4 py-3 hover:bg-gray-100 text-black"
            >
               <span className="flex-1 break-words">{t}</span>
              <button onClick={() => DeleteTask(index)}  className="text-white bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none">Delete</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;
