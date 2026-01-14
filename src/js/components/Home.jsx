import { useState } from "react";

const Home = () => {
	const [tasks, setTasks] = useState([]);
	const [newTask, setNewTask] = useState("");

	const addTask = (taskText) => {
		if (taskText.trim() === "") return;
		setTasks([...tasks, { id: tasks.length + 1, task: taskText }]);
		setNewTask("");
	};

	const deleteTask = (id) => {
		setTasks(tasks.filter((t) => t.id !== id));
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
							<span className="task-text">{t.task}</span>
							<button
								className="delete-btn"
								onClick={() => deleteTask(t.id)}
							>
								×
							</button>
						</li>
					))}
				</ul>
				<div className="task-footer"> {tasks.length} tareas </div>
			</div>
		</div>
	);
};

export default Home;
