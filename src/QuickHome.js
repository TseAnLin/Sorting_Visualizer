import React from 'react';
import Quicksort from './SortingVisualizer/Quicksort';
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
    const pythonCode = `def partition(array, start, end):
    pivot = array[start]
    low = start + 1
    high = end

    while True:
        while low <= high and array[high] >= pivot:
            high = high - 1

        while low <= high and array[low] <= pivot:
            low = low + 1

        if low <= high:
            array[low], array[high] = array[high], array[low]
        else:
            break

    array[start], array[high] = array[high], array[start]

    return high

def quick_sort(array, start, end):
    if start >= end:
        return

    p = partition(array, start, end)
    quick_sort(array, start, p-1)
    quick_sort(array, p+1, end)
`;
    const jsCode = `
    function quickSort(array, start, end) {
        if (start === undefined) {
          start = 0;
          end = array.length - 1;
        } else if (start >= end) {
          return array;
        }
        var rStart = start, rEnd = end;
        var pivot = array[Math.floor(Math.random() * (end - start + 1) + start)];
        while (start < end) {
          while (array[start] <= pivot) start++;
          while (array[end] > pivot) end--;
          if (start < end) {
            var temp = array[start];
            array[start] = array[end];
            array[end] = temp;
          }
        }
        quickSort(array, rStart, start - 1);
        quickSort(array, start, rEnd);
      }
`;
    const cppCode = `void swap(int* a, int* b)
    {
        int t = *a;
        *a = *b;
        *b = t;
    }
    
    int partition (int arr[], int low, int high)
    {
        int pivot = arr[high];
        int i = (low - 1);
    
        for (int j = low; j <= high- 1; j++)
        {
            if (arr[j] <= pivot)
            {
                i++;
                swap(&arr[i], &arr[j]);
            }
        }
        swap(&arr[i + 1], &arr[high]);
        return (i + 1);
    }
    
    void quickSort(int arr[], int low, int high)
    {
        if (low < high)
        {
            int pivot = partition(arr, low, high);
    
            quickSort(arr, low, pivot - 1);
            quickSort(arr, pivot + 1, high);
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
                    <Quicksort></Quicksort>
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
                                <p>Quick Sort is a sorting algorithm based on splitting the data structure in smaller partitions and sort them recursively until the data structure is sorted.

                                    This division in partitions is done based on an element, called pivot: all the elements bigger than the pivot get placed on the right side of the structure, the smaller ones to the left, creating two partitions. Next, this procedure gets applied recursively to the two partitions and so on.</p>
                            </div>
                        </row>
                        <row>
                            <div id="text-block-2" >
                                <h3>Complexity</h3>
                                <p>Average:O(n × log n)</p>
                                <p>Best:O(n × log n)</p>
                                <p>Worst:O(n ×  n)</p>
                                <p>Space:O(n)</p>
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



