import { useState } from "react";

export default function Calculator() {
  const [display, setDisplay] = useState("");
  const [isOpen, setIsOpen] = useState(true);

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
    // ONLY 1 OPERATOR
    //

    setDisplay((prev) => `${prev}${num}`);
  }

  function handleCalc() {
    if (
      display.split("").filter((item) => item === "+" || item === "-").length >=
      2
    ) {
      alert("Only 1 Operator allowed");
      return;
    }

    if (isNaN(Number(display))) {
      alert("Invalid input");
      return;
    }

    setDisplay((prev) => {
      if (prev.includes("+")) {
        const nums = prev.split("+").map((part) => Number(part.trim()));
        if (nums.some((n) => Number.isNaN(n))) return alert("Invalid input");
        return String(nums.reduce((a, b) => a + b, 0));
      }

      if (prev.includes("-")) {
        const nums = prev.split("-").map((part) => Number(part.trim()));
        if (nums.some((n) => Number.isNaN(n))) return alert("Invalid input");
        return String(nums.reduce((a, b) => a - b));
      }

      if (prev.includes("/")) {
        const nums = prev.split("/").map((part) => Number(part.trim()));
        if (nums.some((n) => Number.isNaN(n))) return alert("Invalid input");
        return nums[0] / nums[1];
      }

      if (prev.includes("*")) {
        const nums = prev.split("*").map((part) => Number(part.trim()));
        if (nums.some((n) => Number.isNaN(n))) return alert("Invalid input");
        return nums[0] * nums[1];
      }

      if (prev.includes("%")) {
        const nums = prev.split("%").map((part) => Number(part.trim()));
        if (nums.some((n) => Number.isNaN(n))) return alert("Invalid input");
        return nums[0] % nums[1];
      }

      alert("No Operator?");
      return prev;
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    handleCalc();
  }

  return (
    <div className="base-content">
      <div className="calculator">
        <h1>Calculator</h1>
        <button className="close-btn" onClick={() => setIsOpen(!isOpen)}>
          ❌
        </button>
        {isOpen && (
          <div className="content">
            <Display
              display={display}
              onDisplay={setDisplay}
              onSubmit={handleSubmit}
            />
            <NumPad onAdd={handleAdd} display={display} />
            <div className="btns">
              <Button onClick={handleDelete}>Delete</Button>
              <Button onClick={handleBackspace}>Back</Button>
              <Button onClick={handleCalc}>Result</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Display({ display, onDisplay, onSubmit }) {
  return (
    <div className="display">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={display}
          onChange={(e) => onDisplay(e.target.value)}
        />
      </form>
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
  arr.push("/");
  arr.push("*");
  arr.push("%");

  return (
    <div className="num-pad">
      {arr.map((number) => (
        <DigitButton onAdd={onAdd} display={display} key={number}>
          {number}
        </DigitButton>
      ))}
    </div>
  );
}

function DigitButton({ children, onAdd, display }) {
  const value = String(children);
  return <button onClick={() => onAdd(value)}>{children}</button>;
}

function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}
