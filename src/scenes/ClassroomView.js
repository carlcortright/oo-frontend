import React, { Component } from 'react';
import { Heading, Card, Flex } from 'rebass';
import { GetClass, GetLatestQuestions } from '../api/APIHelpers';
import styled from 'styled-components'

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

    createQuestions = (questions) => {
        let cards = []
        for (let i = questions.length-1; i >= 0; i--) {
            let content = questions[i].content
            cards.push(
                <Card
                    fontSize={3}
                    fontWeight='bold'
                    width={[ 1, 1, 1]}
                    p={3}
                    my={3}
                    boxShadow='0 2px 16px rgba(0, 0, 0, 0.25)'
                >
                    {content}
                </Card>
            )

        }
        return cards
    }

    render() {
        let noQuestionsPrompt = null;
        if (this.state.questions.length === 0) {
            noQuestionsPrompt = <Heading textAlign='center'>No questions have been created in this space.</Heading>
        }
        return (
        <div>
            <Heading 
                textAlign='center'
                fontSize={[ 3, 4, 5, 6 ]}
                p={4}
            >
                {this.formatPhoneNumber(this.state.phone_number)}
            </Heading>
            <Flex justifyContent='center' flexWrap='wrap'>
                {noQuestionsPrompt}
                <QuestionList>
                    {this.createQuestions(this.state.questions)}
                </QuestionList>
            </Flex>
        </div>
        );
    }
}

const QuestionList = styled.div`
    flex: 0 1 800px;
`

export default ClassroomView;
