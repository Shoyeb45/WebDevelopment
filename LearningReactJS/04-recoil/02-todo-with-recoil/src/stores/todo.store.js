import { atom, selector } from "recoil";

export const titleAtom = atom({
    key: "titleAtom",
    default: "",
});

export const descriptionAtom = atom({
    key: "descAtom",
    default: "",
});

export const todosAtom = atom({
    key: "todosAtom",
    default: []
});

export const completedTodosAtom = selector({
    key: "completedTodos",
    get: ({ get }) => {
        const todos = get(todosAtom);
        return todos.filter((todo) => todo.completed);
    }
});


