import { useState } from "react";
import { Sorting } from "./Sorting";
import { Monster } from "./Monster";

export function TrackerContet({ monsters, onDeleteMonster, onUpdateMonster }) {
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
      {monsters.length !== 0 && (
        <Sorting sortBy={sortBy} setSortBy={setSortBy} />
      )}
      {monsters.length !== 0 ? (
        <div className="monster">
          <span></span>
          <span>Name:</span>
          <span>Init:</span>
          <span>Hp:</span>
        </div>
      ) : null}
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
