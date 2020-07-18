import React, { Component } from 'react';
import { object, string } from 'yup';
import { Formik, Field } from 'formik';
import { Form, Input, Button, Icon, DatePicker, Spin } from 'antd';
import moment from 'moment';
import _ from 'lodash';
import { editPersonalUser } from '../../../../services/User/actions.js';
import { connect } from 'react-redux';

const FormItem = Form.Item;
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

class PersonalForm extends Component {
  render() {
    const {
      email,
      fullName,
      phoneNumber,
      DOB,
      id,
      editPersonalUser,
    } = this.props;

    return (
      <Formik
        enableReinitialize={true}
        initialValues={{
          email: email,
          fullName: fullName,
          phoneNumber: phoneNumber,
          DOB: moment(DOB, 'DD/MM/YYYY'),
        }}
        validationSchema={object().shape({
          email: string()
            .required('Email is required')
            .email('Email is invalid'),
          fullName: string().required('Full name is required'),
          phoneNumber: string()
            .matches(phoneRegExp, 'Phone number is not valid')
            .required('Phone number is required'),
          DOB: string().required('Day of birth is required'),
        })}
        onSubmit={(values, { setFieldError, setSubmitting }) => {
          editPersonalUser(
            id,
            values,
            () => {
              setSubmitting(false);
            },
            (err) => {
              _.map(Object.keys(err.response.data), (field) => {
                setFieldError(field, err.response.data[field]);
              });
            }
          );
        }}
        render={({
          touched,
          errors,
          setFieldValue,
          values,
          handleSubmit,
          isSubmitting,
        }) => (
          <Spin spinning={isSubmitting}>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-3 text-right">
                  <label className="mb-0 ant-form-item-required">E-mail</label>
                </div>
                <div className="col-9">
                  <FormItem
                    validateStatus={touched.email && errors.email && 'error'}
                    help={touched.email && errors.email}
                  >
                    <Field
                      name="email"
                      render={({ field }) => (
                        <Input
                          suffix={
                            <Icon
                              type="mail"
                              style={{
                                color:
                                  touched.email && errors.email
                                    ? '#f5222d'
                                    : 'rgba(0,0,0,.25)',
                              }}
                            />
                          }
                          type="email"
                          size="large"
                          placeholder="Enter your email..."
                          {...field}
                        />
                      )}
                    />
                  </FormItem>
                </div>
              </div>
              <div className="row">
                <div className="col-3 text-right">
                  <label className="mb-0 ant-form-item-required">
                    Full name
                  </label>
                </div>
                <div className="col-9">
                  <FormItem
                    validateStatus={
                      touched.fullName && errors.fullName && 'error'
                    }
                    help={touched.fullName && errors.fullName}
                  >
                    <Field
                      name="fullName"
                      render={({ field }) => (
                        <Input
                          suffix={
                            <Icon
                              type="user"
                              style={{
                                color:
                                  touched.fullName && errors.fullName
                                    ? '#f5222d'
                                    : 'rgba(0,0,0,.25)',
                              }}
                            />
                          }
                          type="text"
                          size="large"
                          placeholder="Enter your name..."
                          {...field}
                        />
                      )}
                    />
                  </FormItem>
                </div>
              </div>

              <div className="row">
                <div className="col-3 text-right">
                  <label className="mb-0 ant-form-item-required">
                    Phone number
                  </label>
                </div>
                <div className="col-9">
                  <FormItem
                    validateStatus={
                      touched.phoneNumber && errors.phoneNumber && 'error'
                    }
                    help={touched.phoneNumber && errors.phoneNumber}
                  >
                    <Field
                      name="phoneNumber"
                      render={({ field }) => (
                        <Input
                          suffix={
                            <Icon
                              type="phone"
                              style={{
                                color:
                                  touched.phoneNumber && errors.phoneNumber
                                    ? '#f5222d'
                                    : 'rgba(0,0,0,.25)',
                              }}
                            />
                          }
                          type="text"
                          size="large"
                          placeholder="Enter your phone number..."
                          {...field}
                        />
                      )}
                    />
                  </FormItem>
                </div>
              </div>

              <div className="row">
                <div className="col-3 text-right">
                  <label className="mb-0 ant-form-item-required">
                    Day of birth
                  </label>
                </div>
                <div className="col-9">
                  <FormItem
                    validateStatus={touched.DOB && errors.DOB && 'error'}
                    help={touched.DOB && errors.DOB}
                  >
                    <DatePicker
                      value={values.DOB}
                      format="DD/MM/YYYY"
                      size="large"
                      className="d-block"
                      name="DOB"
                      onChange={(value) =>
                        setFieldValue('DOB', value === null ? undefined : value)
                      }
                    />
                  </FormItem>
                </div>
              </div>

              <div className="row">
                <div className="col-6 offset-3">
                  <Button htmlType="submit" type="primary" size="large">
                    Update
                  </Button>
                </div>
              </div>
            </form>
          </Spin>
        )}
      />
    );
  }
}

export default connect(null, { editPersonalUser })(PersonalForm);
