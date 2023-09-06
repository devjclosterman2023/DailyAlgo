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