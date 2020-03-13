import React from 'react'
import './row.css'
import PropTypes from 'prop-types'

const Row = ({left, right}) => {
    return (<div>
      <br></br>
        <div className="row mb2 spec">
          <div className="col-md-6">
            {left}
          </div>
          <div className="col-md-6">
            {right}
          </div>
        </div>
    </div>)
  };
  
Row.propTypes = {
  left: PropTypes.node,
  right: PropTypes.node,
};

  export default Row