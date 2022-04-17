import React from 'react';

const Alert = (props) => {
  const capitalize = (word) => {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
  return (
    <div className="alert">
      {props.alert && (
        <div className={`${props.alert.type}`}>
          <strong>{capitalize(props.alert.type)}</strong>: {props.alert.message}
        </div>
      )}
    </div>
  );
};

export default Alert;
