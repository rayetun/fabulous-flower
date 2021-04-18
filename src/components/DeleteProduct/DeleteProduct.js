import React, { useEffect, useState } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import './DeleteProduct.css'


const DeleteProduct = () => {
    const [flowers, setFlowers] = useState([]);
    useEffect(() => {
        fetch('https://shrouded-plains-86393.herokuapp.com/flowers')
        .then(res => res.json())
        .then(data => setFlowers(data))
    }, [])

    const deleteFlower = (id) => {
        const url =`https://shrouded-plains-86393.herokuapp.com/delete/${id}`;
        fetch(url, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(result => {
            console.log("Please Delete It")
        })
    }
    return (
        <div className="home">
            <Container className="special-bg">
                <Row>
                    <table className="table table-stripped">
                    <thead>
                        <tr>
                        <th scope="col">Flower Name</th>
                        <th scope="col">Flower Color</th>
                        <th scope="col">Flower Price</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    {flowers.map(flowers => 
                    <tbody>
                        <tr>
                            <td className="special-td">{flowers.name}</td>
                            <td>{flowers.color}</td>
                            <td>{flowers.price}</td>
                            <Button onClick={() => deleteFlower(flowers._id)}>Delete</Button>
                        </tr>
                    </tbody>
                    )}
                    </table>
                </Row>
            </Container>
        </div>
    );
};

export default DeleteProduct;