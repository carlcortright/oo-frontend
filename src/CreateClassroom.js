import React, { Component } from 'react';
import { Button, Flex, Heading } from 'rebass';
import styled from 'styled-components'
import { CreateClassroomAPI } from './APIHelpers';
import logo from './cap.png';

class CreateClassroom extends Component {

    constructor(props){
        super(props);
        this.state = {
            classname: ''
        }
    }

    createClass = () => {
        // create new classroom based on the name the user entered
        let self = this;
        let response = CreateClassroomAPI(this.state.classname);
        response.then(function(result){
            // TODO: Handle Errors
            console.log(result)
            let name = result.data.class_name;
            self.props.history.push('/class/' + name)
        })
        
    }

    updateClassname = (event) => {
        this.setState({
            classname: event.target.value
        });
    }

    render() {
        return (
            // main elements of site located here, using some rebass elements
            <div className="wrapper">
                <div className="heading">
                    <p className="title">ClassQ&A</p>
                    <img src={logo} alt="cap logo" className="logo"/>
                </div>
                <div className="leftDiv"></div>
                <div className="mainDiv">
                    <p className="welcome">
                        Welcome!
                    </p>
                    <CreateDiv>
                        <ClassInput 
                            placeholder='Classroom Name'
                            value={this.state.classname} 
                            onChange={this.updateClassname}
                        ></ClassInput>
                        <Button 
                            bg='#175451'
                            my={3}
                            alignSelf='center'
                            fontSize={4}
                            onClick={this.createClass}
                        >
                            Create Classroom
                        </Button>
                    </CreateDiv>
                </div>
                <div className="rightDiv"></div>
            </div>
        );
    }
}

// styling for the rebass elements

const TallFlex = styled(Flex)`
  height: calc(100vh - 60px);
`

const CreateDiv = styled.div`
    flex: 0 1 600px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    font-family: 'Actor', sans-serif;
`

const ClassInput = styled.input`
    width: 80%;
    font-size: 22px;
    border-radius: 5px;
    border: 2px solid #ccc;
    padding: 3px;
`

export default CreateClassroom;
