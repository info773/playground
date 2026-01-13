import { useState } from "react";

export function Form({ onAddMonsters }) {
  const [name, setName] = useState("");
  const [init, setInit] = useState("");
  const [hp, setHp] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    setInit((prev) => Number(prev));
    setHp((prev) => Number(prev));

    if (isNaN(init) && isNaN(hp)) {
      alert("Initiative AND Hitpoints must be a number each");
      setInit("");
      setHp("");
      return;
    }

    if (isNaN(init)) {
      alert("Initiative must be a number");
      setInit("");
      return;
    }
    if (isNaN(hp)) {
      alert("Hitpoints must be a number");
      setHp("");
      return;
    }

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
            onChange={(e) => setInit(e.target.value)}
          />
        </div>
        <div>
          <p>Hitpoints:</p>
          <input
            type="text"
            name="hp"
            value={hp}
            onChange={(e) => setHp(e.target.value)}
          />
        </div>
        <button className="battletracker-btn-form">Add</button>
      </form>
    </div>
  );
}
