import { Children, createContext, useMemo, useState } from "react";

const progressContext = createContext({
    status: {},
    progress: {},
    registerStatus: () => {},
    registerProgress: () => {}
});


function ProgressKeeper({children}){
    const [status, setStatus] = useState({});
    const [progress, setProgress] = useState({ total:0, done:0});

    //functions to set che progress provider
    const registerStatus = ({data})=>{
        setStatus((last)=>{
            if (Object.hasOwn(last, data.name)) {
                last.name = last.value;
                return last
            } else {
                last[toString(data.name)] = data.value
                return last
            }
        })

        let statusRead = Object.values(status);
        let doneCount = 0
        
        statusRead.forEach(record => {
            if (record){ 
                doneCount += 1;
            }
        })
        setProgress((last) => {
            let newSate = {total:last.total, done: last.done};
            newSate.done = doneCount;
            return newSate
        })
    };

    const registerProgress= (total, done) => {
        setProgress((last) => {
            let newSate = {total:last.total, done: last.done};
            if(total) {newSate.total = total};
            if(done) {newSate.done = done};
            return newSate
        })
    };

    //memo of the context
    const contextValue = useMemo(()=>{return{
        status: status, 
        registerStatus, 
        progress: progress, 
        registerProgress
    }},[status, progress]); 
    

    return (        
        <progressContext.Provider value={contextValue}>
            {children}
        </progressContext.Provider> 

    )
}
export default ProgressKeeper //riscrivere l'uso di parametri e metodi in listPage e progressbar
