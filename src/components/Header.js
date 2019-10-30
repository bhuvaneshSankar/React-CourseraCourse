import React, {Component} from 'react';
import { Jumbotron} from 'reactstrap';
import Navbar from './Navbar';
class Header extends Component{
    render(){
        return(
            <React.Fragment>  {/*used to group react fragments*/}
                <Navbar name="ristorante di confusion"/>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                        <div className="col-12 col-sm-6">
                            <h1>Ristorante con Fusion</h1>
                            <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                        </div>
                        </div>
                    </div>
                </Jumbotron>
            </React.Fragment>
        );
    }
}
export default Header;