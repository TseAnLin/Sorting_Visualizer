import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Container} from 'react-bootstrap';

function Home() {
    
    return (
        <Container>
            <div className="Main" style={{ margin: 'auto', maxWidth: '800px', width: '90%', textAlign: 'justify' }}>
                <div id="Algorithm description ">
                    <h2>Algorithm</h2>
                    <p>A sorting algorithm is a procedure for arranging items in a list or array in a particular order, such as ascending or descending. The algorithm compares pairs of items and swaps them if they are in the wrong order until the entire list is sorted. There are many different sorting algorithms, each with its own strengths and weaknesses in terms of time and space complexity, stability, and adaptivity. Common sorting algorithms include bubble sort, insertion sort, selection sort, merge sort, quicksort, and heapsort. The choice of algorithm depends on the size of the data set, the distribution of the data, and the desired performance characteristics</p>
                    <p2>Let's get started!</p2>
                </div>            
            </div>
        </Container>
    );
}

export default Home;




