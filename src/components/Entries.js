import React from 'react';
import Entry from './Entry';

const Entries = (props) => {




  const startShow = (index) => {
    props.click(index)
  }


  return (
    <div className = "entries-container center">


      {props.entries.map(function(entry,index){
        let position = JSON.parse(props.position);
        position.positon = index;
        position = JSON.stringify(position);
        return <Entry click =  {startShow.bind(this)} key = { index }
                  index = {position} title = {entry.title}>
              </Entry>;
      })}
    </div>
  )
}

export default Entries;
