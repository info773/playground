export function HealthEvents({
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
