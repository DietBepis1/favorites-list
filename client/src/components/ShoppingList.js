import React, { Component } from 'react';
import {
    Container,
    ListGroup,
    ListGroupItem,
    Button,
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';
import axios from 'axios';
import '../App.css';
import ItemModal from './ItemModal.js';
import EditModal from './EditModal.js';

class ShoppingList extends Component {
    state ={
        items: []
    }

    //gets updated item list from MongoDB after Get/Put/Del request
    onChange() {
        axios.get('/api/items')
        .then(res => {
            const items = [...res.data]
            this.setState({
                items: items
            })
        })
        .catch(err => {console.log(err)})
    }

    //deletes item from list
    deleteItem(id) {
        axios.delete(`/api/items/${id}`)
        .then(() => this.onChange())
        .catch(err => console.log(err))
    }

    //initial get request from MongoDB
    componentDidMount() {
        axios.get('/api/items')
        .then(res => {
            const items = [...res.data]
            this.setState({
                items: items
            })
        })
        .catch(err => {console.log(err)})
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.items !== nextState.items){
            return true;
            
        }
    }

    render() {
        return (
            <Container className="list-container">
                <ItemModal onChange={this.onChange.bind(this)}/>
                <ListGroup>
                    <TransitionGroup className='favorites-list'>
                        {this.state.items.map(({ _id, name }) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <div className='row'>
                                        <div className='flexbox-container'>
                                            <div>
                                            <Button
                                            className="remove-btn"
                                            outline
                                            color="danger"
                                            size="sm"
                                            style={{marginRight: '1rem', marginLeft: '1rem'}}
                                            onClick={this.deleteItem.bind(this, _id)}
                                            >
                                                &times;
                                            </Button>
                                            </div>
                                            <div>
                                            <EditModal onChange={this.onChange.bind(this)} id={_id} className='edit-modal'/>
                                            </div>
                                            <div>
                                                {name}
                                            </div>
                                        </div>
                                    </div>
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        )
    }
}

ShoppingList.propTypes = {
    items: PropTypes.object,
    deleteItem: PropTypes.func,
    onChange: PropTypes.func
}

export default ShoppingList;