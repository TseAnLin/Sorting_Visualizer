import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import './TextBlock.css';
import { useRef, onCopy } from 'react';
import './CodeBlock.css';
import Heapsort from './SortingVisualizer/Heapsort.jsx';


function HeapHome() {
    const [language, setLanguage] = useState('python');
    const codeRef = useRef(null);
    const pythonCode = `
    def heapify(arr, n, i):
      largest = i
      l = 2 * i + 1
      r = 2 * i + 2
    
      if l < n and arr[i] < arr[l]:
          largest = l
    
      if r < n and arr[largest] < arr[r]:
          largest = r
    
      if largest != i:
          arr[i], arr[largest] = arr[largest], arr[i]
          heapify(arr, n, largest)
    
    
    def heapSort(arr):
      n = len(arr)
    
      for i in range(n//2, -1, -1):
          heapify(arr, n, i)
    
      for i in range(n-1, 0, -1):
          arr[i], arr[0] = arr[0], arr[i]
    
          heapify(arr, i, 0)
    
`;
    const jsCode = `

    function heapSort(array) {
        let size = array.length
      
        for (let i = Math.floor(size / 2 - 1); i >= 0; i--)
          heapify(array, size, i)
      
        for (let i = size - 1; i >= 0; i--) {
          let temp = array[0]
          array[0] = array[i]
          array[i] = temp
          heapify(array, i, 0)
        }
      }
      
      function heapify(array, size, i) {
        let max = i
        let left = 2 * i + 1
        let right = 2 * i + 2
      
        if (left < size && array[left] > array[max])
          max = left
      
        if (right < size && array[right] > array[max])
          max = right
      
        if (max != i) {
          let temp = array[i]
          array[i] = array[max]
          array[max] = temp
      
          heapify(array, size, max)
        }
      }
      
`;
    const cppCode = `void heapify(int arr[], int n, int i) {
        int largest = i;
        int left = 2 * i + 1;
        int right = 2 * i + 2;
    
        if (left < n && arr[left] > arr[largest])
          largest = left;
    
        if (right < n && arr[right] > arr[largest])
          largest = right;
    
        if (largest != i) {
          swap(arr[i], arr[largest]);
          heapify(arr, n, largest);
        }
    }
    
    void heapSort(int arr[], int n) {
        for (int i = n / 2 - 1; i >= 0; i--)
          heapify(arr, n, i);
    
        for (int i = n - 1; i >= 0; i--) {
          swap(arr[0], arr[i]);
          heapify(arr, i, 0);
        }
    }
    `;

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
                    <Heapsort></Heapsort>
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
                                <p>Heap Sort is an in-place iterative sorting algorithm based on auxiliary data structures called heap. It's less efficient than algorithm with the same time complexity and it's not suitable for data structures with few elements.

                                    The heap is a data structure representable as a binary tree, where each node has a value bigger or equal to its children. Consequently, the root will hold the maximum value.</p>
                            </div>
                        </row>
                        <row>
                            <div id="text-block-2" >
                                <h3>Complexity</h3>
                                <p>Average:O(n × n)</p>
                                <p>Best:O(n × log n )</p>
                                <p>Worst:O(n × log n)</p>
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

export default HeapHome;



