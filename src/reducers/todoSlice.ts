import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface ITodo {
  id:number,
  title:string,
  complete:boolean
}

const initialState: ITodo[] = [
  {
    id: 1,
    title: 'Mirzoali',
    complete: false
  },
  {
    id: 2,
    title: 'Navruz',
    complete: false
  },
];

export const slice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state:ITodo[], action) => {
      const { id, text } = action.payload;
      state.push({ id, title: text, complete: false });
    },
    deleteTodo: (state, action:PayloadAction<number>) => {
      const id:number = action.payload;
      return state.filter((e) => e.id !== id);
    },
    completeTodo : (state,action:PayloadAction<number>) =>{
      const id:number = action.payload;
      state.map((e)=>{
        if(e.id===id){
          e.complete =! e.complete
        }
        return e 
      })
    }
  }
})

export const {addTodo, deleteTodo , completeTodo} = slice.actions

export default slice.reducer