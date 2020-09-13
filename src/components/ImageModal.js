import React from 'react';

export default ({img, modalcb}) => {
  return (
    <div className="modal">
        <div>
          <img alt="modal" src={img} />
        </div>
        <span role="img" onClick={modalcb} className="close-modal">&#10060;</span>
    </div>
  )
}