// Function to get the values of num1 and num2 from input fields
function getNumbers()
{
   const num1 = parseFloat(document.getElementById("num1").value);
   const num2 = parseFloat(document.getElementById("num2").value);
   return { num1, num2 };
}

// Attach the function to the button's click event
const calculateBtn = document.getElementById("calculateBtn");
const canvas = document.getElementById("canvas");
const context = canvas.getContext('2d');

// Set the canvas size
canvas.width = 800;
canvas.height = 800;

// Draw a black square
context.fillStyle = 'black';
context.fillRect(0, 0, canvas.width, canvas.height);

(() => {

   calculateBtn.addEventListener("click", () => {

      const { num1, num2 } = getNumbers();

      WebAssembly.instantiateStreaming(fetch('/wasm.wasm')).then(w0 => {
      const w = w0.instance.exports;

      // Call the 'adder' function and get the result
      const result = w.adder(num1, num2);
      console.log(result);

      // Display the result on the canvas
      context.fillStyle = 'white'; // Set the fill color to white
      context.font = '24px Arial';
      context.textAlign = 'center'; // Center the text horizontally
      context.textBaseline = 'middle'; // Center the text vertically
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      context.fillText(`Result: ${result}`, centerX, centerY);
       });

   });

})();
