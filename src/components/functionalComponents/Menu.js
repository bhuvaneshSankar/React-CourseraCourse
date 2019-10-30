import React from 'react';
import {Card, CardTitle, CardImg, CardImgOverlay, CardText, CardBody} from 'reactstrap';
//import Dishdetail from './functionalComponents/DishDetailFn';
//import Dishdetail from './DishdetailComponent';

    
    function getDerivedStateFromProps(){
        console.log(`getDerivedStateFromProps() - MenuComponentCard`);
    }
    function componentDidMount(){
        console.log(`componentDidMount - MenuCard`);
    }
    function shouldComponentUpdate(){
        console.log(`shouldComponentUpdate - MenuCard`);
    }
    function getSnapshotBeforeUpdate(){
        console.log(`getSnapshotBeforeUpdate - MenuCard`);
    }
    function componentDidUpdate(){
        console.log('componentDidUpdate - MenuCard');
    }
    function renderDish(dish, onClick){
        if(dish != null){
            return(
                <div key={dish.id} className="col-12 col-md-5 m-1">
                <Card onClick={()=> onClick(dish.id)}>
                    <CardImg width="100%" src={dish.image} alt={dish.name}/>
                    <CardImgOverlay>
                        <CardTitle>{dish.name}</CardTitle>
                    </CardImgOverlay>
                </Card>
                </div>
            );
        }
        else{
            return(
                <div></div>   // nothing will be rendered on the screen
            );
        }
    }
    const MenuCard = (props) => {
        console.log(`render - MenuCard`);
        const menu = props.dishes.map((dish) => {
            return(
                renderDish(dish, props.onClick)
            );
        });
        return(
            <div>
                <div className="row">
                    {menu}
                </div>
            </div>
        );
    }


export default MenuCard;