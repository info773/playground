export function DeleteButton({ onDeleteMonster, monsterId }) {
  return <button onClick={() => onDeleteMonster(monsterId)}>❌</button>;
}
