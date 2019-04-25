import axios from 'axios';

export const GetClass = (classname)  => {
    let url = 'http://api.classqa.carl.fun/api/class/' + classname;
    return axios.get(url);
}

export const GetLatestQuestions = (classname, last_id)  => {
    let url = 'http://api.classqa.carl.fun/api/list_questions';
    return axios.get(url, {params: {
        classroom: classname,
        id: last_id,
      }});
}

export const CreateClassroomAPI = (classname)  => {
    let url = 'http://api.classqa.carl.fun/api/create_classroom';
    return axios.post(url, { name: classname });
}