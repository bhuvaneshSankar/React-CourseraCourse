import React, {Component} from 'react';
import {Card, CardTitle, CardImg, CardImgOverlay, CardText, CardBody} from 'reactstrap';
import Dishdetail from './DistdetailComponent';
import DishdetailRev from './DishRev';
class MenuCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedDish: null
        }
    }
    onDishSelect(dish){
        console.log('selected dish is ' + dish.name);
        this.setState({ selectedDish: dish});
    }
    renderDish(dish){
        if(dish != null){
            return(
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name}/>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>

                    </CardBody>
                </Card>
            );
        }
        else{
            return(
                <div></div>   // nothing will be rendered on the screen
            );
        }
    }
    render(){
        const menu = this.props.dishes.map((dish)=>{
            return(
            <div key={dish.id} className="col-12 col-md-5 m-1">
                <Card onClick={()=> this.onDishSelect(dish)}>
                    <CardImg width="100%" src={dish.image} alt={dish.name}/>
                    <CardImgOverlay>
                        <CardTitle>{dish.name}</CardTitle>
                    </CardImgOverlay>
                </Card>
            </div>
            );
        });
        return(
            <div className="container">
                <div className="row">
                    {menu}
                </div>
                <div>
                    <Dishdetail dish={this.state.selectedDish} />
                </div>
            </div>
        );
    }
}

export default MenuCard;