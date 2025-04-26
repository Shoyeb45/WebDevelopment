type User = {
    firstName: string,
    lastName: string,
    age: number,
    email?: string,    // email is optional here
};

const a: User = {
    firstName: "Hammad",
    lastName: "Ansari",
    age: 2,
};


// unions
type StringOrNumber = string | number;

const a1: StringOrNumber = 123;
const a2: StringOrNumber = "Shoyeb Ansari";

console.table({ a1, a2 })

// Intersection
type Employee = {
    name: string,
    starteDate: Date
}

interface Manager {
    name: string, 
    department: string,
}

const obj: Employee & Manager = {
    name: "Harkirat",
    starteDate: new Date(),
    department: "computer Science"
};

console.table(obj)

