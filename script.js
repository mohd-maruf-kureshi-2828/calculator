const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let currentInput = "";
let resetNext = false;

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    // Clear All
    if (value === "C") {
      currentInput = "";
      display.textContent = "0";
      return;
    }

    // Backspace
    if (value === "←") {
      currentInput = currentInput.slice(0, -1);
      display.textContent = currentInput || "0";
      return;
    }

    // Equal
    if (value === "=") {
      try {
        const result = Function('"use strict"; return (' + currentInput + ')')();
        if (!isFinite(result)) throw "Math Error";
        currentInput = result.toString();
        display.textContent = currentInput;
        resetNext = true;

        // Add animation class
        button.classList.add("pressed");
        setTimeout(() => button.classList.remove("pressed"), 150);

      } catch {
        display.textContent = "Error";
        currentInput = "";
      }
      return;
    }

    // Normal Input
    if (resetNext && !isNaN(value)) {
      currentInput = value;
      resetNext = false;
    } else {
      currentInput += value;
    }

    display.textContent = currentInput;
  });
});

// Keyboard Support
document.addEventListener("keydown", (e) => {
  const key = e.key;
  const validKeys = "0123456789+-*/.=EnterBackspace";
  
  if (!validKeys.includes(key)) return;

  let mappedKey = key;
  if (key === "Enter") mappedKey = "=";
  if (key === "Backspace") mappedKey = "←";

  const button = Array.from(buttons).find(b => b.textContent === mappedKey);
  if (button) button.click();
});
