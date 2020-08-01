import React, { Component } from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';
import "../App.css"

class AppNavbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        }
    }

    //toggle navbar hamburger menu on small screens
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    //Navbar should be dark with lighter font colors. Hamburger appears on small screens for links
    render() {
        return (
            <div>
                <Navbar style={{backgroundColor: '#0e84e6', }}  expand="sm" className="mb-5 text-light">
                    <Container>
                        <NavbarBrand>My CRUD-dy Favorites List</NavbarBrand>
                        <NavbarToggler onClick={this.toggle}/>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className='ml-auto' navbar>
                                <NavItem>
                                    <NavLink href="https://piludu.io">
                                        piludu.io
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="https://github.com/dietbepis1">
                                        Github
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}


export default AppNavbar;