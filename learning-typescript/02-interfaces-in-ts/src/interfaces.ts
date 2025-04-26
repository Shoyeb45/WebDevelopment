interface User {
    fistName: string,
    lastName: string,
    email: string,
    username: string,
};


function provideUserInfo(user: User) {
    console.table(user)
}

provideUserInfo({
    fistName: "Sufiyan",
    lastName: "Ansari",
    email: "shoyeb@gmail.com",
    username: "shoyeb12",
});