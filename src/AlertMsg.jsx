import React, { useEffect } from 'react'

function AlertMsg({ type, msg, removeAlert, list }) {

    useEffect(() => {
        const timeout = setTimeout(() => {removeAlert();}, 3000)
        return () => clearTimeout(timeout);} , [list])

    return (
        <p className={`alert alert-${type} w-50 mx-auto p-1 text-center`}>{msg}</p>
    )
}

export default AlertMsg
