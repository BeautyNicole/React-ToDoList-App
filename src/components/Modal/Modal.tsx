import { ReactNode, forwardRef, useCallback, useEffect, useImperativeHandle, useState } from "react";
import { createPortal } from "react-dom";
import './Modal.scss'

type Props = {
    children: ReactNode,
    defaultOpened?: boolean
}

const modalElement = document.getElementById('modal-root') as Element

export function Modal(props: Props, ref: any) {
    const { children, defaultOpened = false } = props;
    const [isOpen, setIsOpen] = useState(defaultOpened)

    useImperativeHandle(ref, () => ({
        open: () => setIsOpen(true),
        close: () => setIsOpen(false)
    }), [close])

    const handleEscape = useCallback((e: any) => {
        if(e.key === 27) setIsOpen(false)
    }, [])

    useEffect(() => {
        if(isOpen) document.addEventListener('keydown', handleEscape, false)
        
        return () => {
            document.removeEventListener('keydown', handleEscape, false)
        }
    }, [handleEscape, isOpen])


    return createPortal(
        isOpen ? <div className="modal">{children}</div> : null,
        modalElement
    )

}


export default forwardRef(Modal)