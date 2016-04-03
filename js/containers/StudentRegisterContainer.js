import React from 'react';

import StudentRegister from '../components/StudentRegister';
import SuccessModal from '../components/SuccessModal';

import assign from 'object-assign';
import $ from 'jquery';
import axios from 'axios';

class StudentRegisterContainer extends React.Component {

    constructor() {
        super();
        this.state = assign({
            password: '',
            email: '',
            modalOpen: false
        });
        
 //       this.toggle = this.toggle.bind(this);
    }

    handleChangeEmail (event) {
        this.setState({email: event.target.value});
    }

    handleChangePassword (event) {
        this.setState({password: event.target.value});
    }

//    handleModalOnSubmit () {
//       this.setState({modalOpen: true});
//    }

    handleSubmit () {
        var csrftoken = getCookie('csrftoken');

        axios.post('/api/register/', {
            email: this.state.email,
            password1: this.state.password,
            password2: this.state.password
        }, {
            headers: {
                'X-CSRFToken': csrftoken
            }
        }).then( (response) => {
            this.setState({ token: response });
        }).catch( (response) => {
            // console.log(response);
            this.setState({ data: response });
        });
  
        //Turn on modal
        this.setState({modalOpen: true});

        // $.ajax({
        //     url: 'http://localhost:8000/api/account/1/',
        //     dataType: 'json',
        //     success: function(data) {
        //         this.setState({data: data});
        //     }.bind(this)
        // });
    }

    componentDidMount() {
        //$.ajax({
        //    url: 'http://localhost:8000/api/account/1/',
        //    dataType: 'json',
        //    success: function(data) {
        //        this.setState({data: data});
        //    }.bind(this)
       // });

    }

    componentWillUnmount() {
    }

    render() {
        return (
          <div>
            <StudentRegister
                handleChangeEmail={(event) => this.handleChangeEmail(event)}
                handleChangePassword={(event) => this.handleChangePassword(event)}

                handleSubmit={() => this.handleSubmit()}
                email={this.state.email}
                password={this.state.password}
            />
            <SuccessModal 
              open={this.state.modalOpen}
            />
          </div>
        );
    }
}

function getCookie(name){

    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = $.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export default StudentRegisterContainer;
