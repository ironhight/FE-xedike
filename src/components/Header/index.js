import React, { PureComponent } from 'react';
import Logo from '../../assets/images/logo.png';
import { Navbar, Nav, NavItem, Collapse } from 'reactstrap';
import { HeaderContainer } from './styled';
import { FaUserPlus } from 'react-icons/fa';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import CreateTrip from './CreateTrip';
import AddCarForm from './AddCarForm';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Avatar, Menu, Dropdown, Icon } from 'antd';
import { authLogout } from '../../services/Auth/actions.js';

class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      signInVisible: false,
      registerVisible: false,
      createVisible: false,
    };
  }

  addCarModal = (value) => {
    this.setState({
      addCarVisible: value,
    });
  };

  loginModal = (value) => {
    this.setState({
      signInVisible: value,
      registerVisible: false,
    });
  };

  registerModal = (value) => {
    this.setState({
      registerVisible: value,
      signInVisible: false,
    });
  };

  createModal = (value) => {
    this.setState({
      createVisible: value,
    });
  };

  render() {
    const {
      signInVisible,
      registerVisible,
      addCarVisible,
      createVisible,
    } = this.state;
    const { auth } = this.props;

    const menu = (
      <Menu theme="dark">
        <Menu.Item>
          <p
            style={{
              color: '#fff',
              borderBottom: '1px solid #fff',
              paddingBottom: '8px',
            }}
            className="mb-0"
          >
            {auth.user.fullName}
          </p>
        </Menu.Item>
        <Menu.Item>
          <Link to="/edit-profile">Edit profile</Link>
        </Menu.Item>
        {auth.user.userType !== 'driver' ? (
          <Menu.Item>
            <Link to="/history-trips">History trips</Link>
          </Menu.Item>
        ) : (
          <Menu.Item>
            <Link to="/my-profile">My profile</Link>
          </Menu.Item>
        )}
        <Menu.Item>
          <Link to="/" onClick={() => this.props.authLogout()}>
            Logout
          </Link>
        </Menu.Item>
      </Menu>
    );

    return (
      <HeaderContainer>
        <Navbar expand="md">
          <Link to="/" className="px-0 py-0 mr-0">
            <img className="logo" src={Logo} alt="logo" />
          </Link>
          <Collapse navbar>
            <Nav className="ml-auto align-items-center" navbar>
              <NavItem className="mr-3">
                <Link to="/trips/search" className="text-white login-link">
                  Trip
                </Link>
              </NavItem>
              {!auth.authenticate ? (
                <>
                  <NavItem className="mr-3">
                    <p
                      className="login-link text-white cursor-point mb-0"
                      onClick={() => this.loginModal(true)}
                    >
                      Login
                    </p>
                    <LoginForm
                      registerModal={this.registerModal}
                      loginModal={this.loginModal}
                      signInVisible={signInVisible}
                    />
                  </NavItem>
                  <NavItem>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => this.registerModal(true)}
                    >
                      <FaUserPlus className="mr-1" />
                      Register
                    </button>
                    <RegisterForm
                      registerVisible={registerVisible}
                      loginModal={this.loginModal}
                      registerModal={this.registerModal}
                    />
                  </NavItem>
                </>
              ) : (
                <>
                  {auth.user.userType === 'driver' && (
                    <>
                      <NavItem className="mr-3">
                        <p
                          className="login-link text-white cursor-point mb-0"
                          onClick={() => this.addCarModal(true)}
                        >
                          Add car
                        </p>
                        <AddCarForm
                          addCarModal={this.addCarModal}
                          addCarVisible={addCarVisible}
                        />
                      </NavItem>
                      <NavItem className="mr-3">
                        <button
                          type="button"
                          className="btn btn-warning btn-sm d-flex align-items-center"
                          onClick={() => this.createModal(true)}
                        >
                          <Icon type="car" className="mr-1" />
                          Create trip
                        </button>
                        <CreateTrip
                          createVisible={createVisible}
                          createModal={this.createModal}
                        />
                      </NavItem>
                    </>
                  )}
                  <NavItem>
                    <Dropdown overlay={menu}>
                      <Avatar icon="user" className="cursor-point" />
                    </Dropdown>
                  </NavItem>
                </>
              )}
            </Nav>
          </Collapse>
        </Navbar>
      </HeaderContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.Authenticate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authLogout: () => {
      dispatch(authLogout());
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
