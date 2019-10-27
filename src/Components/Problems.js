import React, { Component } from 'react'
import db from '../FirestoreConfig';
import { Table, Button, Row, Col, InputGroup, Input } from 'reactstrap';

export default class Problems extends Component {

    state = {
        items: [],
        inputUbicacion: '',
        inputProblema: '',
        inputSolucion: '',
        edit: false,
        id: ''
    }

    componentDidMount() {
        db.collection('problems').onSnapshot((snapShots) => (
            this.setState({
                items: snapShots.docs.map(doc => {
                    return { id: doc.id, data: doc.data() }
                })
            })
        ))
    };

    changeValue1 = (e) => {
        this.setState({
            inputUbicacion: e.target.value
        })
    }

    changeValue2 = (e) => {
        this.setState({
            inputProblema: e.target.value
        })
    }

    changeValue3 = (e) => {
        this.setState({
            inputSolucion: e.target.value
        })
    }



    action = () => {
        console.log('Action!');
        const { id, inputUbicacion, inputProblema, inputSolucion, edit } = this.state;
        if (!edit) {
            db.collection('problems').add({
                ubicacion: inputUbicacion,
                descripcion: inputProblema,
                solucion: inputSolucion === '' ? "Aun falta la solución" : inputSolucion
            }).then(() => {
                console.log("Se agrego!");
                this.setState({
                    inputUbicacion: '',
                    inputProblema: '',
                    inputSolucion: '',
                    id: '',
                    edit: false
                })
            }).catch(() => console.log('error'))
        } else {
            db.collection('problems').doc(id).update({
                ubicacion: inputUbicacion,
                descripcion: inputProblema
            }).then(() => {
                console.log('actualizado');
                this.setState({
                    inputUbicacion: '',
                    inputProblema: '',
                    inputSolucion: '',
                    id: '',
                    edit: false
                })
            }).catch((error) => {
                console.log(error)
            });
        }
    }

    edit = (id) => {
        let docRef = db.collection('problems').doc(id);

        docRef.get().then((doc) => {
            if (doc.exists) {
                console.log("existe");
                this.setState({
                    inputUbicacion: doc.data().ubicacion,
                    inputProblema: doc.data().descripcion,
                    inputSolucion: doc.data().solucion,
                    edit: true,
                    id: doc.id
                })
            } else {
                console.log('El documento no existe');
            }
        }).catch((error) => {
            console.log('error');
        })
    };

    deleteItem = (id) => {
        db.collection('problems').doc(id).delete();
    }


    render() {
        const { items, inputUbicacion, inputProblema, inputSolucion } = this.state;
        return (
            <div>
                <Row>
                    <Col xs="10">
                        <InputGroup>
                            <Input
                                placeholder="Ubicación"
                                value={inputUbicacion}
                                onChange={this.changeValue1}
                            />
                        </InputGroup>
                        <InputGroup>
                            <Input
                                type="textarea"
                                placeholder="Problema"
                                value={inputProblema}
                                onChange={this.changeValue2}
                            />
                        </InputGroup>
                        <InputGroup>
                            <Input
                                type="textarea"
                                placeholder="Solución"
                                value={inputSolucion}
                                onChange={this.changeValue3}
                            />
                        </InputGroup>
                    </Col>
                    <Col xs="2">
                        <div className="text-right">
                            <Button color="info" onClick={this.action}>
                                {this.state.edit ? 'Editar' : 'Agregar'}
                            </Button>
                        </div>
                    </Col>
                </Row>
                <br />
                <Table hover className="text-center">
                    <thead>
                        <tr>
                            <th>Ubicación</th>
                            <th>Problema</th>
                            <th>Solución</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items && items !== undefined ? items.map((item, key) => (
                            <tr key={key}>
                                <td>{item.data.ubicacion}</td>
                                <td>{item.data.descripcion}</td>
                                <td>{item.data.solucion}</td>
                                <td><Button color="warning" onClick={() => this.edit(item.id)}>Editar</Button></td>
                                <td><Button color="danger" onClick={() => this.deleteItem(item.id)}>Eliminar</Button></td>
                            </tr>
                        )) : null}
                    </tbody>
                </Table>
            </div>)
    }
}
