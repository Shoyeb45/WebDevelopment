interface User {
    id: number;
    name: string,
    password: string,
    age: number,
    phoneNumber: string,
    email: string
};

function doSomethig(a: User, b?: User): string {
    return a.email;
}


console.log(doSomethig({
    id: 1, 
    age: 21,
    name: "Shoyeb",
    password: "SDFas",
    phoneNumber: "912312424",
    email: "Sgsa@gdasf"
}));
