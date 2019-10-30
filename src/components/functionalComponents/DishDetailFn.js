import React from 'react'
import {Card, CardTitle, CardImg,  CardText, CardBody} from 'reactstrap'

   function renderDish(dish){
        if(dish != null){
            return(
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name}/>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>

                    </CardBody>
                </Card>
            )
        }
        else{
            return(
                <div></div>   // nothing will be rendered on the screen
            )
        }
    }
    function renderComments(comments){
        if(comments == null){
            return(
                <div></div>
            );
        }
        const comment = comments.map((comment)=>{
            return(
                <li key={comment.id}>
                <p>{comment.comment}</p>
                <p>{`-- ${comment.author} , ${new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}`}</p>
            </li>  
            )
        })
        return(
        <div>
            <h4>Comments</h4>
            <ul className="list-unstyled">
                {comment}
            </ul>
        </div>
        )
    }
    
    const DishDetail = (props) => {
        const dish = props.dish;
        if(dish==null){
            return(
                <div></div>
            );
        }
        const dishDetails = renderDish(dish);
        const dishComments = renderComments(dish.comments);
        return(
            <div className="row">
                <div className=" col-12 col-md-5 m-1">
                    {dishDetails}
                </div>
                <div className="col-12 col-md-5 m-1">
                    {dishComments}
                </div>
            </div>
        );
    }  


export default DishDetail;