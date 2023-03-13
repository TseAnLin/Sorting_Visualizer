import React from 'react';
import { getBubbleSortAnimations } from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 3;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 100;

// This is the main color of the array bars.
const PRIMARY_COLOR = '#cbaa70';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = '#28FF28';

const FINAL_COLOR = '#921AFF';

const STARNDARD_COLOR = '#F9F900';


export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      numberOfArray: NUMBER_OF_ARRAY_BARS,
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < this.state.numberOfArray; i++) {
      array.push(randomIntFromInterval(5, 380));
    }
    var arrayBars = document.getElementsByClassName('array-bar');
    var len = arrayBars.length;

    for (var i = 0; i < len; i++) {
      arrayBars[i].style.backgroundColor = PRIMARY_COLOR;
    }
    this.setState({ array });
  }

  bubbleSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
    const animations = getBubbleSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const [barOneIdx, barTwoIdx, color, HeightOne, HeightTwo] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      if (color === 1) {
        setTimeout(() => {
          barOneStyle.backgroundColor = PRIMARY_COLOR;
          barTwoStyle.backgroundColor = PRIMARY_COLOR;
          barOneStyle.height = `${HeightOne}px`;
          barTwoStyle.height = `${HeightTwo}px`;
        }, i * ANIMATION_SPEED_MS);
      }
      else if (color === 2) {
        setTimeout(() => {
          barOneStyle.backgroundColor = SECONDARY_COLOR;
          barTwoStyle.backgroundColor = SECONDARY_COLOR;
          barOneStyle.height = `${HeightOne}px`;
          barTwoStyle.height = `${HeightTwo}px`;
        }, i * ANIMATION_SPEED_MS);
      }
      else if (color === 3) {
        setTimeout(() => {
          barOneStyle.backgroundColor = FINAL_COLOR;
          barOneStyle.height = `${HeightOne}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }



  // NOTE: This method will only work if your sorting algorithms actually return
  // the sorted arrays; if they return the animations (as they currently do), then
  // this method will be broken.
  testSortingAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const bubbleSortedArray = getBubbleSortAnimations(array.slice());
      console.log(arraysAreEqual(javaScriptSortedArray, bubbleSortedArray));
    }
  }

  onChange(value) {
    this.setState({ numberOfArray: value });
  }

  render() {
    const array = this.state.array;

    return (
      <div className="array-container">
        <div class="button">
          <p>{this.state.numberOfArray}</p>
          <input type="range" min="10" max="100" onChange={(e) => this.onChange(e.target.value)} />
          <button class="btn" id="sort" onClick={() => this.bubbleSort()}>Sort</button>
          <button class="btn" id="reset" onClick={() => this.resetArray()}>Reset</button>
        </div>
        <div className="leetcode-container">
          <a href="https://leetcode.com/problemset/all/" target="_blank" rel="noreferrer">
            <button className="leetcode-button">Practice in Leetcode</button>
          </a>
        </div>
        <p class="title">Bubble Sort</p>
        <div class="bar" style={{ width: `${900 + NUMBER_OF_ARRAY_BARS * 2}px` }}>
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{
                backgroundColor: PRIMARY_COLOR,
                height: `${value}px`,
                width: `${900 / NUMBER_OF_ARRAY_BARS}px`
              }}></div>
          ))}
        </div>
      </div>
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}
