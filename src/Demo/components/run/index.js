import React from 'react';

export default function run(props) { 
  const { value = '已加载run组件' } = props;
  return <p>{value}</p>  
}