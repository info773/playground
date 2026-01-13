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

function TrackerContet({ monsters, onDeleteMonster, onUpdateMonster }) {
  const [sortBy, setSortBy] = useState("dec");

  const sortedMonsters = [...monsters].sort((a, b) =>
    sortBy === "dec"
      ? b.init - a.init
      : sortBy === "inc"
      ? a.init - b.init
      : sortBy === "name-az"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  );

  return (
    <div>
      <Sorting sortBy={sortBy} setSortBy={setSortBy} />
      {sortedMonsters.map((monster) => (
        <span className="monster">
          <Monster
            monster={monster}
            key={monster.id}
            onDeleteMonster={onDeleteMonster}
            onUpdateMonster={onUpdateMonster}
          />
        </span>
      ))}
    </div>
  );
}

function Monster({ monster, onDeleteMonster, onUpdateMonster }) {
  const [healthModifier, setHealthModifier] = useState(0);

  function handleSubstract() {
    onUpdateMonster(monster.id, { hp: monster.hp - healthModifier });
    setHealthModifier(0);
  }

  function handleAdd() {
    onUpdateMonster(monster.id, { hp: monster.hp + healthModifier });
    setHealthModifier(0);
  }

  return (
    <div className="monster">
      <DeleteButton monsterId={monster.id} onDeleteMonster={onDeleteMonster} />
      <input
        type="text"
        value={monster.name}
        onChange={(e) => onUpdateMonster(monster.id, { name: e.target.value })}
      />
      <input
        type="text"
        value={monster.init}
        onChange={(e) =>
          onUpdateMonster(monster.id, { init: Number(e.target.value) })
        }
      />
      <input
        type="text"
        value={monster.hp}
        onChange={(e) =>
          onUpdateMonster(monster.id, { hp: Number(e.target.value) })
        }
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

function DeleteButton({ onDeleteMonster, monsterId }) {
  return <button onClick={() => onDeleteMonster(monsterId)}>❌</button>;
}
// TODO
// How to structure Components better with children prop?
// change init - only one letter at a time
// - Layout
// Left of -> SortBy TrackerContent

function Sorting({ sortBy, setSortBy }) {
  return (
    <div>
      <select
        id="sorting"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="dec">decreasing</option>
        <option value="inc">increeasing</option>
        <option value="name-az">name (A-Z)</option>
        <option value="name-za">name (Z-A)</option>
      </select>
    </div>
  );
}

// How to make select a controlled element?
