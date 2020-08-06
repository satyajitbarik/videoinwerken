/* eslint-disable no-console */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserProfile } from "../../actions/authActions";

import Button from "@material-ui/core/Button";

class UserProfile extends Component {
  static propTypes = {
    getUserProfile: PropTypes.func.isRequired,
    user: PropTypes.object,
  };

  UNSAFE_componentWillMount() {
    this.props.getUserProfile();
  }

  renderUser() {
    const user = this.props.user;
    console.log(user);
    if (user) {
      return (
        <div>
          <h3>User Profile</h3>
          <div>Username: {user.username}</div>
          <div>First Name: {user.first_name}</div>
          <div>Last Name: {user.last_name}</div>
        </div>
      );
    }
    return null;
  }

  render() {
    return (
      <div>
        {this.renderUser()} <hr />
        <Button
          href="/profile_edit"
          variant="contained"
          color="primary"
          style={{ marginTop: 20 }}
        >
          Edit Profile
        </Button>
        <Button
          style={{ marginTop: 20, marginLeft: 10 }}
          href="/change_password"
          variant="contained"
          color="primary"
        >
          Change Password
        </Button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
  };
}

export default connect(mapStateToProps, { getUserProfile })(UserProfile);
