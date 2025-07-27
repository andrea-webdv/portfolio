import axios from "axios";
import { useEffect, useState } from "react";

function FetchFacts({time}) {
    let [catFact, setCatFact] = useState("catFacts here!");

    let[halfMinute, setHalfMinute] = useState(time.seconds);

    useEffect(()=>{
            if (halfMinute === time.seconds + 30){
                setHalfMinute(time.seconds)
            }else if (halfMinute === time.seconds - 30){

                setHalfMinute(time.seconds)
            }
    },[time.seconds])


    useEffect(()=>{
    if(halfMinute){
        axios.get("https://catfact.ninja/fact?max_length=64")
            .then(res =>{
                setCatFact(res.data.fact);
            });    
    }
    },[halfMinute]);


    //add a callback for add and remove after 1sec an animation class

    return(
        <div id="catbox">
            <p id="catfact">{catFact}</p>
        </div>
    ) 
}

export default (FetchFacts)