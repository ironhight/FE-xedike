import React, { PureComponent } from 'react';
import { Icon, Skeleton } from 'antd';
import _ from 'lodash';
import { Wrapper, BodyWrapper } from '../../../styled';
import { withRouter } from 'react-router-dom';
import AvatarWrapper from '../../../components/Avatar';
import { connect } from 'react-redux';
import { getDetailUser } from '../../../services/User/actions.js';
import GoBack from '../../../components/GoBack';

class MyProfile extends PureComponent {
  componentDidMount() {
    const { match, auth, getDetailUser } = this.props;

    let userId = match.params.id;

    if (_.isEmpty(match.params)) {
      userId = auth.user.id;
    }

    getDetailUser(userId);
  }

  render() {
    const { userInfo, auth } = this.props;
    const { user, cars } = userInfo;

    return (
      <div className="container">
        <GoBack />
        <BodyWrapper>
          <div className="row">
            <div className="col-3">
              <Skeleton
                active
                avatar
                loading={userInfo.isLoading}
                paragraph={{ rows: 4 }}
              >
                <AvatarWrapper
                  registerDate={user.registerDate}
                  fullName={user.fullName}
                  userType={auth.user.userType}
                  rate={user.rate}
                  avatar={user.avatar}
                />
              </Skeleton>
            </div>
            <div className="col-9">
              <Wrapper>
                <h5 className="font-weight-normal d-flex align-items-center mb-4">
                  <Icon type="user" className="mr-1" />
                  Driver information
                </h5>
                <div className="form-group row">
                  <label className="col-sm-3">Email:</label>
                  <div className="col-sm-9">{user.email}</div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-3">Full Name:</label>
                  <div className="col-sm-9">{user.fullName}</div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-3">Day of birth:</label>
                  <div className="col-sm-9">{user.DOB}</div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-3">Phone number:</label>
                  <div className="col-sm-9">{user.phoneNumber}</div>
                </div>
                {!_.isEmpty(cars) &&
                  _.map(cars, (car, index) => {
                    return (
                      <div
                        key={index}
                        className={_.isEmpty(cars) ? 'd-none' : ''}
                      >
                        <h5 className="font-weight-normal d-flex align-items-center mb-4 mt-5">
                          <Icon type="car" className="mr-1" /> Car information
                        </h5>
                        <div className="form-group row">
                          <label className="col-sm-3">Carmakers:</label>
                          <div className="col-sm-9">{car.autoMakers}</div>
                        </div>
                        <div className="form-group row">
                          <label className="col-sm-3">Car Name:</label>
                          <div className="col-sm-9">{car.carName}</div>
                        </div>
                        <div className="form-group row">
                          <label className="col-sm-3">Car seats:</label>
                          <div className="col-sm-9">{car.carSeats}</div>
                        </div>
                        <div className="form-group row">
                          <label className="col-sm-3">Car model:</label>
                          <div className="col-sm-9">{car.carModel}</div>
                        </div>
                        <div className="form-group row">
                          <label className="col-sm-3">Car certificate:</label>
                          <div className="col-sm-9">{car.carCertificate}</div>
                        </div>
                      </div>
                    );
                  })}
              </Wrapper>
            </div>
          </div>
        </BodyWrapper>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.Authenticate,
    userInfo: state.UserInfo,
  };
};

export default connect(mapStateToProps, { getDetailUser })(
  withRouter(MyProfile)
);
