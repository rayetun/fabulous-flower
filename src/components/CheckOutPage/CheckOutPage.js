import React, { useEffect, useState, useContext } from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './CheckOutPage.css';

const CheckOutPage = (props) => {
    
    const { _id } = useParams();
    const [loggedInUser,setLoggedInUser] = useContext(UserContext);

    const [flowers, setFlowers] = useState([]);

    useEffect(() => {
        fetch('https://shrouded-plains-86393.herokuapp.com/flowers')
        .then(res => res.json())
        .then(data => setFlowers(data))
    }, [])

    const match = flowers.find(pd => pd._id === _id);
    
    const orderHandler = () =>{
        const flowerData = {
            name: match?.name,
            price: match?.price,
            imageURL: match?.imageURL,
            userName: loggedInUser.displayName,
            userEmail: loggedInUser.email,
            orderTime: new Date().toDateString('dd/M/yyyy'),
        };
        const url =`https://shrouded-plains-86393.herokuapp.com/addOrder`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(flowerData)
        })
        
    };

    return (
        <div>
            <Container>
                <Row>
                    <div className="col-md-12 slide mt-5">
                        <div className="checkout-details mt-5">
                            <h2>CheckOut</h2>
                            <table className="table table-stripped mt-5">
                                <thead>
                                    <tr>
                                    <th scope="col">Product Image</th>
                                    <th scope="col">Product Name</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Flower Price</th>
                                    </tr>
                                </thead>
                                <tr>
                                    <td><img src={match?.imageURL} alt={match?.name} /></td>
                                    <td>{match?.name}</td>
                                    <td>1</td>
                                    <td>$ {match?.price}</td>
                                </tr>
                                <thead>
                                    <tr>
                                    <th className="special-th" scope="col">Total</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                    <th className="special-th" scope="col">$ {match?.price}</th>
                                    </tr>
                                </thead>
                                <thead>
                                    <tr className="no-border">
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                    <th scope="col"><Link to={`/`} onClick={orderHandler} className="btn btn-success">Order Now</Link></th>
                                    </tr>
                                </thead>
                            </table>

                        </div>
                    </div>
                </Row>
            </Container>
        </div>
    );
};

export default CheckOutPage;