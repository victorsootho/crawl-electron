import { HashRouter, Link, Route, Routes } from "react-router-dom";
import AddTasks from "./pages/AddTasks";
import PreviousTasks from "./pages/PreviousTasks";
import Summary from "./pages/Summary";

function App() {
  return (
    <HashRouter>
      <div>
        <div>
          <nav className="bg-blue-100 py-2">
            <ul className="flex gap-4">
              <li>
                <Link
                  className="bg-blue-300 rounded  py-2 px-3"
                  to="/add-tasks"
                >
                  Today's Tasks
                </Link>
              </li>
              <li>
                <Link
                  className="bg-blue-300 rounded  py-2 px-3"
                  to="/previous-tasks"
                >
                  Previous Tasks
                </Link>
              </li>
              <li>
                <Link className="bg-blue-300 rounded  py-2 px-3" to="/summary">
                  Summary
                </Link>
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
