export default function Signup() {
    return <div style={{
        display:"flex",
        justifyContent:"center",
        alignItems: "center",
        flexDirection: "column",
        // width: "300px",
        gap: "10px"
    }}>
        <input type="text" placeholder="Enter your email"/>
        <input type="password" placeholder="Enter your password"/>
        <button>Submit</button>
    </div>
}