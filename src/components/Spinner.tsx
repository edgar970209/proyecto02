import React from 'react'

export const Spinner = () => {
  return (
    <div>
        <div className="spinner-border text-warning" style={{width: '3rem', height: '3rem'}} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
        &nbsp;
        &nbsp;
        <div className="spinner-grow text-warning" style={{width: '3rem', height: '3rem'}} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
  )
}
