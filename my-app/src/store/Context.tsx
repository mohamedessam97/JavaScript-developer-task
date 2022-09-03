import React from "react";

const Context =React.createContext<{index:number,answer:any[] ,setIndex:React.Dispatch<React.SetStateAction<number>> , answerSelect:any}>({
    index:0,
    answer:[],
    setIndex:()=>{},
    answerSelect:()=>{}
})

export default Context