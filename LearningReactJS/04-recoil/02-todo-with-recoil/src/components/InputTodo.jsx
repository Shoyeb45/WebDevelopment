import { titleAtom, descriptionAtom, todosAtom } from "./../stores/todo.store"
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";


export function InputTodo() {
    const title = useRecoilValue(titleAtom); 
    const description = useRecoilValue(descriptionAtom); 
    const setTodos = useSetRecoilState(todosAtom);

    function addTodo() {
        setTodos((prev) => [...prev, {
            id: prev.length + 1,
            completed: false,
            title,
            description      
        }]);
    }

    return (
        <div>
            <dt>
                Enter title:
            </dt>

            <TitleInput></TitleInput>

            <dt>
                Enter description:
            </dt>
            
            <DescriptionInput></DescriptionInput>

            <dt>
                <button onClick={addTodo}>Add Todo</button>
            </dt>
        </div>
    );
}

function TitleInput() {
    const setTitle = useSetRecoilState(titleAtom);

    return (
        <dd>
            <input type="text" onChange={(e) => {
                setTitle(e.target.value)
            }}/>
        </dd>
    )
}


function DescriptionInput() {
    const setDescription = useSetRecoilState(descriptionAtom);

    return (
        <dd>
            <input type="text" onChange={(e) => {
                setDescription(e.target.value)
            }}/>
        </dd>
    )
}