const statusDisplay = document.getElementById('display');
const inputElement = document.getElementById('input');
const resultDisplay = document.getElementById('result');
const ball = document.querySelector('.ball');

function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

document.querySelector('.play').onclick = () => {
    ball.classList.add('active');
}

document.querySelector('.stop').onclick = () => {
    ball.classList.remove('active');
}

// Main Thread
document.getElementById('noWorkerBtn').onclick = () => {
    let n = Number(inputElement.value);
    const status = "Main Thread";

    if (inputElement.value === "" || isNaN(n)) {
        statusDisplay.textContent = "Enter a Number.";
        return;
    }
    resultDisplay.textContent = `Result: ${status}`;
    ball.classList.add('active');
    statusDisplay.textContent = "Calculating...";
        
    setTimeout(() => {
        const start = performance.now();
        const result = fibonacci(n);
        const end = performance.now();
        statusDisplay.textContent = `${result}`;
    }, 100);
    
};

// Dedicated Worker
if (window.Worker) {
    const myWorker = new Worker('worker.js'); 
    const status = "Dedicated Worker";

    document.getElementById('workerBtn').onclick = () => {
        const n = Number(inputElement.value);

        if (inputElement.value === "" || isNaN(n)) {
            statusDisplay.textContent = "Enter a Number.";
            return;
        }
        resultDisplay.textContent = `Result: ${status}`;
        ball.classList.add('active');
        statusDisplay.textContent = "Calculating with background thread";
        myWorker.postMessage(n);
    };

    myWorker.onmessage = (e) => {
        statusDisplay.textContent = `${e.data}`;
    };
}