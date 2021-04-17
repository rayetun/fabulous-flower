import React, { useEffect, useState, useContext } from 'react';
import './OrderPage.css';
import { Container, Row, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router';
import { UserContext } from '../../App';

const OrderPage = () => {
    const [loggedInUser,setLoggedInUser] = useContext(UserContext);

    const [orders, setOrders] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8000/orders?email='+loggedInUser.email)
        .then(res => res.json())
        .then(data => setOrders(data))
    }, [])
    console.log(orders);
    return (
        <div className="home order-details mt-5">
            <Container>
                <Row>
                    <div className="user-info">
                        <h5>Hello, {loggedInUser.displayName} your order summary</h5>
                    </div>
                </Row>
                <Row>              
                    {   orders.length === 0 && 
                        <div className="spinner-animation">
                            <Spinner animation="grow" variant="primary" />
                        </div>
                    }    
                </Row>
                <Row>
                    <table className="table table-stripped mt-5">
                    <thead>
                        <tr>
                            <th scope="col">User Name</th>
                            <th scope="col">User Email</th>
                            <th scope="col">Order Time</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Product Price</th>
                            <th scope="col">Product Image</th>
                        </tr>
                    </thead>
                    
                    {orders.map(orders => 
                        <tbody>
                            <tr>
                                <td >{orders.userName}</td>
                                <td>{orders.userEmail}</td>
                                <td>{orders.orderTime}</td>
                                <td>{orders.name}</td>
                                <td>$ {orders.price}</td>
                                <td><img src={orders.imageURL} alt={orders.name} /></td>
                            </tr>
                        </tbody>
                    )}
                    </table>
                </Row>
            </Container>
        </div>
    );
};

export default OrderPage;