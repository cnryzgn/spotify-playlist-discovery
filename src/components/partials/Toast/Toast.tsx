import { useEffect, useRef, useState } from 'react'
import './Toast.css'

interface IToastProps {
    content: string,
    isError: boolean,
}

export const Toast = ({ content, isError }: IToastProps) => {
    const toastRef = useRef<any>()
    const [close, setClose] = useState<boolean>(false)


    useEffect(() => {
        const handleAnimationEnd = () => {
            toastRef.current.classList.add('close')
        }

        if (close) {
            toastRef.current.addEventListener('animationend', handleAnimationEnd)
            
            return () => {
                toastRef.current.removeEventListener('animationend', handleAnimationEnd)
            }
        }
    }, [close])

    useEffect(() => {
        setTimeout(() => setClose(true), 3000)
    }, [])

    const closeButtonHandler = () => setClose(true)

    return (
        <div ref={toastRef} className={`toast-container ${isError ? 'error-container' : ''} ${close ? 'hidden' : ''}`}>
            <div className="toast-body">
                <p>{ content }</p>
            </div>
            <button onClick={closeButtonHandler} id="close-button"><i className="fa-solid fa-xmark"></i></button>
        </div>
    )
}