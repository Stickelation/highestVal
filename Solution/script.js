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

function expectedValueForList(values, X) {
    let N = values.length;
    let sum = 0;
    let combCounts = {};
    
    // Create a dictionary to count combinations
    function generateCombinations(arr, data, start, end, index, r) {
        if (index === r) {
            let combination = data.slice(0, r).sort((a, b) => a - b);
            let combKey = combination.toString();
            if (combCounts[combKey]) {
                combCounts[combKey]++;
            } else {
                combCounts[combKey] = 1;
            }
            return;
        }

        for (let i = start; i <= end && end - i + 1 >= r - index; i++) {
            data[index] = arr[i];
            generateCombinations(arr, data, i + 1, end, index + 1, r);
        }
    }

    generateCombinations(values, new Array(X), 0, N - 1, 0, X);
    
    // Calculate total combinations
    let totalCombinations = Object.values(combCounts).reduce((acc, count) => acc + count, 0);
    
    // Calculate expected value
    for (let combKey in combCounts) {
        let combination = combKey.split(',').map(Number);
        let maxValue = Math.max(...combination);
        let combProbability = combCounts[combKey] / totalCombinations;
        sum += maxValue * combProbability;
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
