import { use, useState } from "react";

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

  return (
    <div className="base-content">
      <div className="battle-tracker">
        <h1>BattleTracker</h1>
        <Form onAddMonsters={handleAddMonster} />
        <TrackerContet monsters={monsters} />
      </div>
    </div>
  );
}

function Form({ onAddMonsters }) {
  const [name, setName] = useState("");
  const [init, setInit] = useState("");
  const [hp, setHp] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const id = crypto.randomUUID();
    const newMonster = {
      name,
      init,
      hp,
      id,
    };

    onAddMonsters(newMonster);
    setName("");
    setInit("");
    setHp("");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          name="init"
          value={init}
          onChange={(e) => setInit(Number(e.target.value))}
        />
        <input
          type="text"
          name="hp"
          value={hp}
          onChange={(e) => setHp(Number(e.target.value))}
        />
        <button>Add</button>
      </form>
    </div>
  );
}

function TrackerContet({ monsters }) {
  const sortedMonsters = monsters.sort((a, b) => b.init - a.init);
  return (
    <div>
      {sortedMonsters.map((monster) => (
        <span className="monster">
          <Monster monster={monster} key={monster.id} />
        </span>
      ))}
    </div>
  );
}

function Monster({ monster }) {
  const [name, setName] = useState(monster.name);
  const [init, setInit] = useState(monster.init);
  const [hp, setHp] = useState(monster.hp);
  const [healthModifier, setHealthModifier] = useState(0);

  function handleSubstract() {
    setHp((hp) => hp - healthModifier);
    setHealthModifier(0);
  }

  function handleAdd() {
    setHp((hp) => hp + healthModifier);
    setHealthModifier(0);
  }

  return (
    <div className="monster">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        value={init}
        onChange={(e) => setInit(Number(e.target.value))}
      />
      <input
        type="text"
        value={hp}
        onChange={(e) => setHp(Number(e.target.value))}
      />
      <HealthEvents
        healthModifier={healthModifier}
        setHealthModifier={setHealthModifier}
        onSubstract={handleSubstract}
        onAdd={handleAdd}
      />
    </div>
  );
}

function HealthEvents({
  healthModifier,
  setHealthModifier,
  onSubstract,
  onAdd,
}) {
  return (
    <div>
      <button onClick={onSubstract}>-</button>
      <input
        type="text"
        className="input-monster"
        value={healthModifier}
        onChange={(e) => setHealthModifier(Number(e.target.value))}
      />
      <button onClick={onAdd}>+</button>
    </div>
  );
}

// TODO
// - Delete
// - sort when chaning AFTER added
// - Layout
