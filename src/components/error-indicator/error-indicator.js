import React from 'react'
import './error-indicator.css'
const ErrorIndicator = () => {
    return (
        <div className="error-indicator">
            <span className='boom'>Boom !</span>
            <span>Something wrong</span>
            <span>But our droids already fix it</span>
        </div>
    )
}
export default ErrorIndicator;