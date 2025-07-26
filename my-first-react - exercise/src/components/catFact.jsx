import axios from "axios";
import { useEffect, useState } from "react";

function FetchFacts({time}) {
    let [catFact, setCatFact] = useState("catFacts here!");
    let[halfMinute, setHalfMinute] = useState('00');

    useEffect(()=>{
        if(time.seconds !== "00"){
            if (time.seconds === halfMinute + 30){
                setHalfMinute(time.seconds)
            }else if (time.seconds === halfMinute - 30){
                setHalfMinute(time.seconds)
            }
        }
    },[time.seconds])


    useEffect(()=>{
    if(halfMinute){
        axios.get("https://catfact.ninja/fact?max_length=64")
            .then(res =>{
                setCatFact(res.data.fact);
            });
        
            console.log("fetching fact at ", time.seconds);
            
    }
    },[halfMinute]);
    
/*     useEffect(()=>{
        if(time.minutes){
            fetch("https://catfact.ninja/fact?max_length=64")
                .then(res => res.json())
                .then(data =>{
                    setCatFact(data.fact);
                });
            
             console.log("fetching fact at ", time.minutes);
             
        }
    },[time.minutes]); */



    return(
        <p className="catfact">{catFact}</p>
    ) 
}

export default (FetchFacts)