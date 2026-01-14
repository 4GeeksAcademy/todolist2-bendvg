import { useState, useEffect } from "react";

const API_URL = "https://playground.4geeks.com/todo";
const USER = "Benji"; 

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

   
    const loadTasks = () => {
        fetch(`${API_URL}/users/${USER}`)
            .then(async (res) => {
                if (res.status === 404) {
                    
                    await fetch(`${API_URL}/users/${USER}`, {
                        method: "POST"
                    });
                    
                    return loadTasks();
                }
                return res.json();
            })
            .then((data) => {
                if (data && data.items) {
                    setTasks(data.items);
                }
            })
            .catch((err) => console.error("Error cargando usuario:", err));
    };

    
    useEffect(() => {
        loadTasks();
    }, []);

    
    const addTask = (taskText) => {
        if (taskText.trim() === "") return;

        fetch(`${API_URL}/todos/${USER}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ label: taskText })
        })
            .then((res) => res.json())
            .then((newTask) => {
                setTasks([...tasks, newTask]);
                setNewTask("");
            });
    };

    
    const deleteTask = (id) => {
        fetch(`${API_URL}/todos/${id}`, {
            method: "DELETE"
        }).then(() => {
            setTasks(tasks.filter((t) => t.id !== id));
        });
    };

    
    const clearAllTasks = () => {
        Promise.all(
            tasks.map((t) =>
                fetch(`${API_URL}/todos/${t.id}`, { method: "DELETE" })
            )
        ).then(() => setTasks([]));
    };

    return (
        <div className="text-center">
            <h1 className="text-center mt-5">To do!</h1>

            <div className="task-container">
                <ul className="task-list">
                    <li className="task-item">
                        <input
                            type="text"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    addTask(newTask);
                                }
                            }}
                            placeholder="Escribe una tarea y pulsa Enter"
                            className="task-input"
                        />
                    </li>

                    {tasks.map((t) => (
                        <li key={t.id} className="task-item">
                            <span className="task-text">{t.label}</span>
                            <button
                                className="delete-btn"
                                onClick={() => deleteTask(t.id)}
                            >
                                ×
                            </button>
                        </li>
                    ))}
                </ul>

                <div className="task-footer">{tasks.length} tareas</div>

                <button className="btn btn-secondary mt-3" onClick={clearAllTasks}>
                    Borrar todo
                </button>
            </div>
        </div>
    );
};

export default Home;
