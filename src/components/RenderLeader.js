import React from 'react';
import {Media} from 'reactstrap';
function RenderLeader(props){
    const leader = props.leaders.map((leader)=>{
        return(
            <Media tag="li">
                <Media left>
                    <Media object src = {leader.image} alt={leader.name} />
                </Media>
                <Media body className="ml-4">
                    <Media heading>{leader.name}</Media>
                    <p>{leader.designation}</p> <br></br>
                    <p>{leader.description}</p>
                </Media>
            </Media>
        );
    })
    return(
        <div className="row">
            <div className="col-12">
                {leader}
            </div>
        </div>
    );
}


export default RenderLeader;
