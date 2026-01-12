import { useState } from "react";
import Calculator from "./Calculator/calculator.js";
import BattleTracker from "./BattleTracker/BattleTracker.js";

export default function App() {
  const [activeProject, setActiveProject] = useState("None");

  return (
    <div className="projects">
      <div className="btns-project">
        {/* Start Buttons */}
        <Button
          setActiveProject={setActiveProject}
          activeProject={activeProject}
        >
          None
        </Button>
        <Button
          setActiveProject={setActiveProject}
          activeProject={activeProject}
        >
          Calculator
        </Button>
        <Button
          setActiveProject={setActiveProject}
          activeProject={activeProject}
        >
          BattleTracker
        </Button>
      </div>

      {/* Start Content */}
      {activeProject === "None" && (
        <div className="base-content">
          <h1>No Project Active</h1>
        </div>
      )}
      {activeProject === "Calculator" && <Calculator />}
      {activeProject === "BattleTracker" && <BattleTracker />}
    </div>
  );
}

function Button({ children, setActiveProject, activeProject }) {
  return (
    <button
      onClick={() => setActiveProject(String(children))}
      className={activeProject === children ? "btn-active" : null}
    >
      {children}
    </button>
  );
}
