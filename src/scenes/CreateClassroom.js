import React, { Component } from 'react';
import { Button, Flex, Heading } from 'rebass';
import styled from 'styled-components'

class CreateClassroom extends Component {


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
                <ClassInput placeholder='Classroom Name'></ClassInput>
                <Button 
                    bg='#246068'
                    my={3}
                    alignSelf='center'
                    fontSize={4}
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
