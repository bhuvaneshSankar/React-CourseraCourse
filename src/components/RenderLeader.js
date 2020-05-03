import React from 'react';
import {Media} from 'reactstrap';
import {baseUrl} from '../shared/baseUrl';
import {Fade, Stagger} from 'react-animation-components';

function RenderLeader(props){
    
    const leader = props.leaders.leaders.map((leader)=>{
        return(
            <Stagger in> 
                <Fade in>
                    <Media tag="li">
                        <Media left>
                            <Media object src = {baseUrl + leader.image} alt={baseUrl + leader.name} />
                        </Media>
                        <Media body className="ml-4">
                            <Media heading>{leader.name}</Media>
                            <p>{leader.designation}</p> <br></br>
                            <p>{leader.description}</p>
                        </Media>
                    </Media>
                </Fade>
            </Stagger>
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
