import ListFetcher from "./listFetcher";
import "./../styles/list.css"

import { useContext} from "react";
import { ProgressContext } from "./ProgresContext";

let total;

const url = '/list.json';

function ListPage () {
    const list = ListFetcher({url}) 
    console.log("list in component: ", list);
    
    const jsx = [];
    
    let context = useContext(ProgressContext); 
     console.log("log del context: ", context);
     console.dir("dir del context: ", context);
/* 
    for(const argument in list) {
        let lessons = list[argument]

        jsx.push(LessonItems(argument, lessons,context));
    }

    context.registerProgress(total) 
 */
    return(
        <dl>
           {jsx}
           <span className="progress"></span>
        </dl>
    )
}


function LessonItems(title, lessons, context){
    let index = 0

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
                            checked= {context.status.name || false}
                            onChange={ (e)=>{
                                let data = {
                                    name : e.target.name,
                                    checked : e.target.checked
                                };
                                context.registerStatus(data)
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