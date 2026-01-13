import { useState } from "react";
import { Form } from "./Form";
import { TrackerContet } from "./TrackerContet";

export default function BattleTracker() {
  const [monsters, setMonsters] = useState([]);

  function handleAddMonster(newMonster) {
    setMonsters((monsters) => [...monsters, newMonster]);
  }

  function handleDeleteMonster(id) {
    setMonsters((monsters) => monsters.filter((monster) => monster.id !== id));
  }

  function handleUpdateMonster(id, updates) {
    setMonsters((monsters) =>
      monsters.map((monster) =>
        monster.id === id ? { ...monster, ...updates } : monster
      )
    );
  }

  return (
    <div className="base-content">
      <div className="battle-tracker">
        <h1>BattleTracker</h1>
        <Form onAddMonsters={handleAddMonster} />
        <TrackerContet
          monsters={monsters}
          onDeleteMonster={handleDeleteMonster}
          onUpdateMonster={handleUpdateMonster}
        />
      </div>
    </div>
  );
}
