import { useContext } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import ProgressKeeper from './ProgresContext';

export default function ProgressBar(){
    const context = useContext(ProgressKeeper);
    let done = context.progress.done
    let total = context.progress.total

    let percentage = (done / total) * 100;

    return(
        <div>
            <CircularProgressbar value={percentage} text={`${percentage}%`}/>
            <span>progress: {done} / {total}</span>
        </div>
    )
}