function factorial(n) {
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

function binomialCoefficient(n, k) {
    if (k > n || k < 0) return 0;
    return factorial(n) / (factorial(k) * factorial(n - k));
}

function expectedValueForList(values, X) {
    let N = values.length;
    let sum = 0;

    values.sort((a, b) => a - b); // Sort the values in ascending order

    let binomNX = binomialCoefficient(N, X); // Precompute binomial coefficient (N, X)

    for (let i = X; i <= N; i++) {
        let value = values[i - 1]; // Adjust index for 0-based indexing in JavaScript
        let probability = binomialCoefficient(i - 1, X - 1) / binomNX;
        sum += value * probability;
    }

    return sum;
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    const resultDiv = document.getElementById('result');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const listInput = document.getElementById('list').value;
        const X = parseInt(document.getElementById('X').value);
        const values = listInput.split(',').map(item => parseInt(item.trim()));

        if (X > values.length) {
            resultDiv.innerHTML = `<p>Error: X cannot be greater than the number of elements in the list</p>`;
            return;
        }

        const expected = expectedValueForList(values, X);
        resultDiv.innerHTML = `<p>Expected value: ${expected.toFixed(4)}</p>`;
    });
});
