import React, { useEffect, useRef } from "react";

interface Props {
    value: string,
    show: boolean
    addCount: () => void,
    onGetMsg?: (msg: string) => void,
    children: React.ReactNode // 可以是多种类型， 包括：React.ReactElement string number React.ReactFragment React.ReactPortal boolean null undefined
}


function Button(props: Props) {
    const { value, show, addCount, children, onGetMsg } = props
    // 1.获取dom
    // 2. 稳定引用的存储器（定时器处理）
    const timerRef = useRef<number | undefined>(undefined)

    useEffect(() => {
        timerRef.current = setInterval(() => {
            console.log('Button component - counting...')
        }, 1000);
        
        // clear the timeout when the component unmounts
        return () => {
            clearInterval(timerRef.current)
            console.log('Button component was destroyed...')
        }
    }, []);

    return (show &&
        <div style={{backgroundColor: "yellow", padding: "5px"}}>
            <button onClick={addCount}>{value}</button>
            <button onClick={() => onGetMsg?.('this is message')}>Click to get msg</button>
            {children}
        </div>
    )
}

export default Button;