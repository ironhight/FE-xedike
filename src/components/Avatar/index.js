import React, { PureComponent } from 'react';
import AvatarImg from '../../assets/images/user-ic.png';
import { Avatar, UploadAvatar } from './styled';
import { Icon, Rate } from 'antd';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import { ratingDriver } from '../../services/User/actions.js';
import { updateAvatar } from '../../services/User/actions.js';
import { connect } from 'react-redux';

class AvatarWrapper extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      file: null,
    };
  }

  handleInfo = (rate, isMyProfile, userType, totalTrips = 0) => {
    if (isMyProfile && userType === 'driver') {
      return (
        <>
          <p className="mb-0">
            <strong>Your rating:</strong>
          </p>
          <Rate value={rate} disabled />
        </>
      );
    } else if (isMyProfile && userType === 'passenger') {
      return (
        <p className="mb-0">
          <strong>Total booking trip: </strong>
          {totalTrips}
        </p>
      );
    } else if (!isMyProfile && userType === 'driver') {
      return (
        <>
          <p className="mb-0">
            <strong>Your rating:</strong>
          </p>
          <Rate value={rate} disabled />
        </>
      );
    } else if (!isMyProfile) {
      return (
        <>
          <p className="mb-0">
            <strong>Rating for driver:</strong>
          </p>
          <Rate
            value={rate}
            onChange={this.handleRating}
            disabled={userType === 'driver' && true}
          />
        </>
      );
    }
  };

  handleRating = (value) => {
    const { match, ratingDriver } = this.props;
    const { id } = match.params;

    if (_.isEmpty(match.params)) return;

    ratingDriver(id, value);
  };

  onHandleAvatar = (e) => {
    let file = e.target.files[0];
    const { id, updateAvatar } = this.props;
    const formData = new FormData();
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    formData.append('avatar', file);

    this.setState({
      isLoading: true,
    });

    updateAvatar(id, formData, config, () => {
      this.setState({
        isLoading: false,
      });
    });
  };

  render() {
    const {
      avatar,
      fullName,
      registerDate,
      isMyProfile = false,
      userType,
      totalTrips,
      rate,
    } = this.props;

    const { isLoading } = this.state;

    return (
      <Avatar>
        <div className="text-center">
          {isMyProfile ? (
            <UploadAvatar isLoading={isLoading}>
              <label className="cursor-point mb-0">
                <img src={!avatar ? AvatarImg : avatar} alt="avatar" />
                <input
                  className="d-none"
                  type="file"
                  onChange={this.onHandleAvatar}
                />
              </label>
              <div className="btn-upload">
                <Icon type={isLoading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
              </div>
            </UploadAvatar>
          ) : (
            <UploadAvatar isLoading={isLoading}>
              <label className="cursor-point mb-0">
                <img src={!avatar ? AvatarImg : avatar} alt="avatar" />
              </label>
            </UploadAvatar>
          )}
          <h5 className="mb-0 name">{fullName}</h5>
        </div>
        <div className="mt-3 info fz-14">
          <p className="mb-1">
            <strong>Active day:</strong>{' '}
            {moment(registerDate).format('DD/MM/YYYY')}
          </p>
          {this.handleInfo(rate, isMyProfile, userType, totalTrips)}
        </div>
      </Avatar>
    );
  }
}

export default connect(null, { ratingDriver, updateAvatar })(
  withRouter(AvatarWrapper)
);
