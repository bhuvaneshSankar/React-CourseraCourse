import React, {Component} from 'react';
//import MenuCard from './MenuComponentCard';
import MenuCard from './functionalComponents/Menu';
//import DishDetail from './DishdetailComponent';
import DishDetail from './functionalComponents/DishDetailFn';
import {addComment, fetchDishes, fetchComments, fetchPromos} from '../redux/ActionCreators';
import {actions} from 'react-redux-form';

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
        leaders: state.leaders,
       
    }
}
const mapDispatchToProps = dispatch => ({
    addComment:(dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
    fetchDishes: () => { dispatch(fetchDishes()) },
   // resetFeedbackForm: () => { dispatch(actions.reset('feedback'))}
    resetFeedbackForm: () => {dispatch(actions.reset('feedback'))},
    fetchComments: () => {dispatch(fetchComments())},
    fetchPromos: () => {dispatch(fetchPromos())}
});
class Main extends Component{
    constructor(props){
        super(props);
        
        console.log(`constructor - MainComponent`);
    }
    getDerivedStateFromProps(){
        console.log(`getDerivedStateFromProps() - MainComponent`);
    }
    componentDidMount(){
     //   console.log(`componentDidMount - MC`);
        this.props.fetchDishes();
        console.log('call to fetch comments ', this.props.fetchComments());
        this.props.fetchPromos();
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
        const HomePage = () => {
            console.log("dishes in main component "+ this.props.dishes+" "+this.props.dishes.length);
            for(var i=0; i<this.props.dishes.length; i++){
                console.log(this.props.dishes[i]);
            }
            return(
                <Home 
                    dish = {this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                    dishesLoading={this.props.dishes.isLoading}
                    dishesErrMess={this.props.dishes.errMess}
                    promotion = {this.props.promotions.promotions.filter((promo)=>promo.featured)[0]}
                    promosLoading = {this.props.promotions.isLoading}
                    promosErrMess = {this.props.promotions.errMess}
                    leader = {this.props.leaders.filter((leader) => leader.featured)[0]}
                />
            );
        }
        const DishWithId = ({match}) => {
            console.log('props ', this.props);
            console.log('comments ' + this.props.comments.comments);
            let result = this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10));
            console.log("results ");
            for(let i=0; i<result.length; i++){
                console.log(result[i]);
            }
            return(
                <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                  isLoading={this.props.dishes.isLoading}
                  errMess={this.props.dishes.errMess}
                  comments = {result}
                  commentsErrMess = {this.props.comments.errMess}
                  addComment={this.props.addComment}
                />
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
                    <Route exact path = '/contactus' component={()=> <Contact resetFeedbackForm={this.props.resetFeedbackForm}/>} />
                    <Route path = '/aboutus' component = {AboutUs} />
                    <Redirect to='/home' />   {/* default condition if the above two paths doesnt match*/}
                </Switch>
                <Footer />
            </div>
        );
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

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