
export function ShowTodos(props) {
    async function getAllTodos() {
        try {
            let result = await fetch("http://localhost:3000/todos");
            result = await result.json();
            
            if (!result) {
                return;
            }
            props.setTodos(result.todos)
          
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div>
            <button onClick={getAllTodos} style={{
                marginTop: "30px"
            }}>Show todos</button>
        </div>
    )
}