import React from 'react';

const Input = (props) => {

    const {name, value, label, onChange, type } = props;

  return (
    <div className="form-group">
      <label htmlFor={ name }>{ label }</label>
      <input
        value={ value }
        onChange={ onChange }
        name={ name }
        id={ name }
        type= { type }
        className="form-control"
      />
    </div>
  );
};
 
export default Input;