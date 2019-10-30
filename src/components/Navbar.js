import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
class Navigationbar extends Component {
    constructor(props) {
        super(props);
        console.log(`constructor - Navbar`);
    }
    getDerivedStateFromProps() {
        console.log(`getDerivedStateFromProps() - Navbar`);
    }
    componentDidMount() {
        console.log(`componentDidMount - Nav`);
    }
    shouldComponentUpdate() {
        console.log(`shouldComponentUpdate - Nav`);
    }
    getSnapshotBeforeUpdate() {
        console.log(`getSnapshotBeforeUpdate - Nav`);
    }
    componentDidUpdate() {
        console.log('componentDidUpdate - Nav');
    }
    render() {
        console.log(`render - Nav`);
        return (
            <div>
                <Navbar dark color="primary">
                    <div className="container">
                        <NavbarBrand href="/">{this.props.name}</NavbarBrand>
                    </div>
                </Navbar>
            </div>

        );
    }
}
export default Navigationbar;