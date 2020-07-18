import React, { PureComponent } from 'react';
import { Empty, Button, Rate, Timeline, Icon } from 'antd';
import _ from 'lodash';
import { Price, Thumb, TimelineItem } from './styled';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import swalReact from '@sweetalert/with-react';
import apiCaller from '../../../utils/apiCaller';
import { FaArrowRight, FaCalendarAlt, FaUsers, FaStar } from 'react-icons/fa';
import { finishTrip } from '../../../services/HistoryTrip/actions.js';
import { connect } from 'react-redux';
import moment from 'moment';

class TripItem extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      rate: 0,
    };
  }

  handleFinish = (tripID, driverID) => {
    const { finishTrip } = this.props;

    swal({
      title: 'Would you like to rating for driver?',
      icon: 'info',
      buttons: {
        close: {
          text: 'No thanks!',
          className: 'ant-btn ant-btn-danger',
          value: 'noRate',
        },
        rate: {
          text: 'Rate now',
          value: 'rate',
          className: 'ant-btn ant-btn-primary',
        },
      },
    }).then((value) => {
      if (value === 'noRate') {
        return finishTrip(tripID);
      }

      swalReact(<Rate onChange={this.handleRating} />, {
        buttons: {
          close: {
            text: 'Cancel',
            className: 'ant-btn ant-btn-danger',
            value: 'close',
          },
          submit: {
            text: 'Submit',
            className: 'ant-btn ant-btn-primary',
            value: 'submit',
          },
        },
      }).then((value) => {
        if (value === 'close') {
          return finishTrip(tripID);
        }
        apiCaller(`users/rating/${driverID}`, 'PUT', {
          rate: this.state.rate,
        })
          .then(() => {
            swal({
              title: 'Finish trip and Rating successfully!',
              icon: 'success',
              timer: 2000,
            });
            finishTrip(tripID);
          })
          .catch((err) => console.log(err.response));
      });
    });
  };

  handleRating = (value) => {
    this.setState({
      rate: value,
    });
  };

  render() {
    const {
      trips = [],
      priceFont,
      large,
      showBtn = true,
      userType,
    } = this.props;

    const isEmpty = _.isEmpty(trips);

    return (
      <>
        {isEmpty ? (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        ) : (
          <Timeline>
            {_.map(trips, (item, index) => {
              return (
                <TimelineItem key={index}>
                  <div className="flex-basic-25">
                    <div className="d-flex align-items-center mb-1">
                      {item.locationFrom}
                      <FaArrowRight className="mx-2" />
                      {item.locationTo}
                    </div>
                    <div className="d-flex align-items-center">
                      <FaCalendarAlt className="mr-1" />
                      {moment(item.startTime).format('DD/MM/YYYY')}
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <div className="mb-1 d-flex align-items-center">
                      <Icon type="car" className="mr-1" />
                      Honda
                    </div>
                    <div className="d-flex align-items-center">
                      <FaUsers className="mr-1" />
                      {item.availableSeats}
                    </div>
                  </div>
                  <Link
                    className="flex-basic-25 d-inline-flex text-dark"
                    to={`/driver-profile/${item.driverID && item.driverID._id}`}
                  >
                    <Thumb
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSivuKfPqK-w1-eXntjE5MgV1VtoLLxZMtagarm5zVNoXBK3KpE"
                      alt="driver"
                      className="mr-2"
                    />
                    <div>
                      <p className="mb-0">
                        {item.driverID && item.driverID.fullName}
                      </p>
                      <div className="d-flex align-items-center">
                        <FaStar
                          className="mr-1"
                          style={{
                            color: '#ffc107',
                          }}
                        />
                        {item.driverID && item.driverID.rate}
                      </div>
                    </div>
                  </Link>
                  <Price
                    priceFont={priceFont}
                    className="flex-basic-25 text-center"
                  >
                    {item.fee &&
                      item.fee
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                    <sup>vnd</sup>
                  </Price>
                  <div className="flex-grow-0">
                    {showBtn ? (
                      <>
                        {(userType !== 'driver' ||
                          userType === 'passenger') && (
                          <Link
                            to={`/booking-trip/${item._id}`}
                            className={`btn btn-success ${
                              large && 'btn-lg wp-nor'
                            }`}
                          >
                            Book now
                          </Link>
                        )}
                      </>
                    ) : (
                      <Button
                        onClick={() =>
                          this.handleFinish(item._id, item.driverID._id)
                        }
                        type="primary"
                        disabled={item.isFinished && true}
                      >
                        Finish trip
                      </Button>
                    )}
                  </div>
                </TimelineItem>
              );
            })}
          </Timeline>
        )}
      </>
    );
  }
}

export default connect(null, { finishTrip })(TripItem);
