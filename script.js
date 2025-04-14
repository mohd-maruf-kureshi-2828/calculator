const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
const bgVideo = document.getElementById('bgVideo');

bgVideo.addEventListener('ended', () => {
  bgVideo.currentTime = 0;
  bgVideo.play();
});

let currentInput = "";
let resetNext = false;

// Shake effect on invalid input
function triggerErrorAnimation() {
  display.classList.add("error-shake");
  setTimeout(() => display.classList.remove("error-shake"), 500);
}

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
        // Validation: only numbers, operators and brackets allowed
        if (!/^[0-9+\-*/.() ]+$/.test(currentInput)) {
          triggerErrorAnimation();
          return;
        }

        // Validation: input should not end with operator
        if (/[+\-*/.]$/.test(currentInput)) {
          triggerErrorAnimation();
          return;
        }

        // Validation: no multiple operators in a row
        if (/[\+\-\*\/\.]{2,}/.test(currentInput)) {
          triggerErrorAnimation();
          return;
        }

        const result = eval(currentInput);

        if (isFinite(result)) {
          currentInput = result.toString();
          display.textContent = currentInput;
          resetNext = true;
        } else {
          triggerErrorAnimation();
        }

      } catch {
        triggerErrorAnimation();
      }
    } 
    
    else {
      const lastChar = currentInput.slice(-1);
      const operators = "+-*/.";

      if (resetNext) {
        if (!isNaN(value) || value === ".") {
          currentInput = value;
        } else {
          currentInput += value;
        }
        resetNext = false;
      } else {
        // Avoid duplicate operators
        if (operators.includes(value) && operators.includes(lastChar)) {
          triggerErrorAnimation();
          return;
        }
        currentInput += value;
      }

      display.textContent = currentInput;
    }
  });
});
