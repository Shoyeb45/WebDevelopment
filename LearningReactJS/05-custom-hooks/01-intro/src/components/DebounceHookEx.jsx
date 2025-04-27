import { useEffect, useState } from "react"

function useDebounce(filter, timer) {
    const [users, setUser] = useState([]);
    console.log(filter);
    
    const api = (filter === ""? "https://dummyjson.com/users": "https://dummyjson.com/users/search?q=" + filter);

    useEffect(() => {
        let timeoutRef = setTimeout(() => {
            console.log(api);
            
            fetch(api)
              .then((data) => data.json())
              .then((data) => setUser(data.users))
        }, timer)

        return () => {
            clearInterval(timeoutRef);
        }
    }, [filter])

    console.log(users);
    
    return users;
}

export function Users() {
    const [filter, setFilter] = useState("");
    const users = useDebounce(filter, 200);
    
    return (
        <div>
            <input 
                type="text"
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Search for the user..."
            />
            {users.map((user) => {
                return <User user={user}></User>
            })}
        </div>

    )
}

function User({ user }) {
    console.log("user");
    
    return (
        <div>
            <h1>{user.firstName + " " + user.lastName}</h1>
            <h4>{user.username}</h4>
        </div>
    )
}