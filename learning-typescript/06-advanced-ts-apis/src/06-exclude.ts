// we had user type

// interface User {
//     id: number;
//     name: string,
//     password: string,
//     age: number,
//     phoneNumber: string,
//     email: string
// };

type ExcludeType = Exclude<User, "id">

function fun(user: ExcludeType) {
    console.table(user)
}

fun({
    password: "Sfas",
    age: 124,
    phoneNumber: "Sfasf",
    email: 'Sfas',
    name: 'Sfs',
    id: 0
});