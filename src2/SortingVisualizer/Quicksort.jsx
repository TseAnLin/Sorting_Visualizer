import React from 'react';
import { getQuickSortAnimations } from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 5;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 100;

// This is the main color of the array bars.
const PRIMARY_COLOR = '#1E325C';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = '#FCA311';

const FINAL_COLOR = '#32539A';

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
  resetArraywithNum(Num) {
    this.state.numberOfArray = Num;
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
  quickSort() {
    this.props.sortingDetect(true);
    const animations = getQuickSortAnimations(this.state.array);

    const modifyBar = document.getElementById('modifyBar');
    const sortButton = document.getElementById('sort');
    const resetButton = document.getElementById('reset');
    modifyBar.disabled = true;
    sortButton.disabled = true; // disable the sort button
    resetButton.disabled = true; // disable the reset button

    for (let i = 0; i < animations.length; i++) {
      if (animations[i][3] === undefined)
        break;
      const arrayBars = document.getElementsByClassName('array-bar');
      const [barOneIdx, barTwoIdx, color, HeightOne, HeightTwo] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      if (color === 0) {
        setTimeout(() => {
          barOneStyle.backgroundColor = STARNDARD_COLOR;
          barOneStyle.height = `${HeightOne}px`;
        }, i * ANIMATION_SPEED_MS);
      }
      else if (color === 1) {
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
          barOneStyle.backgroundColor = PRIMARY_COLOR;
          barTwoStyle.backgroundColor = FINAL_COLOR;
          barOneStyle.height = `${HeightOne}px`;
          barTwoStyle.height = `${HeightTwo}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
    setTimeout(() => {
      modifyBar.disabled = false;
      sortButton.disabled = false; // enable the sort button
      resetButton.disabled = false; // enable the reset button
      this.props.sortingDetect(false);
    }, animations.length * ANIMATION_SPEED_MS);
  }

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
      const quickSortedArray = getQuickSortAnimations(array.slice());
      console.log(arraysAreEqual(javaScriptSortedArray, quickSortedArray));
    }
  }

  onChange(value) {
    this.setState({ numberOfArray: value });
    this.resetArraywithNum(value);
  }

  render() {
    const { array } = this.state;

    return (
      <div className="array-container">
        <div class="button">
          <p>{this.state.numberOfArray}</p>
          <input id="modifyBar" type="range" min="10" max="200" value={this.state.numberOfArray} onChange={(e) => this.onChange(e.target.value)} />
          <button class="btn" id="sort" onClick={() => this.quickSort()}>Sort</button>
          <button class="btn" id="reset" onClick={() => this.resetArray()}>Reset</button>
        </div>

        <p class="title">Quick Sort</p>
        <div class="bar" style={{ width: `${75}vw` }}>
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{
                backgroundColor: PRIMARY_COLOR,
                height: `${value}px`,
                width: `${75 / this.state.numberOfArray - 0.05}vw`
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
