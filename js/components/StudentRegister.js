import React, { PropTypes}  from 'react';

import {Button, Banner, Footer, Heading, Input, NavItem, Space, Toolbar} from 'rebass';

function StudentRegister (props) {

    return (
        <div>
            <Toolbar>

                <NavItem is="a">
                    UnivJobs
                </NavItem>

                <Space
                    auto={true}
                    x={1}
                    />

                <NavItem is="a">
                    Employer
                </NavItem>

                <NavItem is="a">
                    Login
                </NavItem>

            </Toolbar>

            <Banner
                align="center"
                backgroundImage="http://libreshot.com/wp-content/uploads/2015/05/coffee-and-laptop-861x574.jpg"
            >

            <Heading
                alt={false}
                big={true}
                level={1}
                size={0}
                >
                    GET HIRED

                </Heading>

                <Heading
                    level={4}
                    size={3}
                    alt={true}
                    >
                        Connect to part-time work and internships

                    </Heading>

                    <Input
                        label="Sign Up"
                        name="email"
                        placeholder="Email"
                        rounded={true}
                        defaultValue={props.email}
                        onChange={props.handleChangeEmail}
                        type="text"
                    />

                <Input
                    label="Password"
                    name="password"
                    placeholder="password"
                    rounded={true}
                    onChange={props.handleChangePassword}
                    type="password"
                />

            <Button
                name="submit"
                rounded={true}
                big={true}
                onClick={props.handleSubmit}
                >
                    Submit
                </Button>

            </Banner>
            <Footer>
            </Footer>
        </div>
    );
}

StudentRegister.propTypes = {
    handleChangeEmail: PropTypes.func.isRequired,
    handleChangePassword: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
};

export default StudentRegister;
