import ListFetcher from "./listFetcher";
import "./../styles/list.css"

import { useContext} from "react";
import ProgressKeeper from "./ProgresContext";


let total;


const url = '/list.json';

function ListPage () {
    const list = ListFetcher({url}) 
    console.log("list in component: ", list);
    
    const jsx = [];
    
    for(const argument in list) {
        console.log("chiavi: ", argument)
        console.log("lezioni: ", list[argument]);
        let lessons = list[argument]

        jsx.push(LessonItems(argument, lessons));
    }
    let totalCount = useContext(ProgressKeeper); 
     console.log("log del context: ", totalCount);
     console.dir("dir del context: ", totalCount);
    totalCount.registerProgress(total) 
    //jsx.length do not consider the total of single lesons

    return(
        <dl>
           {jsx}
           <span className="progress"></span>
        </dl>
    )
}


function LessonItems(title, lessons){
    let index = 0

    let backup = useContext(ProgressKeeper);
    let backupRegister = backup.registerStatus;
    
    return(
        <div className="chapter">
            <dt key={title}>{title}</dt>
            {
            lessons.map(lesson => {
                let key =  `${title}_${index}`;
                index += 1;
                total += 1;
                return(
                    <dd key={key}>
                        <label className="lesson" htmlFor={key}>
                        <input 
                            name={key}
                            type="checkbox"
                            className="progresschecker"
                            checked= {backup.status.name || false}
                            onChange={ (e)=>{
                                let data = {
                                    name : e.target.name,
                                    checked : e.target.checked
                                };
                                backupRegister(data)
                            }}
                        />
                            {lesson}
                        </label>
                    </dd>
                );
                }) 
            }
        </div>
    )
}


export default (ListPage)