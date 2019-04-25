import React, { Component } from 'react';
import { GetClass, GetLatestQuestions } from './APIHelpers';
import logo from './cap.png';

class ClassroomView extends Component {

    constructor(props){
        super(props);
        this.state = {
            phone_number: null,
            questions: [],
            classname: '',
            last_question: 0
        }
    }

    componentDidMount () {
        let self = this;
        const { classroom } = this.props.match.params
        let response = GetClass(classroom)
        response.then(function(result) {
            // Make the call to get the initial classroom data
            let last_question_id = 0;
            if (result.data.questions.length > 0) {
                let last_index = result.data.questions.length - 1;
                last_question_id = result.data.questions[last_index].id;
            }
            self.setState({
                phone_number: result.data.phone_number,
                questions: result.data.questions,
                last_question: last_question_id,
                classname: classroom
            })
            // Start polling to get all new questions
            self.timer = setInterval(() => self.pollForQuestions(), 500);
        })
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    pollForQuestions = () => {
        let self = this;
        let response = GetLatestQuestions(this.state.classname, this.state.last_question)
        response.then(function(result){
            let data = result.data;
            if (data.length > 0){
                self.setState({
                    questions: self.state.questions.concat(data),
                    last_question: data[data.length-1].id
                })
            }
        })
    }

    formatPhoneNumber = (number_string) => {
        var cleaned = ('' + number_string).replace(/\D/g, '')
        var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
        if (match) {
            var intlCode = (match[1] ? '+1 ' : '')
            return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
        }
        return null
    }

    formatTimeStamp = (time_stamp) => {
        // 2019-04-22T17:25:45.353Z = 11:25am 4/22/19
        var characters = time_stamp.split("")
        return [characters[6], '/', characters[8], characters[9], '/', characters[0], characters[1], characters[2], characters[3]]
    }

    createQuestions = (questions) => {
        let cards = []
        for (let i = questions.length-1; i >= 0; i--) {
            let content = questions[i].content
            let qType = questions[i].question_type
            let time = questions[i].created
            if (qType == "GN") {
                cards.push(
                    <div className="question">
                        <p className="gen_question">General</p>
                        <p className="cont">{content}</p>
                        <p className="time">{this.formatTimeStamp(time)}</p>
                    </div>
                )
            }
            if (qType == "TF") {
                cards.push(
                    <div className="question">
                        <p className="tf_question">True-False</p>
                        <p className="cont">{content}</p>
                        <p className="time">{this.formatTimeStamp(time)}</p>
                    </div>
                )
            }
            if (qType == "SA") {
                cards.push(
                    <div className="question">
                        <p className="sa_question">Short Answer</p>
                        <p className="cont">{content}</p>
                        <p className="time">{this.formatTimeStamp(time)}</p>
                    </div>
                )
            }
            if (qType == "CM") {
                cards.push(
                    <div className="question">
                        <p className="cm_question">Comment</p>
                        <p className="cont">{content}</p>
                        <p className="time">{this.formatTimeStamp(time)}</p>
                    </div>
                )
            }

        }
        return cards
    }

    render() {
        let noQuestionsPrompt = null;
        if (this.state.questions.length === 0) {
            noQuestionsPrompt = <p>No questions have been created in this space.</p>
        }
        return (
            <div className="wrapper">
                <div className="heading">
                    <p className="title">ClassQ&A</p>
                    <img src={logo} alt="cap logo" className="logo"/>
                    <p className="course">{this.state.classname}</p>
                </div>
                <div className="leftDiv"></div>
                <div className="mainDiv">
                    <p className="phone">
                        Phone Number: {this.formatPhoneNumber(this.state.phone_number)}
                    </p>
                    {noQuestionsPrompt}
                    {this.createQuestions(this.state.questions)}
                </div>
                <div className="rightDiv"></div>
            </div>
        )
    }
}

export default ClassroomView;
