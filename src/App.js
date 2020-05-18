import React, { Component } from "react";
import ReactDom from "react-dom";
import uuid from "uuid";
import { Add, RemoveItemFromList, updated } from "./practice/actions/addressbook";
import { Col, Button, Container, Row, Card, Form, variant, Modal } from 'react-bootstrap';
import { connect } from "react-redux";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: null,
            last_name: null,
            email: null,
            contact_number: null,
            updated_first_name: null,
            updated_last_name: null,
            updated_email: null,
            updated_contact_number: null,
            editid: null,
            show: false,
            modalshow: false,
        };

        this.Get_value = this.Get_value.bind(this);
        this.submithandler = this.submithandler.bind(this);
        this.list_value = this.list_value.bind(this);
        this.Edithandler = this.Edithandler.bind(this);
        this.modalClosehandle = this.modalClosehandle.bind(this)
    }

    Get_value(event) {
        this.setState({ value: event.target.value });
    }
    modalClosehandle = (event) => {
        this.setState({
            modalshow: false
        })
    }


    onchangehandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    firstnameupdatedhandler = (event) => {
        // console.log(event.target.value);
        this.setState({
            updated_first_name: event.target.value
        })
    }
    lastnameupdatedhandler = (event) => {
        // console.log(event.target.value);
        this.setState({
            updated_last_name: event.target.value
        })
    }
    emailupdatechangehandler = (event) => {
        // console.log(event.target.value);
        this.setState({
            updated_email: event.target.value
        })
    }

    contactnumberchangehandler = (event) => {
        // console.log(event.target.value);
        this.setState({
            updated_contact_number: event.target.value
        })
    }


    // for add value
    submithandler = (event) => {
        event.preventDefault()
        // console.log("input data", this.state)
        if (this.state !== "") {
            // alert(this.state);
            var data = {};
            data.id = uuid.v4();
            data.item = this.state;
            this.props.dispatch(Add(data));
            this.setState({ first_name: "", last_name: "", contact_number: "", email: "" });
        }
    }

    Edithandler = (event) => {
        var edit_id = event.target.id;
        var myavailabledolist = this.props.myavailabledolist;
        const data = myavailabledolist.find(item => item.id === edit_id);
        this.setState({
            modalshow: true,
            editid: edit_id,
            updated_first_name: data.item.first_name,
            updated_last_name: data.item.last_name,
            updated_email: data.item.email,
            updated_contact_number: data.item.contact_number
        })
    }

    updated_submithandler = (event) => {
        event.preventDefault()
        this.setState({ modalshow: false, })
        if (this.state !== "") {
            var newdata = {};
            newdata.id = this.state.editid;
            newdata.first_name = this.state.updated_first_name;
            newdata.last_name = this.state.updated_last_name;
            newdata.email = this.state.updated_email;
            newdata.contact_number = this.state.updated_contact_number;
            this.props.dispatch(updated(newdata));
        }
    }



    //for remove single value
    list_value(event) {
        // alert();
        this.props.dispatch(RemoveItemFromList(event.target.id))
    }

    // for see avilabel state on load componenetdidmount menthod
    componentDidMount() {
        console.log("available", this.props.myavailabledolist);
    }

    render() {
        var myavailabledolist = this.props.myavailabledolist;
        // console.log(myavailabledolist);
        if (myavailabledolist.length > 0 && myavailabledolist!==null) {
            var list = myavailabledolist.map(item => (
                <Col sm={4} >
                    <div className="address_listing">
                        <h5>Name : {item.item.first_name}{item.item.last_name}</h5>
                        <p> Email : {item.item.email}<br />
                         Contact Number : {item.item.contact_number}</p>
                        <span>
                            <Button className="pull-right" variant="danger" id={item.id} onClick={this.list_value}>Delete</Button>
                            <Button variant="primary" id={item.id} onClick={this.Edithandler}  >Edit</Button>
                        </span>
                    </div>
                </Col>
            ));
        }
        else {
            list = <div className="text-center w-100"><h2>No Address Found </h2></div>
        }

        const { first_name, last_name, contact_number, email, updated_first_name, updated_last_name, updated_email, updated_contact_number, edit_id } = this.state;
        return (

            <div style={{ backgroundColor: "#2a283d", color: "wheat" }}>
                <Container>
                    <h1 className="text-center mt2">Address Book</h1>
                    <Form onSubmit={this.submithandler}>
                        <Row>
                            <Col sm={6}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label> First Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter First Name" name="first_name" onChange={this.onchangehandler} value={first_name} />
                                </Form.Group>
                            </Col>
                            <Col sm={6}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label> Last Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Last Name" name="last_name" onChange={this.onchangehandler} value={last_name} />
                                </Form.Group>
                            </Col>
                            <Col sm={6}>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" name="email" onChange={this.onchangehandler} value={email} />
                                </Form.Group>
                            </Col>
                            <Col sm={6}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Contact Number</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Contact Number" name="contact_number" onChange={this.onchangehandler} value={contact_number} />
                                </Form.Group>
                            </Col>
                            <Col sm={12}>
                                <Button variant="success" type="submit"> Submit</Button>
                            </Col>
                        </Row>
                    </Form>

                    <Modal show={this.state.modalshow}  >
                        <Modal.Header closeButton onClick={this.modalClosehandle}>
                            <Modal.Title>Update Address Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={this.updated_submithandler}>
                                <Row>
                                    <Col sm={6}>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Control type="hidden" name="id" value={edit_id} />
                                            <Form.Label> First Name</Form.Label>
                                            <Form.Control type="text" onChange={this.firstnameupdatedhandler} name="first_name" value={updated_first_name} />
                                        </Form.Group>
                                    </Col>
                                    <Col sm={6}>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label> Last Name</Form.Label>
                                            <Form.Control type="text" onChange={this.lastnameupdatedhandler} name="last_name" value={updated_last_name} />
                                        </Form.Group>
                                    </Col>
                                    <Col sm={6}>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label> Email</Form.Label>
                                            <Form.Control type="email" onChange={this.emailupdatechangehandler} name="email" value={updated_email} />
                                        </Form.Group>
                                    </Col>
                                    <Col sm={6}>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label> Contact Number</Form.Label>
                                            <Form.Control type="text" onChange={this.contactnumberchangehandler} name="contact_number" value={updated_contact_number} />
                                        </Form.Group>
                                    </Col>
                                    <Col sm={12}>
                                        <Form.Group controlId="formBasicEmail">
                                            <Button variant="success" type="submit" className="themesflat-button blue"> Save Changes</Button>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>
                        </Modal.Body>
                    </Modal>

                    <Row className="all_address">
                        {list}
                    </Row>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        myavailabledolist: state.Addressbook
    };
};
export default connect(mapStateToProps)(App);
