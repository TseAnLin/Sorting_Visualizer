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





function Home() {
    const [language, setLanguage] = useState('python');
    const codeRef = useRef(null);
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
                    <Insertionsort></Insertionsort>
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
                                <p>Insertion sort is a simple sorting algorithm that builds the final sorted array one item at a time. It's less performant than advanced sorting algorithms, but it can still have some advantages: it's really easy to implement and it's efficient on small data structures almost sorted</p>
                            </div>
                        </row>
                        <row>
                            <div id="text-block-2" >
                                <h3>Complexity</h3>
                                <p>Average:O(n×n)</p>
                                <p>Best:O(n)</p>
                                <p>Worst:O(n ×  n)</p>
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



