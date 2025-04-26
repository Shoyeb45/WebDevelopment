interface Person {
    name: string,
    age: number,
    greet(phrase: string): void;
}

class Employee implements Person {
    name: string;
    age: number;
    constructor() {
        this.name = "Shoyeb";
        this.age = 12;
    }
    
    greet(phrase: string): void {
        console.log`Hi ${phrase}`
    }

}