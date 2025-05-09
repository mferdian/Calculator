let runningTotal = 0;
    let buffer = "0";
    let previousOperator = null;
    let resetBuffer = false;

    const screen = document.getElementById('screen');

    function buttonClick(value) {
      if (isNaN(value) && value !== '.') {
        handleSymbol(value);
      } else {
        handleNumber(value);
      }
      screen.innerText = buffer;
    }

    function handleSymbol(symbol) {
      switch (symbol) {
        case 'C':
          buffer = '0';
          runningTotal = 0;
          previousOperator = null;
          break;
        case '=':
          if (previousOperator === null) return;
          if (previousOperator === '/' && parseFloat(buffer) === 0) {
            buffer = 'Error';
            runningTotal = 0;
            previousOperator = null;
            return;
          }
          flushOperation(parseFloat(buffer));
          previousOperator = null;
          buffer = runningTotal.toString();
          runningTotal = 0;
          resetBuffer = true;
          break;
        case 'back':
          if (buffer.length === 1 || (buffer.length === 2 && buffer.startsWith('-'))) {
            buffer = '0';
          } else {
            buffer = buffer.slice(0, -1);
          }
          break;
        case '+':
        case '-':
        case '*':
        case '/':
          handleMath(symbol);
          break;
        case '.':
          if (!buffer.includes('.')) {
            buffer += '.';
          }
          break;
      }
    }

    function handleMath(symbol) {
      if (buffer === '0' && runningTotal === 0) return;

      const floatBuffer = parseFloat(buffer);

      if (runningTotal === 0) {
        runningTotal = floatBuffer;
      } else {
        flushOperation(floatBuffer);
      }

      previousOperator = symbol;
      resetBuffer = true;
    }

    function flushOperation(floatBuffer) {
      switch (previousOperator) {
        case '+':
          runningTotal += floatBuffer;
          break;
        case '-':
          runningTotal -= floatBuffer;
          break;
        case '*':
          runningTotal *= floatBuffer;
          break;
        case '/':
          runningTotal /= floatBuffer;
          break;
      }
    }

    function handleNumber(numberString) {
      if (resetBuffer) {
        buffer = numberString;
        resetBuffer = false;
      } else {
        buffer = buffer === "0" ? numberString : buffer + numberString;
      }
    }

    function init() {
      document.querySelectorAll('.calc-button').forEach(button => {
        button.addEventListener('click', event => {
          buttonClick(event.target.value);
        });
      });
    }

    init();