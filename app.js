// Convert Arabic numerals to English (for calculations)
function arabicToEnglishNumbers(str) {
    const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return str.replace(/[٠-٩]/g, (match) => arabicNumbers.indexOf(match))
              .replace(/÷/g, "/") // Convert ÷ to /
              .replace(/×/g, "*")  // Convert × to *
              .replace(/٪|%/g, "/100"); // Convert % to /100
}

// Convert English numerals to Arabic (for display)
function englishToArabicNumbers(str) {
    const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return str.replace(/\d/g, (match) => arabicNumbers[match]);
}

// Insert numbers into the input field
function btn(e) {    
    document.getElementById("input").value += e;
    liveCalculate(); // Update live result
}

// Live Calculation as User Types
function liveCalculate() {
    const inp = document.getElementById("input");
    // console.log(inp);
    
    const liveResult = document.getElementById("live-result");

    try {
        let converted = arabicToEnglishNumbers(inp.value);
        // console.log(converted);
         // Convert Arabic to English for eval()
        
         if (!/[+\-*/٪]/.test(converted)) {
            liveResult.innerText = englishToArabicNumbers(converted); // If no operator, clear live result
            return;
        }

        // Prevent eval errors with invalid input
        if (converted.match(/[\+\-\*\/]$/)) {
            console.log(converted);
            
            liveResult.innerText = englishToArabicNumbers(converted);
            return;
        }

        let result = eval(converted); // Evaluate the equation
        console.log(result);
        
        
        if (!isNaN(result)) {
            console.log(result);
            
            liveResult.innerHTML = englishToArabicNumbers(result.toString()); // Convert result back to Arabic
        } else {
            liveResult.innerText = "";
        }
    } catch {
        liveResult.innerText = "";
    }
}

// Calculate final result & move to history
function equ() {
    const inp = document.getElementById("input");
    const liveResult = document.getElementById("live-result");
    const history = document.getElementById("history");

    if (inp.value.trim() !== "") {
        history.innerText = inp.value; // Move equation to history
        inp.value = liveResult.innerText; // Set final result
        liveResult.innerText = ""; // Clear live result
    }
}

// Delete last character
function del() {
    const inp = document.getElementById("input");
    inp.value = inp.value.slice(0, -1);
    liveCalculate();
}

// Clear input field
function ac() {
    document.getElementById("input").value = "";
    document.getElementById("live-result").innerText = "";
    document.getElementById("history").innerText = "";
}

// Close/Open Calculator
function Close() { document.querySelector(".calculator").classList.add("active"); }
function Open() { document.querySelector(".calculator").classList.remove("active"); }

// Percentage Calculation (Now Works with Live Update)
function percen() {
    const inp = document.getElementById("input");
    let value = arabicToEnglishNumbers(inp.value);

    if (value && !isNaN(value)) {
        let result = eval(value) / 100; // Convert to percentage
        inp.value = englishToArabicNumbers(result.toString()); // Display Arabic result
        liveCalculate(); // Update live result
    }
}

