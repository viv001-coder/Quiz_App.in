import React, { useEffect, useState } from 'react'
import { getServerData } from '../helper/helper'

export default function ResultTable() {

    const [data, setData] = useState([])

    useEffect(() => {
        getServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/result`, (res) => {
            // ensure data is always array
            if (Array.isArray(res)) {
                setData(res)
            } else {
                setData([])
            }
        })
    }, [])  // ✅ add dependency array

  return (
    <div>
        <table>
            <thead className='table-header'>
                <tr className='table-row'>
                    <td>Name</td>
                    <td>Attempts</td>
                    <td>Earn Points</td>
                    <td>Result</td>
                </tr>
            </thead>
            <tbody>
                {/* ✅ Proper no-data handling */}
                {data.length === 0 ? (
                    <tr>
                        <td colSpan="4" style={{ textAlign: 'center' }}>
                            No Data Found
                        </td>
                    </tr>
                ) : (
                    data.map((v, i) => (
                        <tr className='table-body' key={i}>
                            <td>{v?.username || ''}</td>
                            <td>{v?.attempts || 0}</td>
                            <td>{v?.points || 0}</td>
                            <td>{v?.achived || ""}</td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    </div>
  )
}
