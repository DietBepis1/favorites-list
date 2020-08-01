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

class ItemModal extends Component {
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

    onSubmit = (e) => {
        e.preventDefault();

        const newItem = {
            name: this.state.name
        }

        //post new item
        axios.post('/api/items', newItem)
        .then(res => {this.toggle()})
        .catch(err => console.log(err))

        //update list state
        this.props.onChange();
    }

    render() {
        return (
            <div>
                <Button
                 className='add-btn'
                 outline
                 color='dark'
                 onClick={this.toggle}
                >
                    Add Item
                </Button>
                <Modal
                 isOpen={this.state.modal}
                 toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Add to favorites</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>

                                <Label for="item">Item</Label>

                                <Input
                                 type='text'
                                 name='name'
                                 id='item'
                                 placeholder='Add item'
                                 onChange={this.onChange}
                                />
                                <Button
                                 outline
                                 color='success'
                                 style={{marginTop: '2rem'}}
                                 block
                                >
                                    Add to List
                                </Button>

                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default ItemModal;