import type { FormEvent } from "react"
import axios from "axios";

export default function App() {
  async function signIn(e: FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const res = await axios.post("http://localhost:3000/api/login", {
      username: formData.get("username"),
      password: formData.get("password")
    }, {
      withCredentials: true
    });
    if (!res.status) {
      alert("not logged in, some error")
      return;
    }    
    
    alert("logged in successfull");
  }
  return (
    <>

      <div>
        <form action="" onSubmit={signIn}>
          <input type="text" placeholder="enter username" name="username"/>
          <input type="password" placeholder="enter password" name="password"/>
          <button>Log in</button>

        </form>
      </div>

      <button onClick={async () => {
        const res = await axios.get("http://localhost:3000/api/logout", {
          withCredentials: true
        })
        if (!res.status) {
          alert("Some error while logging out")
          return;
        }
        alert("logged out ")
      }}>Log Out</button>
    </>
  )
}