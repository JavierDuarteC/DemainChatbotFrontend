import React from 'react';
import { Row,Col,Jumbotron } from "reactstrap";

export default function Title() {
    return (
        <div>
            <Row>
                <Col xs="12">
                    <Jumbotron>
                        <h1 className="display-5">Demain Chatbot</h1>
                        <p className="lead"> React Frontend with Firebase Database</p>
                    </Jumbotron>
                </Col>
            </Row>
        </div>
    )
}
