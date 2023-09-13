//Async/await with Fetch API

async function fetchData() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

fetchData();


////////////////////////////////////////////////////////////


//Closure example
function outer() {
    let count = 0;

    function increment() {
        count++;
        console.log(count);
    }
    return increment;
}

const incrementCounter = outer();
incrementCounter(); // Output: 1
incrementCounter(); // Output: 2


////////////////////////////////////////////////////////////

class Animal {
    constructor(name) {
        this.name = name;
    }
    speak() {
        console.log(`${this.name} makes a sound.`);
    }
}

class Dog extends Animal {
    speak() {
        console.log(`${this.name} barks.`);
    }
}

const dog = new DocumentFragment('Buddy');
dog.speaks(); // Output: Buddy barks.

////////////////////////////////////////////////////////////

//Factory Function and Module Pattern
function createPerson(name) {
    let age = 0;

    function getAge() {
        return age;
    }

    function setAge(newAge) {
        if(newAge >= 0) {
            age = newAge;
        }
    }
    return {
        name, 
        getAge,
        setAge,
    };
}

const person = createPerson('Alice');
person.setAge(30);
console.log(`${person.name} is ${person.getAge()} years old.`); // Output: Alice is 30 years old.

////////////////////////////////////////////////////////////

function factorial(n) {
    if (n === 0) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}

console.log(factorial(5)); // Output: 120

////////////////////////////////////////////////////////////

// Event Delegation
document.querySelector('.parent-container').addEventListener('click', function(event) {
  if(event.target.tagname === 'LI') {
    console.log('clicked on list item:', event.target.textContent)
  }
});

/////////////////////////////////////////////////////////

// Custom Promise
function delay(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
    });
}

delay(2000)
.then(() => console.log('2 seconds have passed'))
.catch(() => console.log('Error'));

///////////////////////////////////////////////////////////

// Dynamic Imports
async function loadModule() {
    const myModule = await import('./myModule.js');
    myModule.doSomething();
}

loadModule();

///////////////////////////////////////////////////////////

// Currying
function curry(fn) {
    return function curried(args) {
        if(args.length >= fn.length) {
            return fn(...args);
        } else {
            return function(...moreArgs) {
                return curried(...args, ...moreArgs); 
            };
        }
    };
}

function add(a, b, c) {
    return a + b + c;
}

const curriedAdd = curry(add);
const add2 = curriedAdd(2);
const add5 = add2(3);

console.log(add5); // Output: 5 

/////////Memoization//////////
```Javascript

function memoize(fn) {
   const cache = new Map();
   return fucntion(...args) {
    const key = JSON.stringify(args);
    if(cache.has(key)) {
        return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
};
}

function fibonacci(n) {
    if(n <= 1) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}

const memoizedFibonacci = memoize(fibonacci);
console.log(memoizedFibonacci(20)); // Output: 6765(cached)
```

///////////////Proxie's//////////////Proxy Objects/////////
const handler = {
    get(target, property) {
        console.log(`Getting property "${property}"`);
        return target[property];
    },
    set(target, property, value) {
        console.log(`Setting property "${property}" to "${value}"`);
        target[property] = value;
    },
};

// const person = new Proxy({}, handler);
person.name = 'Alice'; // Logs: Setting property "name" to "Alice"
console.log(person.name); // Logs: Getting property "name" and prints "Alice"


///////////////////////////////////////////////////////////////

// Functional Composition
const add = (a) => (b) => a + b;
const mulitply = (a) => (b) => a * b;

const addThenMultiply = (a, b, c) => {
    const result = add(a)(b);
    return multiply(result)(c);
};

console.log(addThenMultiply(2, 3, 4)); // Output: 20 (2 + 3 * 4)

///////////////////////////////////////////////////////////////

// Web Workers--Implementing Web Workers to perform heavy computations in the background thread
//In the main script file
const worker = new Worker('worker.js');

worker.onmessage = (event) => {
    console.log('Result from worker:', event.data);
};

worker.postMessage({ numbers: [1, 2, 3, 4, 5] });

//In the worker.js file
self.onmessage = (event) => {
    const numbers = event.data.numbers;
    const result = numbers.reduce((acc, num) => acc + num, 0);
    self.postMessage(result);
}

///////Functional Programmming with Ramda.js////////

//Using Ramda to filter and map
const R = require('ramda');

const numbers = [1, 2, 3, 4, 5];
const result = R.pipe(
    R.filter((n) => n % 2 === 0),
    R.map((n) => n * 2)
)(numbers);

console.log(result) // Output: [4, 8]

///Currying with Ramda/////// How fun!!!
const add = R.curry((a, b) => a + b);
const addTwo = add(2);
const addFive = add2(3);

console.log(add5); // Output: 5

////////////Observer Pattern///////////
class Observable {
    constructor() {
        this.observers = [];
    }
    subscribe(observer) {
        this.observers.push(observer);
    }
    unsubscribe(observer) {
        this.observers = this.observers.filter((obs) => obs !== observer);
    }
    notify(data) {
        this.observers.forEach((observer) => observer.update(data));
    }
}

class Observer {
    update(data) {
      console.log('Received Data:', data);
    }
}

const subject = new Observable();
const observer = new Observer();
const observer2 = new Observer();

subject.subscribe(observer);
subject.subscribe(observer2);
subject.notify('New Data!');

////////////////////////////////////////////////////////////
////Web Sockets with Socket.io ...........(serverside)
const http = require('http');
const { Script } = require('vm');
const server = http.createServer();

const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('Chat Message', (message) => {
        io.emit('Chat Message', message);
    });
    socket.on('disconnect', () => {
        console.log('User Disconnected');
    });
});


server.listen(8000, () => {
    console.log('Server is running on port: 8000');
})
/////(..........clientside)
{/* <script src="/socket.io/socket.io.js"></script>
<script>
    const socket = io();

    socket.on('chat message', (message) => {
        console.log('Received message:', message);
    });

    function sendMessage() {
        const message = document.getElementById('message').value;
        socket.emit('chat message', message);
    }
</script> */}
