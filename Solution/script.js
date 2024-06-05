function logFactorial(n) {
    let result = 0;
    for (let i = 2; i <= n; i++) {
        result += Math.log(i);
    }
    return result;
}

function logBinomialCoefficient(n, k) {
    if (k > n || k < 0) return -Infinity;
    return logFactorial(n) - logFactorial(k) - logFactorial(n - k);
}

function expectedValueForList(values, X) {
    let N = values.length;
    let sum = 0;

    values.sort((a, b) => a - b); // Sort the values in ascending order

    let logBinomNX = logBinomialCoefficient(N, X); // Precompute log binomial coefficient (N, X)

    for (let i = X; i <= N; i++) {
        let value = values[i - 1]; // Adjust index for 0-based indexing in JavaScript
        let logProbability = logBinomialCoefficient(i - 1, X - 1) - logBinomNX;
        let probability = Math.exp(logProbability);
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
