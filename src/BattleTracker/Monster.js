import { useState } from "react";
import { DeleteButton } from "./DeleteButton";
import { HealthEvents } from "./HealthEvents";

export function Monster({ monster, onDeleteMonster, onUpdateMonster }) {
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
