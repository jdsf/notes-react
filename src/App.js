import React, { Component } from 'react';
import './index-output.css';
import MainSection from './components/MainSection'
import DayInfo from './components/DayInfo';
import { VelocityComponent, VelocityTransitionGroup } from 'velocity-react';
import 'velocity-animate/velocity.ui';

class App extends Component {

  render() {
    return (
      <div className = "stretch-full">
        <div id= "background-img"></div>
        <VelocityTransitionGroup
         className = "stretch-full blend"
          enter= {{animation: "transition.slideRightIn"}} leave= {{animation: "fadeOut"}}
          runOnMount
        >
          <DayInfo  date = {new Date()}></DayInfo>
        </VelocityTransitionGroup>

        <VelocityTransitionGroup
         className = "stretch-full"
          enter= {{animation: "transition.slideLeftIn"}} leave= {{animation: "fadeOut"}}
          runOnMount
        >
          <h1 id = "title">
            <span>   notes </span>
          </h1>
        </VelocityTransitionGroup>

        <VelocityTransitionGroup
         className = "stretch-full blend"
          enter= {{animation: "transition.slideDownIn"}} leave= {{animation: "fadeOut"}}
          runOnMount
        >
          <MainSection/>
        </VelocityTransitionGroup>

        <VelocityTransitionGroup
         className = "stretch-full footer"
          enter= {{animation: "transition.slideUpIn"}} leave= {{animation: "fadeOut"}}
          runOnMount
        >
          <footer>
            <p> <span>   Notes app powered by react / /
               <a href = "https://www.github.com/jdsf">  jdsf @github </a> / / 2018, all rights reserved  </span>
            </p>
          </footer>
        </VelocityTransitionGroup>

      </div>
    );
  }
}

export default App;
