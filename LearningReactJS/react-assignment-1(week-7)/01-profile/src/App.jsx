import { Profile } from "./components/Profile"

const user = {
  name: "Forrest Knight", 
  city: "New York",
  stats: {
    followers: "80k",
    likes: "803k",
    photos: "1.4k"
  },
  profileImage: "/assets/forrestKnight.jpg",
  coverImage: "/assets/bleach.jpg"
}

export default function App() {
  return (
    <>
      <Profile user={user}></Profile>
    </>
  )
}