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
    let pairCounts = {};
    
    // Create a dictionary to count pairs
    for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
            let pair = [values[i], values[j]].sort((a, b) => a - b);
            let pairKey = pair.toString();
            if (pairCounts[pairKey]) {
                pairCounts[pairKey]++;
            } else {
                pairCounts[pairKey] = 1;
            }
        }
    }
    
    // Calculate total pairs
    let totalPairs = Object.values(pairCounts).reduce((acc, count) => acc + count, 0);
    
    // Calculate expected value
    for (let pairKey in pairCounts) {
        let pair = pairKey.split(',').map(Number);
        let maxValue = Math.max(pair[0], pair[1]);
        let pairProbability = pairCounts[pairKey] / totalPairs;
        sum += maxValue * pairProbability;
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
        
        if (X !== 2) {
            resultDiv.innerHTML = `<p>Error: This code currently only handles X = 2</p>`;
            return;
        }

        const expected = expectedValueForList(values, X);
        resultDiv.innerHTML = `<p>Expected value: ${expected.toFixed(4)}</p>`;
    });
});
