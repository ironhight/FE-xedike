import React, { PureComponent } from 'react';
import { string, object, ref } from 'yup';
import { Formik, Field } from 'formik';
import { Form, Input, Button, Spin } from 'antd';
import _ from 'lodash';
import apiCaller from '../../../../utils/apiCaller.js';
import swal from 'sweetalert';

const FormItem = Form.Item;

class PasswordForm extends PureComponent {
  render() {
    const { id } = this.props;

    return (
      <Formik
        initialValues={{
          password: '',
          newPassword: '',
          verifyNewPassword: '',
        }}
        validationSchema={object().shape({
          password: string()
            .required('Password is required')
            .min(3, 'Password must have min 3 characters'),
          verifyNewPassword: string()
            .required('Verify new password is required')
            .oneOf([ref('verifyNewPassword'), null], 'new password must match'),
          newPassword: string().required('New password is required'),
        })}
        onSubmit={(values, { setFieldError, resetForm, setSubmitting }) => {
          apiCaller(`users/password/${id}`, 'PUT', values)
            .then(() => {
              swal({
                text: 'Update successfully',
                icon: 'success',
                buttons: false,
                timer: 1500,
              });
              setSubmitting(false);
              resetForm();
            })
            .catch((err) => {
              setSubmitting(false);
              _.map(Object.keys(err.response.data), (field) => {
                setFieldError(field, err.response.data[field]);
              });
            });
        }}
        render={({ touched, errors, handleSubmit, isSubmitting }) => (
          <Spin spinning={isSubmitting}>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-3 text-right">
                  <label className="mb-0 ant-form-item-required">
                    Password
                  </label>
                </div>
                <div className="col-9">
                  <FormItem
                    validateStatus={
                      touched.password && errors.password && 'error'
                    }
                    help={touched.password && errors.password}
                  >
                    <Field
                      name="password"
                      render={({ field }) => (
                        <Input.Password
                          type="password"
                          size="large"
                          placeholder="Enter password..."
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
                    New password
                  </label>
                </div>
                <div className="col-9">
                  <FormItem
                    validateStatus={
                      touched.newPassword && errors.newPassword && 'error'
                    }
                    help={touched.newPassword && errors.newPassword}
                  >
                    <Field
                      name="newPassword"
                      render={({ field }) => (
                        <Input.Password
                          type="password"
                          size="large"
                          placeholder="Enter new password..."
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
                    Verify new password
                  </label>
                </div>
                <div className="col-9">
                  <FormItem
                    validateStatus={
                      touched.verifyNewPassword &&
                      errors.verifyNewPassword &&
                      'error'
                    }
                    help={touched.verifyNewPassword && errors.verifyNewPassword}
                  >
                    <Field
                      name="verifyNewPassword"
                      render={({ field }) => (
                        <Input.Password
                          type="password"
                          size="large"
                          placeholder="Enter verify new password..."
                          {...field}
                        />
                      )}
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

export default PasswordForm;
