import { HashRouter, Link, Route, Routes } from "react-router-dom";
import AddTasks from "./pages/AddTasks";
import PreviousTasks from "./pages/PreviousTasks";
import Summary from "./pages/Summary";

function App() {
  return (
    <HashRouter>
      <div className="">
        <h1>Welcome Back to Crawl</h1>
        <nav>
          <ul>
            <li>
              <Link to="/add-tasks">Add Today's Tasks</Link>
            </li>
            <li>
              <Link to="/previous-tasks">Previous Tasks</Link>
            </li>
            <li>
              <Link to="/summary">Summary</Link>
            </li>
          </ul>
        </nav>
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
