const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let currentInput = "";
let resetNext = false;

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === "C") {
      currentInput = "";
      display.textContent = "0";
      resetNext = false;
    } 
    
    else if (value === "←") {
      if (!resetNext) {
        currentInput = currentInput.slice(0, -1);
        display.textContent = currentInput || "0";
      }
    } 
    
    else if (value === "=") {
      if (currentInput.trim() === "") return;
      try {
        const result = eval(currentInput);
        if (isFinite(result)) {
          currentInput = result.toString();
          display.textContent = currentInput;
          resetNext = true;
        } else {
          display.textContent = "Math Error";
          currentInput = "";
        }
      } catch {
        display.textContent = "Syntax Error";
        currentInput = "";
      }
    } 
    
    else {
      if (resetNext) {
        // If last was "=", start new expression if number/dot is pressed
        if (!isNaN(value) || value === ".") {
          currentInput = value;
        } else {
          currentInput += value;
        }
        resetNext = false;
      } else {
        currentInput += value;
      }
      display.textContent = currentInput;
    }
  });
});
