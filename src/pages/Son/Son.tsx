import { useEffect, useRef } from "react"

export default function Son() {
    // 1.获取dom
    // 2. 稳定引用的存储器（定时器处理）
    const timerRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        timerRef.current = setInterval(() => {
            console.log('Son page - counting...');
        }, 1000);

        return () => {
            clearInterval(timerRef.current);
            console.log('Son page unmount');
        }
    }, []);
    return <div>this is Son page</div>
}