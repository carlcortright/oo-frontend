import React, { Component } from 'react';
import { GetClass } from '../api/APIHelpers'

class ClassroomView extends Component {
    componentDidMount () {
        const { classroom } = this.props.match.params
        console.log(classroom)
        let response = GetClass(classroom)
        response.then(function(result) {
            console.log(result);
        })
    }

    render() {
        return (
        <div>
            <p>Classroom Question View</p>
        </div>
        );
    }
}

export default ClassroomView;
