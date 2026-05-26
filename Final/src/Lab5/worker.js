function fiboRecursive(n) {
    if (n <= 1) return n;
    return fiboRecursive(n - 1) + fiboRecursive(n - 2);
}

self.onmessage = (e) => {
    const n = e.data;
    const result = fiboRecursive(n);
    self.postMessage(result);
};