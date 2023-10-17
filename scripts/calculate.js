function factorial(n) {
    let result = 1;

    for (let i = 1; i <= n; i++)
        result *= i;

    return result;
}

function PlacementsNoRepetitions(n, k) {
    return factorial(n) / factorial(n - k);
}

function PlacementsWithRepetitions(n, k) {
    return n ** k;
}

function PermutationsNoRepetitions(n) {
    return factorial(n);
}

function PermutationsWithRepetitions(groups) {
    let n = groups.reduce((a, b) => a + b, 0)
    return groups.reduce((res, g) => res / factorial(g), factorial(n));
}

function CombinationsNoRepetitions(n, k) {
    return factorial(n) / factorial(n - k) / factorial(k);
}

function CombinationsWithRepetitions(n, k) {
    return CombinationsNoRepetitions(n + k - 1, k);
}
