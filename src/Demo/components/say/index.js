import React from 'react';

export function say(props) { 
  const { value = 'hello!' } = props;
  return <p>{value}</p>  
}