import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Form, Card, Checkbox, InputGroup, FormControl, Nav } from 'react-bootstrap';
import Home from "./Home.js";
import './SortingVisualizer/SortingVisualizer.css';
import Bubblesort from './BubbleHome.js';
import Heapsort from './HeapHome.js';
import Insertionsort from './InsertionHome.js';
import Quicksort from './QuickHome.js';
import Mergesort from './MergeHome.js';









const Main = () => {

    const [tablePage, setTablePage] = useState(0);

    //const history = useHistory();
    //const patientStates = useSelector(rMedSelectPatient);
    //console.log(patientStates)

    useEffect(() => {
        fbasePage();
    }, []);

    const fbasePage = () => {
        ReactDOM.render(
            <Home />,
            document.getElementById('managerView')
        );
    }

    const Merge_page = () => {
        ReactDOM.render(
            <Mergesort />,
            document.getElementById('managerView')
        );
    }
    const Quick_page = () => {
        ReactDOM.render(
            <Quicksort />,
            document.getElementById('managerView')
        );
    }
    const Heap_page = () => {
        ReactDOM.render(
            <Heapsort />,
            document.getElementById('managerView')
        );
    }
    const Insertion_page = () => {
        ReactDOM.render(
            <Insertionsort />,
            document.getElementById('managerView')
        );
    }
    const Bubble_page = () => {
        ReactDOM.render(
            <Bubblesort />,
            document.getElementById('managerView')
        );
    }

    return (
        <Container>
            <Row>
                <Col md="auto">
                    <Nav variant="tabs" defaultActiveKey="baseData" className="flex-row justify-content-center" style={{ border: 'none', fontWeight: "bold" }} >
                        <Nav.Link onClick={fbasePage}>Mainpage</Nav.Link>
                        <Nav.Link onClick={Merge_page}>Merge Sort</Nav.Link>
                        <Nav.Link onClick={Bubble_page}>Bubble Sort</Nav.Link>
                        <Nav.Link onClick={Insertion_page}>Insertion Sort</Nav.Link>
                        <Nav.Link onClick={Quick_page}>Quick Sort</Nav.Link>
                        <Nav.Link onClick={Heap_page}>Heap Sort</Nav.Link>
                    </Nav>
                </Col>
                <Col>
                    <div id="managerView"></div >
                </Col>
            </Row>
        </Container>
    )
}

export default Main;