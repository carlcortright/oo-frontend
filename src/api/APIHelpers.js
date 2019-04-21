import axios from 'axios';

export const GetClass = (classname)  => {
    let url = 'http://classqa-api.herokuapp.com/api/class/' + classname;
    return axios.get(url);
}

export const GetLatestQuestions = (classname, last_id)  => {
    let url = 'http://classqa-api.herokuapp.com/api/list_questions';
    return axios.get(url, {params: {
        classroom: classname,
        id: last_id,
      }});
}

export const CreateClassroom = (classname)  => {
    let url = 'http://classqa-api.herokuapp.com/api/create_classroom';
    return axios.post(url, {
        name: classname,
      });
}