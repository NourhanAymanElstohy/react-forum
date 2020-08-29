import React from 'react';

const Radio = ({name, label, error}) => {
    return (
      <div>
        <label htmlFor="" className="mr-4 col-form-label">
          {label}
        </label>
        <div className="form-check form-check-inline">
          <input
            type="radio"
            name={name}
            id={name}
            value="1"
            className="form-check-input"
          />
          <label htmlFor="is_mgr" className="form-check-label">
            Yes
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            type="radio"
            name={name}
            id={name}
            value="0"
            className="form-check-input"
          />
          <label htmlFor="is_mgr" className="form-check-label">
            No
          </label>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
}
 
export default Radio;