import { atomFamily, selectorFamily } from "recoil";
import { TODOS } from "./todos";

export const todosAtomFamily = atomFamily({
  key: 'todosAtomFamily',
  default: selectorFamily({
    key: "todosSelectorFamily",
    get: function (id) {      // a function returning another function 
      return async ({ get }) => {
        try {

          let res = await fetch(`https://dummyjson.com/todos/${id}`);
          res = await res.json();
          console.log(res);
          
          res.description = `Description of id : ${id}`;
          return res;
        } catch (error) {
          console.log(error);
          throw error
          return null
        }
      }
    }
  })
});