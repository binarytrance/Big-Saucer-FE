import React, { useState } from 'react';

const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  function updateValue(e) {
    // check if its a number and then convert
    let { value } = e.target;
    if (e.target.type === 'number') {
      value = parseInt(value);
    }
    setValues({
      ...values,
      [e.target.id]: value,
    });
  }
  return [values, updateValue];
};

export default useForm;
