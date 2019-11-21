import React, {Component} from 'react';
//import MenuCard from './MenuComponentCard';
import MenuCard from './functionalComponents/Menu';
//import DishDetail from './DishdetailComponent';
import DishDetail from './functionalComponents/DishDetailFn';

import Home from './Home';
import Header from './Header';
import Footer from './Footer';
import About from './AboutComponent';
import Contact from './functionalComponents/ContactComponent';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
//withRouter for configuring with redux

import {connect} from 'react-redux';

import { tsImportEqualsDeclaration } from '@babel/types';

const mapStateToProps = state => {      // map the redux store's state into props that will become available to the component
    return{
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}
class Main extends Component{
    constructor(props){
        super(props);
        
        console.log(`constructor - MainComponent`);
    }
    getDerivedStateFromProps(){
        console.log(`getDerivedStateFromProps() - MainComponent`);
    }
    componentDidMount(){
        console.log(`componentDidMount - MC`);
    }
    onDishSelect(dishId){
        this.setState({selectedDishId : dishId});
    }
  //  shouldComponentUpdate(){
  //      console.log(`shouldComponentUpdate - MC`);
  //  }
    getSnapshotBeforeUpdate(){
        console.log(`getSnapshotBeforeUpdate - MC`);
    }
    componentDidUpdate(){
        console.log('componentDidUpdate - MC');
    }
    render(){
        console.log(`render - MC`);
      /*  let selectedDish = null;
        if(this.state.selectedDishId!=null){
            selectedDish = this.state.dishes.filter( (dish)=>
                dish.id === this.state.selectedDishId)[0];
            
        } */
        const HomePage = () => {
            return(
                <Home 
                    dish = {this.props.dishes.filter((dish) => dish.featured)[0]}
                    promotion = {this.props.promotions.filter((promo)=>promo.featured)[0]}
                    leader = {this.props.leaders.filter((leader) => leader.featured)[0]}
                />
            );
        }
        const DishWithId = ({match}) => {
            return(
                <DishDetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                comments = {this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))} />
            );
        }
        const AboutUs = () =>{
            return(
                <About
                    leaders = {this.props.leaders}
                />
            );
        }
        return(
            <div>
                <Header />
            {/*     <div className = "container">
                <MenuCard dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />
                <DishDetail dish={selectedDish} />
                </div>  */}
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/menu' component={() => <MenuCard dishes={this.props.dishes} />} />
                    <Route exact path='/menu/:dishId' component={DishWithId} />
                    <Route exact path = '/contactus' component={Contact} />
                    <Route path = '/aboutus' component = {AboutUs} />
                    <Redirect to='/home' />   {/* default condition if the above two paths doesnt match*/}
                </Switch>
                <Footer />
            </div>
        );
    }
}
export default withRouter(connect(mapStateToProps)(Main));

/*
 constructor()
     2. getDerivedStateFromProps()
     3. render()
     4. componentDidMount()

     1. getDerivedStateFromProps()
      2. shouldComponentUpdate()
      3. render()
      4. getSnapshotBeforeUpdate()
      5. componentDidUpdate()
     */