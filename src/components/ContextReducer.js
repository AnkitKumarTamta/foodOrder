import React, { createContext, useContext,useReducer } from 'react'

const CartStateContext = createContext();   //just like global state, can be manipulated from anywhere in application
const CartDispatchContext = createContext();  //UseReducer inside dispatch function... useReducer used instead of useState

const reducer = (state,action)=>{   // action- means kya kam krna hai add,delete,update etc, state- konse state m ye action krne hai
                                    // koi bhi action krna hai, mai dispatch ko btaunga ki bhai is State m ye Action krna h tereko
                                    // kya krna hai ye logic isi reducer dabbe m likha jaega
                                        switch(action.type){
                                            case "ADD" :
                                            return [...state,{id:action.id,name:action.name,qty:action.qty,size:action.size,
                                            price:action.price, img:action.img}]

                                            case "REMOVE" :
                                                let newArr = [...state]
                                                newArr.splice(action.index,1)
                                                return newArr;
                                            
                                            case "UPDATE" :
                                                let arr= [...state]
                                                arr.find((food , index)=>{
                                                    if(food.id === action.id)
                                                    {
                                                        arr[index] = {...food, qty: parseInt(action.qty) + food.qty, price:action.price + food.price};
                                                    }
                                                    return arr
                                                }) 
                                                return arr   
                                            case "DROP":
                                                let empArray = [];
                                                return empArray    
                                    
                                            default: console.log("error in reducer")

                                        }                                  
}

export const CartProvider = ({children})=>{
    const [state,dispatch] = useReducer(reducer,[]);  // state []- initial value of state, dispatch - a function, to send something,
    return(                                        // dispatch- multiple number of cases of Action types(tasks) Add,Delete, etc
             
          <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
          </CartDispatchContext.Provider>
    )
}

export const useCartState = () => useContext(CartStateContext);
export const useCartDispatch = () => useContext(CartDispatchContext);
