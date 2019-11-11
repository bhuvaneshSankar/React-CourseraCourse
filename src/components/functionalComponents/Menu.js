import React from 'react';
import {Card, CardTitle, CardImg, CardImgOverlay, CardText, CardBody, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';
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
        console.log("renderDish = " + dish);
        if(dish != null){
            return(
                <div key={dish.id} className="col-12 col-md-5 m-1">
                <Card>
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
    function RenderMenuItem({dish, onClick}){
        console.log("dish object = " + dish);
        return(
            <div key={dish.id} className="col-12 col-md-5 m-1">
                <Card>
                   <Link to={`/menu/${dish.id}`}> 
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardImgOverlay>
                        <CardTitle>{dish.name}</CardTitle>
                    </CardImgOverlay>
                    </Link>
                </Card>
            </div>
        );  
    }
    const MenuCard = (props) => {
        console.log("props = " + props);
        console.log("mc dish = " + props.dish);
        console.log(`render - MenuCard`);
        const menu = props.dishes.map((dish) => {
            return(
                <RenderMenuItem dish={dish} onClick={props.onClick}/>
            );
        });
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Menu</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Menu</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    {menu}
                </div>
            </div>
        );
    }


export default MenuCard;