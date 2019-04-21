import React, { Component } from 'react';

class ClassroomView extends Component {
    componentDidMount () {
        const { classroom } = this.props.match.params
        console.log(classroom)
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
