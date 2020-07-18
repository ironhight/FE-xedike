import React, { PureComponent } from 'react';
import { Icon, Skeleton } from 'antd';
import { connect } from 'react-redux';
import PersonalForm from './PersonalForm';
import PasswordForm from './PasswordForm';
import { Wrapper, BodyWrapper } from '../../../styled';
import AvatarWrapper from '../../../components/Avatar';
import { getHistoryTrips } from '../../../services/HistoryTrip/actions.js';
import { getDetailUser } from '../../../services/User/actions.js';
import GoBack from '../../../components/GoBack';

class EditProfile extends PureComponent {
  updateAvatar = (value) => {
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        avatar: value,
      },
    }));
  };

  componentDidMount() {
    const { auth, getDetailUser, getHistoryTrips } = this.props;

    getDetailUser(auth.user.id);
    getHistoryTrips();
  }

  render() {
    const { historyTrips, userInfo } = this.props;
    const totalTrips = historyTrips.data.length;
    const { user } = userInfo;

    return (
      <div className="container">
        <GoBack />
        <BodyWrapper>
          <div className="row">
            <div className="col-3">
              {userInfo.isLoading ? (
                <Skeleton active avatar paragraph={{ rows: 4 }} />
              ) : (
                <AvatarWrapper
                  registerDate={user.registerDate}
                  fullName={user.fullName}
                  isMyProfile
                  userType={user.userType}
                  rate={user.rate}
                  totalTrips={totalTrips}
                  avatar={user.avatar}
                  updateAvatar={this.updateAvatar}
                  id={user._id}
                />
              )}
            </div>
            <div className="col-9">
              <Wrapper>
                <h5 className="font-weight-normal d-flex align-items-center mb-4">
                  <Icon type="user" className="mr-1" />
                  Personal information
                </h5>
                <Skeleton
                  loading={userInfo.isLoading}
                  active
                  paragraph={{ rows: 6 }}
                >
                  <PersonalForm
                    email={user.email}
                    fullName={user.fullName}
                    DOB={user.DOB}
                    phoneNumber={user.phoneNumber}
                    id={user._id}
                    isLoading={userInfo.isLoading}
                  />
                </Skeleton>
                <h5 className="font-weight-normal d-flex align-items-center mb-4 mt-5">
                  <Icon type="lock" className="mr-1" /> Change password
                </h5>
                <Skeleton
                  loading={userInfo.isLoading}
                  active
                  paragraph={{ rows: 6 }}
                >
                  <PasswordForm id={user._id} />
                </Skeleton>
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
    historyTrips: state.HistoryTrips,
    userInfo: state.UserInfo,
  };
};

export default connect(mapStateToProps, { getHistoryTrips, getDetailUser })(
  EditProfile
);
