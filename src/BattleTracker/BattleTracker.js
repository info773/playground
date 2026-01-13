import { useState } from "react";
import { Form } from "./Form";
import { TrackerContet } from "./TrackerContet";

const startingMonsters = [
  {
    name: "Bandit",
    init: 18,
    hp: 35,
    id: 1,
  },
  {
    name: "Dragon",
    init: 22,
    hp: 155,
    id: 2,
  },
  {
    name: "Goblin",
    init: 14,
    hp: 20,
    id: 3,
  },
];

export default function BattleTracker() {
  const [monsters, setMonsters] = useState(startingMonsters);

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
