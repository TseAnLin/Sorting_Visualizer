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





function Home() {
    const [language, setLanguage] = useState('python');
    const codeRef = useRef(null);
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
                                <p>Average:O(n ×  n)</p>
                                <p>Best:O(n )</p>
                                <p>Worst:O(n n ×  n)</p>
                                <p>Space:O(1)</p>
                            </div>
                        </row>
                    </div>
                </Col>
            </Row>
            <br />
        </Container>
    );
}

export default Home;



