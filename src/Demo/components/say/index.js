import React from 'react';

export default function say(props) { 
  const { value = 'hello!' } = props;
  return <p>{value}</p>  
}