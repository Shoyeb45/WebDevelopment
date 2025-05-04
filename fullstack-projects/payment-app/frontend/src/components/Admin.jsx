import { usersAtom } from "../stores/state"
import { useRecoilValue } from "recoil";

export function Admin() {
    const users = useRecoilValue(usersAtom);

    return (
        <div>
            {users.map((user) => {
                return <User user={user} />
            })}
        </div>        
    )
}

function User({ user }) {
    return (
        <div>
            <div>{user.firstName + " " + user.lastName }</div>
        </div>
    )
}