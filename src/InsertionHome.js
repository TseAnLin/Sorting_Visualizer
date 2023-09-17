import React from 'react';
import Insertionsort from './SortingVisualizer/Insertionsort';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import './TextBlock.css';
import { useRef, onCopy } from 'react';
import './CodeBlock.css';

const pythonCode = `
    def insertionSort(arr):
        for i in range(1, len(arr)):
            key = arr[i]
            j = i-1
            while j >= 0 and key < arr[j] :
                    arr[j + 1] = arr[j]
                    j -= 1
            arr[j + 1] = key
`;
const jsCode = `
    function insertionSort(arr, n)
    {
        let i, key, j;
        for (i = 1; i < n; i++)
        {
            key = arr[i];
            j = i - 1;
    
            while (j >= 0 && arr[j] > key)
            {
                arr[j + 1] = arr[j];
                j = j - 1;
            }
            arr[j + 1] = key;
        }
    }
`;
const cppCode = `void insertionSort(int arr[], int n)
    {
        int i, key, j;
        for (i = 1; i < n; i++)
        {
            key = arr[i];
            j = i - 1;
    
            while (j >= 0 && arr[j] > key)
            {
                arr[j + 1] = arr[j];
                j = j - 1;
            }
            arr[j + 1] = key;
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
                        <Insertionsort {...this.props}></Insertionsort>
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
                                    <p>Insertion sort is a simple sorting algorithm that builds the final sorted array one item at a time. It's less performant than advanced sorting algorithms, but it can still have some advantages: it's really easy to implement and it's efficient on small data structures almost sorted.</p>
                                </div>
                            </row>
                            <row>
                                <div id="text-block-2" >
                                    <h3>Complexity</h3>
                                    <p>Average : O(n × n)</p>
                                    <p>Best : O(n)</p>
                                    <p>Worst : O(n ×  n)</p>
                                    <p>Space : O(1)</p>
                                </div>
                            </row>
                        </div>
                    </Col>
                </Row>
                <br />
                <div className="leetcode-container">
                    <a href="https://leetcode.com/problems/insertion-sort-list/" target="_blank" rel="noreferrer">
                        <button className="leetcode-button">Practice in Leetcode</button>
                    </a>
                </div>
            </Container>
        );
    }
}

export default Home;



