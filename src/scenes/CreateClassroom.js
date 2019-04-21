import React, { Component } from 'react';
import { Button, Flex, Heading } from 'rebass';
import styled from 'styled-components'
import { CreateClassroomAPI } from '../api/APIHelpers';

class CreateClassroom extends Component {

    constructor(props){
        super(props);
        this.state = {
            classname: ''
        }
    }

    createClass = () => {
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
            <TallFlex
            alignItems='center'
            justifyContent='center'
            flexWrap='wrap'
            >
                <CreateDiv>
                    <Heading 
                        textAlign='center'
                        fontSize={[ 6, 8 ]}
                        p={4}
                    >
                        ClassQA
                    </Heading>
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
                
            </TallFlex>
        );
    }
}

const TallFlex = styled(Flex)`
  height: calc(100vh - 60px);
`

const CreateDiv = styled.div`
    flex: 0 1 600px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

const ClassInput = styled.input`
    width: 100%;
    font-size: 22px;
    border-radius: 5px;
    border: 2px solid #ccc;
    padding: 3px;
`

export default CreateClassroom;
