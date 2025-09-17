import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFetchQuestion } from '../hooks/FetchQuestion'
import { updateResult } from '../hooks/setResult'

export default function Questions({ onChecked }) {
    const dispatch = useDispatch()
    const { trace, queue } = useSelector(state => state.questions)
    const result = useSelector(state => state.result.result)
    const [{ isLoading, apiData, serverError }] = useFetchQuestion() 

    // ✅ Local state only for current question attempt
    const [checked, setChecked] = useState(null)

    // 🔹 When trace (question index) changes
    useEffect(() => {
        // show previous answer if user had attempted this question
        setChecked(result[trace] ?? null)
    }, [trace, result])

    function onSelect(i){
        // toggle logic
        const newChecked = checked === i ? null : i;

        setChecked(newChecked)
        dispatch(updateResult({ trace, checked: newChecked })) // save to Redux
        if(onChecked) onChecked(newChecked)
    }

    if(isLoading) return <h3 className='text-light'>Loading...</h3>
    if(serverError) {
        return (
            <h3 className='text-light'>
                {serverError.response?.data?.message || serverError.message || "Unknown Error"}
            </h3>
        )
    }

    const questions = queue[trace]

    return (
        <div className='questions'>
            <h2 className='text-light'>{questions?.questions}</h2>

            <ul key={questions?.id}>
                {
                    questions?.options.map((q, i) => (
                        <li key={i}>
                            <input 
                                type="radio"
                                value={i}
                                name="options"
                                id={`q${i}-option`}
                                checked={checked === i}  // ✅ current selection only
                                onChange={() => onSelect(i)}
                            />
                            <label className='text-primary' htmlFor={`q${i}-option`}>{q}</label>
                            <div className={`check ${result[trace] === i ? 'checked' : ''}`}></div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
