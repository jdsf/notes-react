import React from 'react';
import Entry from './Entry';

const Entries = (props) => {


  const startShow = (index) => {
    props.click(index)
  }


  return (
    <div className = "entries-container center">
      {props.entries.map(function(entry,index){
        return <Entry click =  {startShow.bind(this)} key = { index }
                  index = {index} title = {entry.title}>
              </Entry>;
      })}
    </div>
  )
}

export default Entries;
