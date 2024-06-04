// Defines the functions factorial, binomialCoefficient, and expectedValue for factorial calculations, binomial coefficient calculations, and expected value calculation using the formula discussed earlier
function factorial(n) {
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

function binomialCoefficient(n, k) {
    if (k > n) return 0;
    return factorial(n) / (factorial(k) * factorial(n - k));
}

function expectedValue(N, X) {
    let sum = 0;
    for (let k = X; k <= N; k++) {
        sum += k * binomialCoefficient(k - 1, X - 1);
    }
    return sum / binomialCoefficient(N, X);
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    const resultDiv = document.getElementById('result');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const N = parseInt(document.getElementById('N').value);
        const X = parseInt(document.getElementById('X').value);
        const expected = expectedValue(N, X);
        resultDiv.innerHTML = `<p>Expected value: ${expected.toFixed(4)}</p>`; //toFixed lowers decimals
    });
});
