// pick only required attribtues
type UpdateUserType = Pick<User, "name" | "age" | "email">;

function updateUser(user: UpdateUserType): string {
    console.log("Update user successfully");
    return "done";
}

console.log(
    updateUser({
        name: "Shoyeb",
        age: 21,
        email: "Shoyeb@gmail.com"
    })
);
