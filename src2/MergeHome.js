import React from 'react';
import Mergesort from './SortingVisualizer/Mergesort';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import './TextBlock.css';
import { useRef, onCopy } from 'react';
import './CodeBlock.css';

const pythonCode = `def mergeSort(arr):
    if len(arr) > 1:
        mid = len(arr)//2
        L = arr[:mid]
        R = arr[mid:]

        mergeSort(L)
        mergeSort(R)

        i = j = k = 0

        while i < len(L) and j < len(R):
            if L[i] < R[j]:
                arr[k] = L[i]
                i += 1
            else:
                arr[k] = R[j]
                j += 1
            k += 1

        while i < len(L):
            arr[k] = L[i]
            i += 1
            k += 1

        while j < len(R):
            arr[k] = R[j]
            j += 1
            k += 1
`;

const jsCode = `
function mergeSort(array) {
  const half = array.length / 2

  if (array.length < 2){
    return array
  }

  const left = array.splice(0, half)
  return merge(mergeSort(left),mergeSort(array))
}

function merge(left, right) {
    let arr = []

    while (left.length && right.length) {
        if (left[0] < right[0]) {
            arr.push(left.shift())
        } else {
            arr.push(right.shift())
        }
    }

    return [ ...arr, ...left, ...right ]
}
`;

const cppCode = `void merge(int *array, int l, int m, int r) {
    int i, j, k, nl, nr;
    nl = m-l+1; nr = r-m;
    int larr[nl], rarr[nr];
 
    for(i = 0; i<nl; i++)
       larr[i] = array[l+i];
 
    for(j = 0; j<nr; j++)
       rarr[j] = array[m+1+j];
 
    i = 0; j = 0; k = l;
 
    while(i < nl && j<nr) {
       if(larr[i] <= rarr[j]) {
          array[k] = larr[i];
          i++;
       } else {
          array[k] = rarr[j];
          j++;
       }
       k++;
    }
    while(i<nl) {
       array[k] = larr[i];
       i++; k++;
    }
    while(j<nr) {
       array[k] = rarr[j];
       j++; k++;
    }
 }
 
 void mergeSort(int *array, int l, int r) {
    int m;
    if(l < r) {
       int m = l+(r-l)/2;
 
       mergeSort(array, l, m);
       mergeSort(array, m+1, r);
       merge(array, l, m, r);
    }
 }`;

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSorting: false,
            language: 'python',
            code: pythonCode,
            pythonCode: pythonCode,
            jsCode: jsCode,
            cppCode: cppCode,
        };
        this.codeRef = React.createRef();
        this.handleCopyClick = this.handleCopyClick.bind(this);
        this.handleLanguageChange = this.handleLanguageChange.bind(this);
        this.setState({ code: this.state.pythonCode, language: 'python' });
    };

    handleCopyClick() {
        const codeElement = this.codeRef.current;
        if (codeElement) {
            const range = document.createRange();
            range.selectNode(codeElement);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
            document.execCommand('copy');
            window.getSelection().removeAllRanges();
        }
    }

    handleLanguageChange(event) {
        if (event.target.value === 'python') {
            this.setState({ code: this.state.pythonCode, language: 'python' });
        } else if (event.target.value === 'javascript') {
            this.setState({ code: this.state.jsCode, language: 'javascript' });
        } else if (event.target.value === 'cpp') {
            this.setState({ code: this.state.cppCode, language: 'cpp' });
        }
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col >
                        <Mergesort {...this.props}></Mergesort>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} className='code'>
                        <div className="code-block">
                            <select value={this.state.language} onChange={this.handleLanguageChange}>
                                <option value="python">Python</option>
                                <option value="javascript">JavaScript</option>
                                <option value="cpp">C++</option>
                            </select>
                            <button onClick={this.handleCopyClick}>Copy</button>
                            <pre ref={this.codeRef} className={`language-${this.state.language}`}>
                                {this.state.code}
                            </pre>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="TextBlock"  >
                            <row>
                                <div id="text-block">
                                    <h2>Description</h2>
                                    <p>Merge Sort that divides the data structure recursively until the subsequences contain only one element. At this point, the subsequences get merged and ordered sequentially. To do so, the algorithm progressively builds the sorted sublist by adding each time the minimum element of the next two unsorted subsequences until there is only one sublist remaining. This will be the sorted data structure.</p>
                                </div>
                            </row>
                            <row>
                                <div id="text-block-2" >
                                    <h3>Complexity</h3>
                                    <p>Average : O(n × log n)</p>
                                    <p>Best : O(n × log n)</p>
                                    <p>Worst : O(n × log n)</p>
                                    <p>Space : O(n)</p>
                                </div>
                            </row>
                        </div>
                    </Col>
                </Row>
                <br />
                <div className="leetcode-container">
                    <a href="https://leetcode.com/tag/merge-sort/" target="_blank" rel="noreferrer">
                        <button className="leetcode-button">Practice in Leetcode</button>
                    </a>
                </div>
            </Container>
        );
    }
}

export default Home;





