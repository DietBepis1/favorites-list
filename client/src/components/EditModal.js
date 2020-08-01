import React, { Component } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import axios from 'axios'
import '../App.css';

class EditModal extends Component {
    state = {
        modal: false,
        name: ''
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e, id) => {
        e.preventDefault();

        const newItem = {
            _id: this.props.id,
            name: this.state.name
        }

        //post new item
        axios.put(`/api/items/${this.props.id}`, newItem)
        .then(res => {this.toggle()})
        .catch(err => console.log(err))

        //update list state
        this.props.onChange();
    }

    render() {
        return (
            <div className="edit-div">
                <Button
                 className='edit-btn'
                 outline
                 size='sm'
                 style={{marginRight: '1rem'}}
                 onClick={this.toggle}
                >
                    Edit
                </Button>
                <Modal
                 isOpen={this.state.modal}
                 toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Add to shopping list</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>

                                <Label for="item">Item</Label>

                                <Input
                                 type='text'
                                 name='name'
                                 id='item'
                                 placeholder='Edit me'
                                 onChange={this.onChange}
                                />
                                <Button
                                 outline
                                 color='success'
                                 style={{marginTop: '2rem'}}
                                 block
                                >
                                    Edit Item
                                </Button>

                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default EditModal;