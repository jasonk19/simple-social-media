import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Routing } from "./routing";
import "./App.css";

function App() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Router>
        <Routes>
          {Routing.map((route) => {
            const Component = route.component;
            return (
              <Route
                caseSensitive
                path={route.path}
                key={route.path}
                element={<Component />}
              />
            );
          })}
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
