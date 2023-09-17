import React from 'react';
import Bubblesort from './SortingVisualizer/Bubblesort';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import './TextBlock.css';
import { useRef, onCopy } from 'react';
import './CodeBlock.css';

const pythonCode = `def bubbleSort(arr):
    n = len(arr)
    for i in range(n-1):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]

`;
const jsCode = `
    
function bubbleSort(arr) {
    for(var i = 0; i < arr.length; i++) {
        for(var j = 0; j < ( arr.length - i -1 ); j++) {
            if(arr[j] > arr[j+1]) {
              var temp = arr[j]
              arr[j] = arr[j + 1]
              arr[j+1] = temp
            }
        }
    }
}
`;
const cppCode = `
    void swap(int *xp, int *yp) {
        int temp = *xp;
        *xp = *yp;
        *yp = temp;
    }
    
    
    void bubbleSort(int arr[], int n) {
        int i, j;
        for (i = 0; i < n-1; i++)
            for (j = 0; j < n-i-1; j++)
                if (arr[j] > arr[j+1])
                    swap(&arr[j], &arr[j+1]);
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
                        <Bubblesort {...this.props}></Bubblesort>
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
                                    <p>Bubble sort is a basic algorithm for arranging a string of numbers or other elements in the correct order. The method works by examining each set of adjacent elements in the string, from left to right, switching their positions if they are out of order. The algorithm then repeats this process until it can run through the entire string and find no two elements that need to be swapped.</p>
                                </div>
                            </row>
                            <row>
                                <div id="text-block-2" >
                                    <h3>Complexity</h3>
                                    <p>Average : O(n ×  n)</p>
                                    <p>Best : O(n )</p>
                                    <p>Worst : O(n ×  n)</p>
                                    <p>Space : O(1)</p>
                                </div>

                            </row>
                        </div>
                    </Col>
                </Row>
                <br />
                <br />
                <div className="leetcode-container">
                    <a href="https://leetcode.com/problemset/all/" target="_blank" rel="noreferrer">
                        <button className="leetcode-button">Practice in Leetcode</button>
                    </a>
                </div>
            </Container>
        );
    }
}

export default Home;
/*
function Home() {
    const [language, setLanguage] = useState('python');
    const codeRef = useRef(null);

    function handleCopyClick() {
        const codeElement = codeRef.current;
        if (codeElement) {
            const range = document.createRange();
            range.selectNode(codeElement);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
            document.execCommand('copy');
            window.getSelection().removeAllRanges();

        }
    }

    function handleLanguageChange(event) {
        setLanguage(event.target.value);
    }

    let code;
    if (language === 'python') {
        code = pythonCode;
    } else if (language === 'javascript') {
        code = jsCode;
    } else if (language === 'cpp') {
        code = cppCode;
    }
    return (
        <Container>
            <Row>
                <Col >
                    <Bubblesort></Bubblesort>
                </Col>
            </Row>
            <Row>
                <Col md={6} className='code'>
                    <div className="code-block">
                        <select value={language} onChange={handleLanguageChange}>
                            <option value="python">Python</option>
                            <option value="javascript">JavaScript</option>
                            <option value="cpp">C++</option>
                        </select>
                        <button onClick={handleCopyClick}>Copy</button>
                        <pre ref={codeRef} className={`language-${language}`}>
                            {code}
                        </pre>
                    </div>
                </Col>
                <Col md={6}>
                    <div className="TextBlock"  >
                        <row>
                            <div id="text-block">
                                <h2>Description</h2>
                                <p>Bubblesort that divides the data structure recursively until the subsequences contain only one element. At this point, the subsequences get merged and ordered sequentially. To do so, the algorithm progressively builds the sorted sublist by adding each time the minimum element of the next two unsorted subsequences until there is only one sublist remaining. This will be the sorted data structure</p>
                            </div>
                        </row>
                        <row>
                            <div id="text-block-2" >
                                <h3>Complexity</h3>
                                <p>Average : O(n ×  n)</p>
                                <p>Best : O(n )</p>
                                <p>Worst : O(n n ×  n)</p>
                                <p>Space : O(1)</p>
                            </div>

                        </row>
                    </div>
                </Col>
            </Row>
            <br />
            <div className="leetcode-container">
                <a href="https://leetcode.com/problemset/all/" target="_blank" rel="noreferrer">
                    <button className="leetcode-button">Practice in Leetcode</button>
                </a>
            </div>
        </Container>
    );
}

export default Home;
*/


