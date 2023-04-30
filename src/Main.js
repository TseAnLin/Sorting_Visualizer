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


class Main extends React.Component {
    //const [tablePage, setTablePage] = useState(0);

    /*
    useEffect(() => {
        fbasePage();
        handleSort();
        //setIsSorting(false);
    }, []);*/

    constructor(props) {
        super(props);
        this.state = {
            isSorting: false,
        }
    }

    componentDidMount() {
        this.fbasePage();
    }

    sortingDetect = (sorting) => {
        this.setState({ isSorting: sorting });
    }

    fbasePage = () => {
        ReactDOM.render(
            <Home />,
            document.getElementById('managerView')
        );
    }

    Merge_page = () => {
        ReactDOM.render(
            //<Mergesort isSorting={this.state.isSorting} sortingDetect={this.state.sortingDetect} />,
            <Mergesort isSorting={this.state.isSorting} sortingDetect={this.sortingDetect} />,
            document.getElementById('managerView')
        );
    }
    Quick_page = () => {
        ReactDOM.render(
            <Quicksort isSorting={this.state.isSorting} sortingDetect={this.sortingDetect} />,
            document.getElementById('managerView')
        );
    }
    Heap_page = () => {
        ReactDOM.render(
            <Heapsort isSorting={this.state.isSorting} sortingDetect={this.sortingDetect} />,
            document.getElementById('managerView')
        );
    }
    Insertion_page = () => {
        ReactDOM.render(
            <Insertionsort isSorting={this.state.isSorting} sortingDetect={this.sortingDetect} />,
            document.getElementById('managerView')
        );
    }
    Bubble_page = () => {
        ReactDOM.render(
            <Bubblesort isSorting={this.state.isSorting} sortingDetect={this.sortingDetect} />,
            document.getElementById('managerView')
        );
    }
    render() {
        return (
            <Container>
                <Row>
                    <Col md="auto">
                        <Nav variant="tabs" defaultActiveKey="baseData" className="flex-row justify-content-center"
                            style={{ border: 'none', marginTop: "1vh", width: "87.5vw", fontSize: "1.2vw" }}>
                            <Nav.Link disabled={this.state.isSorting} onClick={this.fbasePage} style={{ color: "black", fontFamily: "font-family: 'Doppio One', sans-serif" }}>Mainpage</Nav.Link>
                            <Nav.Link disabled={this.state.isSorting} onClick={this.Merge_page} style={{ color: "black", fontFamily: "font-family: 'Doppio One', sans-serif" }}>Merge Sort</Nav.Link>
                            <Nav.Link disabled={this.state.isSorting} onClick={this.Bubble_page} style={{ color: "black", fontFamily: "font-family: 'Doppio One', sans-serif" }}>Bubble Sort</Nav.Link>
                            <Nav.Link disabled={this.state.isSorting} onClick={this.Insertion_page} style={{ color: "black", fontFamily: "font-family: 'Doppio One', sans-serif" }}>Insertion Sort</Nav.Link>
                            <Nav.Link disabled={this.state.isSorting} onClick={this.Quick_page} style={{ color: "black", fontFamily: "font-family: 'Doppio One', sans-serif" }}>Quick Sort</Nav.Link>
                            <Nav.Link disabled={this.state.isSorting} onClick={this.Heap_page} style={{ color: "black", fontFamily: "font-family: 'Doppio One', sans-serif" }}>Heap Sort</Nav.Link>
                        </Nav>
                    </Col>
                    <Col>
                        <div id="managerView"></div >
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Main;

