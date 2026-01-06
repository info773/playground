import { useState } from "react";

export default function Calculator() {
  const [display, setDisplay] = useState("");

  function handleDelete() {
    setDisplay("");
  }

  function handleBackspace() {
    if (!display) return;
    setDisplay((prev) => prev.slice(0, -1));
  }

  function handleAdd(num) {
    //----------
    // FORBID + AND - INPUT AT SAME TIME!!
    //
    setDisplay((prev) => `${prev}${num}`);
  }

  function handleCalc() {
    setDisplay((prev) => {
      if (!prev.includes("+")) return prev;
      const parts = prev.split("+").map((p) => Number(p.trim()));
      if (parts.some(Number.isNaN)) return prev; // guard bad input
      return String(parts.reduce((a, b) => a + b, 0));
    });
  }

  return (
    <div className="calculator">
      <h1>Calculator</h1>
      <Display display={display} onDisplay={setDisplay} />
      <NumPad onAdd={handleAdd} display={display} />
      <div className="btns">
        <Button onClick={handleDelete}>Delete</Button>
        <Button onClick={handleBackspace}>Back</Button>
        <Button onClick={handleCalc}>Result</Button>
      </div>
    </div>
  );
}

function Display({ display, onDisplay }) {
  return (
    <div>
      <input
        type="text"
        value={display}
        onChange={(e) => onDisplay(e.target.value)}
      />
    </div>
  );
}

function NumPad({ onAdd, display }) {
  let arr = [];

  for (let i = 1; i <= 9; i++) {
    arr.push(i);
  }
  arr.push("+");
  arr.push(0);
  arr.push("-");

  return (
    <div className="num-pad">
      {arr.map((number) => (
        <Number onAdd={onAdd} display={display} key={number}>
          {number}
        </Number>
      ))}
    </div>
  );
}

function Number({ children, onAdd, display }) {
  return <button onClick={() => onAdd(children)}>{children}</button>;
}

function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}
