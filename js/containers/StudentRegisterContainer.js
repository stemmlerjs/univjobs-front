/* @flow */
import React from 'react';

import StudentRegister from '../components/StudentRegister';
import $ from 'jquery';
import axios from 'axios';

function getCookie(name) {
  let cookieValue = null;

  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
      const cookie = $.trim(cookies[i]);

      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === `${name}=`) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));

        break;
      }
    }
  }
  return cookieValue;
}

class StudentRegisterContainer extends React.Component {

  constructor() {
    super();
    this.state = {
      password: '',
      email: '',
    };
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  handleChangeEmail(any) {
    this.setState({ email: event.target.value });
  }

  handleChangePassword(any) {
    this.setState({ password: event.target.value });
  }

  handleSubmit() {
    const csrftoken = getCookie('csrftoken');

    axios.post('/api/register/', {
      email: this.state.email,
      password1: this.state.password,
      password2: this.state.password,
    }, {
      headers: {
        'X-CSRFToken': csrftoken,
      },
    }).then((response: any) => {
      this.setState({ token: string = response.data.key });
    }).catch((response) => {
      this.setState({ data: response });
    });

    axios.patch('/api/account/7/', {
      is_a_student: true,
    }, {
      headers: {
        'X-CSRFToken': csrftoken,
      },
    }).then((response) => {
      console.log(response);
    }).catch((response) => {
      // console.log(response);
      this.setState({ data: response });
    });
  }

  render() {
    return (
      <StudentRegister
        handleChangeEmail={(event) => this.handleChangeEmail(event)}
        handleChangePassword={(event) => this.handleChangePassword(event)}

        email={this.state.email}
        password={this.state.password}
      />
    );
  }

}


export default StudentRegisterContainer;
