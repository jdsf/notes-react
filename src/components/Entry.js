import React from 'react';


const Entry = (props) => {

  const handleClick = () => {
    props.click(props.index);
  }



  return (
    <div className = "entry" onClick = {handleClick.bind(this)}>
      <span>  {props.title} </span>
    </div>
  )
}

export default Entry;
