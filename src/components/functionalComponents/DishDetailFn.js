import React, {Component} from 'react'
import {Card, CardTitle, CardImg,  CardText, CardBody, Breadcrumb, BreadcrumbItem,} from 'reactstrap'
import {Link} from 'react-router-dom';
import {Button, FormGroup, Input, Label, Modal, ModalBody, ModalHeader} from 'reactstrap';
import { Control, Errors, LocalForm } from 'react-redux-form';
import {Loading} from '../LoadingComponent';
import {baseUrl} from '../../shared/baseUrl'
import {Fade} from 'react-animation-components';

;const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length<=len);
const minLength = (len) => (val) => val && (val.length>=len);

class CommentForm extends Component{
    constructor(){
        super();
        this.state={
          isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    toggleModal(){
        this.setState({
          isModalOpen: !this.state.isModalOpen
        })
      }
      handleSubmit(val){
        this.toggleModal();
        this.props.postComment(this.props.dishId, val.rating, val.author, val.comment)
      }
    render(){
        return(
            <React.Fragment>
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span>Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(val)=>this.handleSubmit(val)}>
                            <div className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" id="rating" 
                                placeholder="Rating"
                                name="rating"
                                className="form-control"
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Control.select>
                            </div>
                        <div className="form-group">
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text model=".author" id="author" name="author"
                                    placeholder=" Your Name"
                                    className="form-control"
                                    validators={{
                                        required, 
                                        minLength: minLength(3),
                                        maxLength: maxLength(15)
                                    }}
                                    />
                                    <Errors
                                      className="text-danger"
                                      model=".author"
                                      show="touched"
                                      messages={{
                                          required: 'Required',
                                          minLength: 'Must be greater than 2 characters',
                                          maxLength: 'Must be 15 characters or less'
                                      }}
                                    />
                            </div>
                            <div className="form-group">
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea model=".comment"  id="comment" name="comment" rows="6" className="form-control">
                                </Control.textarea>
                            </div>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                 </Modal>   
            </React.Fragment>
        );
    }
}
   function RenderDish({dish}){
        if(dish != null){
            return(
                    <Card>
                    <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name}/>
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
    function RenderComments({comments, postComment, dishId}){
        if(comments == null){
            return(
                <div></div>
            );
        }
        const comment = comments.map((comment)=>{
            return(
                <Fade in>
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>{`-- ${comment.author} , ${new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}`}</p>
                </li>  
                </Fade>
            )
        })
        return(
        <div>
            <h4>Comments</h4>
            <ul className="list-unstyled">
                {comment}
            </ul>
            <CommentForm dishId={dishId} postComment={postComment} />
        </div>
        )
    }
    
    const DishDetail = (props) => {

        const dish = props.dish;
        if(props.isLoading){
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            )
        }
        else if(props.errMess){
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if(dish==null){
            return(
                <div></div>
            );
        }
        else if(props.dish!=null){
            return(
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>                
                    </div>
                <div className="row">
                    <div className=" col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} postComment={props.postComment} dishId={props.dish.id}
                        />
                    </div>
                </div>  
            </div>
            );
        }
    }  

export default DishDetail;