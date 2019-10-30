import React, {Component} from 'react';
//import MenuCard from './MenuComponentCard';
import MenuCard from './functionalComponents/Menu';
//import DishDetail from './DishdetailComponent';
import DishDetail from './functionalComponents/DishDetailFn';
import { DISHES } from '../shared/dishes';
import Header from './Header';
import Footer from './Footer';
class Main extends Component{
    constructor(props){
        super(props);
        this.state = {
            dishes : DISHES,
            selectedDishId : null
        };
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
        let selectedDish = null;
        if(this.state.selectedDishId!=null){
            selectedDish = this.state.dishes.filter( (dish)=>
                dish.id === this.state.selectedDishId)[0];
            
        }
        return(
            <div>
                <Header />
                <div className = "container">
                <MenuCard dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />
                <DishDetail dish={selectedDish} />
                </div>
                <Footer />
            </div>
        );
    }
}
export default Main;

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