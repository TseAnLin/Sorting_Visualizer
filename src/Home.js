import React from 'react';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer';
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
    const pythonCode = `type code hear`;
    const cppCode = `go practice now`;
    const jsCode = `nothing here`;

    function handleCopyClick() {
        const codeElement = codeRef.current;
        if (codeElement) {
            const range = document.createRange();
            range.selectNode(codeElement);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
            document.execCommand('copy');
            window.getSelection().removeAllRanges();
            ;
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
                    <SortingVisualizer></SortingVisualizer>
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
                        <Row>
                            <div id="text-block">
                                <h2>Description</h2>
                                <p>Merge Sort that divides the data structure recursively until the subsequences contain only one element. At this point, the subsequences get merged and ordered sequentially. To do so, the algorithm progressively builds the sorted sublist by adding each time the minimum element of the next two unsorted subsequences until there is only one sublist remaining. This will be the sorted data structure</p>
                            </div>
                        </Row>
                        <Row>
                            <div id="text-block-2" >
                                <h3>Complexity</h3>
                                <p>Average:O(n × log n)</p>
                                <p>Best:O(n × log n)</p>
                                <p>Worst:O(n × log n)</p>
                                <p>Space:O(n)</p>
                            </div>
                        </Row>
                    </div>
                </Col>
            </Row>
            <br />
        </Container>
    );
}

export default Home;



