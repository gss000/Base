import React from 'react';

export function run(props) { 
  const { value = '已加载run组件' } = props;
  return <p>{value}</p>  
}