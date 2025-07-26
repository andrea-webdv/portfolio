function Clock({time}) {
    return (
        <div id="clock">
            <span className="big">{time.hour || '24'} : {time.minutes || '00'}</span>
            
            <span className="small">: {time.seconds || '00'}</span>
        </div>
    )
}

export default Clock