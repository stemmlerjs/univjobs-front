import React from 'react';

class SuccessModalContainer extends React.Component {

    constructor() {
        super();
        this.state = {
            modalOpen: false
        };
    }


    handleModalOnRegister () {
        this.setState({modalOpen: true});
    }

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

        this.handleModalOnRegister();
        // $.ajax({
        //     url: 'http://localhost:8000/api/account/1/',
        //     dataType: 'json',
        //     success: function(data) {
        //         this.setState({data: data});
        //     }.bind(this)
        // });
    }

    componentDidMount() {
        $.ajax({
            url: 'http://localhost:8000/api/account/1/',
            dataType: 'json',
            success: function(data) {
                this.setState({data: data});
            }.bind(this)
        });
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <StudentRegister
                handleChangeEmail={(event) => this.handleChangeEmail(event)}
                handleChangePassword={(event) => this.handleChangePassword(event)}

                handleSubmit={() => this.handleSubmit()}
                email={this.state.email}
                password={this.state.password}
            />
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
