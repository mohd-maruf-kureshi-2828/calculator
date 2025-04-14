const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
const bgVideo = document.getElementById('bgVideo');

bgVideo.addEventListener('ended', () => {
  bgVideo.currentTime = 0;
  bgVideo.play();
});

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
        // Check: Only valid characters allowed
        if (!/^[0-9+\-*/.() ]+$/.test(currentInput)) {
          display.textContent = "Invalid Input";
          currentInput = "";
          return;
        }

        // Check: Ends with valid character (not operator)
        if (/[+\-*/.]$/.test(currentInput)) {
          display.textContent = "Syntax Error";
          currentInput = "";
          return;
        }

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
