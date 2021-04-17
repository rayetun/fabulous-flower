import React, { useEffect, useState } from 'react';
import { Button, Container, Row, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router';
import SingleFlower from '../SingleFlower/SingleFlower';
import background from "../../images/bg-1.png";
import "./Home.css"
const Home = () => {
    const [flowers, setFlowers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/flowers')
        .then(res => res.json())
        .then(data => setFlowers(data))
    }, [])
    return (
        <div className="home" style={{ backgroundImage: `url(${background})`, backgroundSize:'contain',backgroundPosition: 'center center', backgroundRepeat: 'repeat' }}>
            <Container>
                <Row>
                    <div className="d-flex justify-content-center align-items-center px-1">
                        <div className="col-md-12 slide">
                            <div className="row">
                                
                                {   flowers.length === 0 && 
                                    <div className="spinner-animation">
                                        <Spinner animation="grow" variant="primary" />
                                    </div>
                                }
                                
                            </div>
                            <div className="row">
                                {
                                    flowers.map(flowers =>
                                        <SingleFlower flowers={flowers}></SingleFlower>)
                                }
                            </div>
                        </div>
                    </div>
                </Row>
            </Container>
        </div>
    );
};

export default Home;