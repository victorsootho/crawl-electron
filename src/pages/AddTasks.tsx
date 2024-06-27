import TaskForm from "../components/TaskForm";

function AddTasks() {
  // Todays date in british format
  const todayDate = new Date().toLocaleDateString("en-GB");

  return (
    <div>
      <h1>Todays&#39;s is date is {todayDate}</h1>
      <h3>Time Started today</h3>
      <TaskForm />
    </div>
  );
}

export default AddTasks;
