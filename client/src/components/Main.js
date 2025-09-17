import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'  // useNavigate instead of Link
import { setUserId } from '../redux/result_reducer'
import '../styles/Main.css'

export default function Main() {
    const inputRef = useRef(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function startQuiz() {
        const username = inputRef.current?.value.trim()
        if (username) {
            dispatch(setUserId(username))
            navigate('/quiz')  // navigate programmatically
        }
    }

    // handle Enter key
    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault()
            startQuiz()
        }
    }

    return (
        <div className='container'>
            <h1 className='title text-light'>Quiz Application</h1>

            <ol>
                <li>You will be asked 15 questions one after another.</li>
                <li>10 points is awarded for the correct answer.</li>
                <li>Each question has Four options. You can choose only one options.</li>
                <li>You can review and change answers before the quiz finish.</li>
                <li>The result will be declared at the end of the quiz.</li>
            </ol>

            <form id="form" onKeyDown={handleKeyDown}>
                <input 
                    ref={inputRef} 
                    className="userid" 
                    type="text" 
                    placeholder='User_Name*' 
                />
            </form>

            <div className='start'>
                <button className='btn' onClick={startQuiz}>Start Quiz</button>
            </div>
        </div>
    )
}
