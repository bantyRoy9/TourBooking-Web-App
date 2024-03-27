import React from 'react'

function Loader({propStyle}) {
  return (
    <>
    <div id="loadingWait" title="Please Wait..." style={{display: propStyle}}>
		<div className="appLoader"></div>
	</div>
    </>
  )
}

export default Loader