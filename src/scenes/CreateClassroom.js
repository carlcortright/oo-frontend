import React, { Component } from 'react';
import { Button, Flex } from 'rebass';
import styled from 'styled-components'

class CreateClassroom extends Component {
  render() {
    return (
        <TallFlex
        alignItems='center'
        justifyContent='center'
        flexWrap='wrap'
        >
            <ClassInput></ClassInput>
            <Button bg='#246068'>Create Classroom</Button>
        </TallFlex>
    );
  }
}

const TallFlex = styled(Flex)`
  height: 100vh;
`

const ClassInput = styled.input`
    width: 400px;
    flex: 0 0 100%;
`

export default CreateClassroom;
