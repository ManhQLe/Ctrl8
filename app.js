console.log('Hello world');

function X(A) {
    console.log(A + 1);
}

setImmediate(X.call, null, 2);

