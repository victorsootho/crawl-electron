import { HashRouter, Link, Route, Routes } from "react-router-dom";
import AddTasks from "./pages/AddTasks";
import PreviousTasks from "./pages/PreviousTasks";
import Summary from "./pages/Summary";

function App() {
  return (
    <HashRouter>
      <div>
        <div>
          <nav className="bg-blue-200 py-2">
            <ul className="flex gap-4">
              <li>
                <Link to="/add-tasks">Today's Tasks</Link>
              </li>
              <li>
                <Link to="/previous-tasks">Previous Tasks</Link>
              </li>
              <li>
                <Link to="/summary">Summary</Link>
              </li>
            </ul>
          </nav>
        </div>
        <Routes>
          <Route path="/add-tasks" Component={AddTasks} />
          <Route path="/previous-tasks" Component={PreviousTasks} />
          <Route path="/summary" Component={Summary} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
