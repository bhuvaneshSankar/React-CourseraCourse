import React, {Component} from 'react';
//import MenuCard from './MenuComponentCard';
import MenuCard from './functionalComponents/Menu';
//import DishDetail from './DishdetailComponent';
import DishDetail from './functionalComponents/DishDetailFn';
import {postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeedback} from '../redux/ActionCreators';
import {actions} from 'react-redux-form';

import Home from './Home';
import Header from './Header';
import Footer from './Footer';
import About from './AboutComponent';
import Contact from './functionalComponents/ContactComponent';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
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
    postComment:(dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    fetchDishes: () => { dispatch(fetchDishes()) },
    resetFeedbackForm: () => {dispatch(actions.reset('feedback'))},
    fetchComments: () => {dispatch(fetchComments())},
    fetchPromos: () => {dispatch(fetchPromos())},
    fetchLeaders: () => {dispatch(fetchLeaders())},
    postFeedback:(feedback) => dispatch(postFeedback(feedback))
});
class Main extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.fetchDishes();
        this.props.fetchPromos();
        this.props.fetchLeaders();
    }
    onDishSelect(dishId){
        this.setState({selectedDishId : dishId});
    }
    render(){
        const HomePage = () => {
            return(
                <Home 
                    dish = {this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                    dishesLoading={this.props.dishes.isLoading}
                    dishesErrMess={this.props.dishes.errMess}
                    promotion = {this.props.promotions.promotions.filter((promo)=>promo.featured)[0]}
                    promosLoading = {this.props.promotions.isLoading}
                    promosErrMess = {this.props.promotions.errMess}
                    leader = {this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                    leadersLoading = {this.props.leaders.isLoading}
                    leadersErrMess = {this.props.leaders.errMess}
                />
            );
        }
        const DishWithId = ({match}) => {
            let result = this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10));
            return(
                <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                  isLoading={this.props.dishes.isLoading}
                  errMess={this.props.dishes.errMess}
                  comments = {result}
                  commentsErrMess = {this.props.comments.errMess}
                  postComment={this.props.postComment}
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
                <TransitionGroup>
                    <CSSTransition key = {this.props.location.key} classNames="page" timeout={300}>
                        <Switch>
                            <Route path='/home' component={HomePage} />
                            <Route exact path='/menu' component={() => <MenuCard dishes={this.props.dishes} />} />
                            <Route exact path='/menu/:dishId' component={DishWithId} />
                            <Route exact path = '/contactus' component={()=> <Contact resetFeedbackForm={this.props.resetFeedbackForm}
                             postFeedback = {this.props.postFeedback}/>} />
                            <Route path = '/aboutus' component = {AboutUs} />
                            <Redirect to='/home' />   {/* default condition if the above two paths doesnt match*/}
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                
                <Footer />
            </div>
        );
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
