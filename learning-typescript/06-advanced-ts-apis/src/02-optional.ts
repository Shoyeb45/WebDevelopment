// now make the picked up value as option 

type UpdateUserTypeOptional = Partial<UpdateUserType>

function doSomethigAgain(user: UpdateUserTypeOptional) {
    console.log(user);
}

doSomethigAgain({
    name: "Shoyeb"
});

doSomethigAgain({
    age: 12,
    email: "Sjohas@gmaoa"
});