import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './styles/App.css';
import Clock from './components/clock';
import FetchFacts from './components/catFact';
import ListPage from './components/ListPage';
import ProgressBar from './components/ProgressBar';
import ProgressKeeper from './components/ProgresContext';
import { ErrorBoundary } from './components/React_ErrorBoundary';

function clock () {
    let time = {};

     let running;

    if(!running) { 

     running = true; 
    let clockObj = new Date();
    time.hour = clockObj.getHours();
    time.minutes = clockObj.getMinutes();
    time.seconds = clockObj.getSeconds();

     }else{
        running = false;
    } 

    return time
} 


function App() {
    let [ time, setTime] = useState({});
    let [pageNumber, setpageNumber] = useState(1);

    useEffect(()=>{
        if(pageNumber === 1){
            let clockinterval = setInterval(()=>{
                // console.log("clock returning: ", clock() )
                let actualTime = clock();
                setTime({
                    hour: actualTime.hour,
                    minutes: actualTime.minutes,
                    seconds: actualTime.seconds
                })
                return
                // console.log("time state: ", time)
            },1000);
            return () => {clearInterval(clockinterval)};
        }
    },[time.seconds, pageNumber])

    let content;
     
        switch (pageNumber) {
            case (1):
                content =
                    <div className="App">
                    <header className="App-header">
                        {/* progress graph component */}
                        <img src={logo} className="App-logo" alt="logo" />
                        <div>
                        <p>
                        It's time to learn <code>React</code> 
                        </p>
                        <p className='test'>
                            PS: Hello World!
                        </p>
                        </div>
                        <FetchFacts time={time}/>
                        <div style={{display:'flex', gap:"3rem"}}>
                        <button
                            className="App-link"
                            type='button'
                            onClick={ ()=> setpageNumber(2) }
                        >
                        check the progress!
                        </button>
                        <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                            onClick={ ()=> setpageNumber(2) }
                        >
                        read the documentation!
                        </a>
                        </div>
                        <br></br>
                        <div id="clockScreen">
                            {/*i will use the syntax <Clock time={time} /> instead of {Clock(time)}*/}
                            <Clock time={time} />
                        </div>
                    </header>
                    </div>
                
                break;
            case (2):
                content = 
                <div className="App">
                    
                    <header className="App-header">
                        <h3>FOLLOW THE PATH</h3>
                        <ListPage /> 
                        <button 
                            className="App-link"
                            onClick={ ()=> setpageNumber(1) }
                        >home</button>
                        <ProgressBar defer style={{position:"absolute"}}></ProgressBar>
                    </header>
                    
                </div>
                break;
        
            default:
                break;
        }
     
    /* the return hold the jsx that will be used to build up the actual html page */
    
    return(
        <ErrorBoundary>
        <ProgressKeeper>
            {content}
        </ProgressKeeper>
        </ErrorBoundary>
    )
}


export default App;
