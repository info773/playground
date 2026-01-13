import { useState } from "react";

export function Form({ onAddMonsters }) {
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
      <form onSubmit={handleSubmit} className="form-battletracker">
        <div>
          <p>Name:</p>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <p>Initiative:</p>
          <input
            type="text"
            name="init"
            value={init}
            onChange={(e) => setInit(Number(e.target.value))}
          />
        </div>
        <div>
          <p>Hitpoints:</p>
          <input
            type="text"
            name="hp"
            value={hp}
            onChange={(e) => setHp(Number(e.target.value))}
          />
        </div>
        <button className="battletracker-btn-form">Add</button>
      </form>
    </div>
  );
}
