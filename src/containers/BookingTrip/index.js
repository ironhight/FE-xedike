import React, { Component } from 'react';
import { Wrapper } from '../../styled';
import { Price, Thumb } from '../../components/Trips/TripItem/styled';
import { Form, Input, Button, Icon, Select, Spin, Skeleton } from 'antd';
import { object, string } from 'yup';
import { withFormik, Form as FormikForm } from 'formik';
import _ from 'lodash';
import { InputNumberCustom } from '../../components/TripBookingForm/styled';
import { withRouter, Link } from 'react-router-dom';
import { BodyWrapper } from '../../styled';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import { getDetailTrip } from '../../services/TripDetail/actions.js';
import { getProvinces } from '../../services/Province/actions.js';
import { bookingTrip } from '../../services/BookingTrip/actions.js';
import moment from 'moment';
import GoBack from '../../components/GoBack';

const FormItem = Form.Item;
const { Option } = Select;

class BookingTrip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locationArr: [],
    };
  }

  componentDidMount() {
    if (this.props.user.user.userType === 'driver') {
      this.props.history.push('/');
    }
    const { match, getDetailTrip, getProvinces } = this.props;
    const { id } = match.params;

    getDetailTrip(id);
    getProvinces();
  }

  render() {
    const {
      touched,
      errors,
      values,
      setFieldValue,
      provinces,
      isSubmitting,
      trip,
    } = this.props;

    const tripData = trip.data;

    const locations = _.map(provinces, (item, index) => {
      return (
        <Option key={index} value={item.Title}>
          {item.Title}
        </Option>
      );
    });

    return (
      <div className="container">
        <GoBack />
        <BodyWrapper>
          <Wrapper>
            <Skeleton loading={trip.isLoading} active paragraph={{ rows: 1 }}>
              <h5 className="font-weight-normal d-flex align-items-center mb-3">
                <Icon type="car" className="mr-1" /> Trip information
              </h5>
              <div className="d-flex">
                <div className="flex-grow-1">
                  <div className="d-flex align-items-center mb-1">
                    {tripData.locationFrom}
                    <Icon type="arrow-right" className="mx-2" />
                    {tripData.locationTo}
                  </div>
                  <div className="d-flex align-items-center">
                    <Icon type="calendar" className="mr-1" />
                    {moment(tripData.startTime).format('DD/MM/YYYY')}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <div className="mb-1">Honda</div>
                  <div className="d-flex align-items-center">
                    <Icon type="team" className="mr-1" />{' '}
                    {tripData.availableSeats}
                  </div>
                </div>
                <Link
                  className="flex-grow-1 d-inline-flex text-dark"
                  to={`/driver-profile/${
                    tripData.driverID && tripData.driverID._id
                  }`}
                >
                  <Thumb
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSivuKfPqK-w1-eXntjE5MgV1VtoLLxZMtagarm5zVNoXBK3KpE"
                    alt="driver"
                    className="mr-2"
                  />
                  <div>
                    <p className="mb-1">
                      {tripData.driverID && tripData.driverID.fullName}
                    </p>
                    <div className="d-flex align-items-center">
                      <Icon
                        type="star"
                        theme="twoTone"
                        className="mr-1"
                        twoToneColor="#ffc107"
                      />
                      {tripData.driverID && tripData.driverID.rate}
                    </div>
                  </div>
                </Link>
                <Price priceFont="30px" className="flex-grow-1">
                  {`${tripData.fee}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                  <sup>vnd</sup>
                </Price>
              </div>
            </Skeleton>
          </Wrapper>
          <Wrapper className="mt-5">
            <h5 className="font-weight-normal d-flex align-items-center mb-3">
              <Icon type="carry-out" className="mr-1" /> Booking
            </h5>
            <Spin spinning={isSubmitting} tip="Loading...">
              <FormikForm>
                <div className="row">
                  <div className="col-2 text-right">
                    <label className="mb-0 ant-form-item-required">From</label>
                  </div>
                  <div className="col-10">
                    <FormItem
                      validateStatus={
                        touched.locationFrom && errors.locationFrom && 'error'
                      }
                      help={touched.locationFrom && errors.locationFrom}
                    >
                      <Select
                        name="locationFrom"
                        size="large"
                        showSearch
                        placeholder="Select location"
                        optionFilterProp="children"
                        value={values.locationFrom}
                        onChange={(value) =>
                          setFieldValue('locationFrom', value)
                        }
                        suffixIcon={
                          <Icon
                            type="environment"
                            style={{
                              color: '#28a745',
                            }}
                          />
                        }
                      >
                        {locations}
                      </Select>
                    </FormItem>
                  </div>
                </div>
                <div className="row">
                  <div className="col-2 text-right">
                    <label className="mb-0 ant-form-item-required">To</label>
                  </div>
                  <div className="col-10">
                    <FormItem
                      validateStatus={
                        touched.locationTo && errors.locationTo && 'error'
                      }
                      help={touched.locationTo && errors.locationTo}
                    >
                      <Select
                        name="locationTo"
                        size="large"
                        showSearch
                        placeholder="Select location"
                        optionFilterProp="children"
                        value={values.locationTo}
                        onChange={(value) => setFieldValue('locationTo', value)}
                        suffixIcon={
                          <Icon
                            type="environment"
                            style={{
                              color: '#dc3545',
                            }}
                          />
                        }
                      >
                        {locations}
                      </Select>
                    </FormItem>
                  </div>
                </div>
                <div className="row">
                  <div className="col-2 text-right">
                    <label className="mb-0 ant-form-item-required">
                      Payment
                    </label>
                  </div>
                  <div className="col-10">
                    <FormItem>
                      <Input
                        disabled
                        size="large"
                        value="Cash"
                        suffix={
                          <Icon
                            type="money-collect"
                            style={{
                              color: 'rgba(0,0,0,.25)',
                            }}
                          />
                        }
                      />
                    </FormItem>
                  </div>
                </div>
                <div className="row">
                  <div className="col-2 text-right">
                    <label className="mb-0 ant-form-item-required">Slot</label>
                  </div>
                  <div className="col-10">
                    <FormItem
                      validateStatus={
                        touched.numberOfBookingSeats &&
                        errors.numberOfBookingSeats &&
                        'error'
                      }
                      help={
                        touched.numberOfBookingSeats &&
                        errors.numberOfBookingSeats
                      }
                    >
                      <InputNumberCustom
                        min={1}
                        max={10}
                        defaultValue={2}
                        size="large"
                        name="numberOfBookingSeats"
                        onChange={(value) =>
                          setFieldValue('numberOfBookingSeats', value)
                        }
                      />
                    </FormItem>
                  </div>
                </div>
                <div className="row">
                  <div className="col-2 text-right">
                    <label className="mb-0">Note</label>
                  </div>
                  <div className="col-10">
                    <FormItem>
                      <Input.TextArea
                        name="note"
                        autosize={{ minRows: 5 }}
                        onChange={(value) =>
                          setFieldValue('note', value.target.value)
                        }
                      />
                    </FormItem>
                  </div>
                </div>
                <div className="row">
                  <div className="col-10 offset-2">
                    <Button htmlType="submit" type="primary" size="large">
                      Submit
                    </Button>
                  </div>
                </div>
              </FormikForm>
            </Spin>
          </Wrapper>
        </BodyWrapper>
      </div>
    );
  }
}

const withFormikHOC = withFormik({
  mapPropsToValues() {
    return {
      locationFrom: undefined,
      locationTo: undefined,
      numberOfBookingSeats: 2,
      note: '',
    };
  },
  validationSchema: object().shape({
    locationFrom: string().required('This field is required'),
    locationTo: string().required('This field is required'),
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    if (!props.user.authenticate) {
      return swal({
        text: 'You have to login for booking trip',
        icon: 'warning',
        buttons: false,
        timer: 1500,
      }).then(() => setSubmitting(false));
    }
    props.bookingTrip(
      props.match.params.id,
      values,
      () => {
        setSubmitting(false);
        swal({
          text: 'Booking trip successfully!',
          icon: 'success',
          buttons: false,
          timer: 1500,
        }).then(() => {
          props.history.push('/');
        });
      },
      () => {
        setSubmitting(false);
        swal({
          text: 'Available seat not enough',
          icon: 'error',
          buttons: false,
          timer: 1500,
        });
      }
    );
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.Authenticate,
    trip: state.TripDetail,
    provinces: state.Provinces,
  };
};

export default connect(mapStateToProps, {
  getDetailTrip,
  getProvinces,
  bookingTrip,
})(withRouter(withFormikHOC(BookingTrip)));
