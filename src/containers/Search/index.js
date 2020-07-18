import React, { PureComponent } from 'react';
import { Wrapper } from '../../styled';
import { Icon, Skeleton, Pagination } from 'antd';
import TripItem from '../../components/Trips/TripItem';
import BookingForm from '../../components/TripBookingForm/BookingForm';
import { BodyWrapper } from '../../styled';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import GoBack from '../../components/GoBack';
import { countSearchTrips } from '../../services/CountSearchTrip/actions.js';
import { searchTrips } from '../../services/SearchTrip/actions.js';
import queryString from 'query-string';

class SearchTrip extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      data: [],
      currentPage: 1,
    };
  }

  componentDidMount() {
    const { location, countSearchTrips } = this.props;
    const stringObject = queryString.parse(location.search);

    this.setState({
      currentPage: parseInt(stringObject.page) + 1,
    });

    countSearchTrips(location.search);

    if (_.isEmpty(location.search)) {
      this.setState({
        isLoading: false,
      });
    }
  }

  isLoading = (value) => {
    this.setState({
      isLoading: value,
    });
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { location } = nextProps;

    if (!_.isEmpty(location.search)) {
      this.setState({
        data: nextProps.searchTrip.data,
        isLoading: nextProps.searchTrip.isLoading,
        currentPage: 1,
      });
    } else {
      this.setState({
        data: [],
      });
    }
  }

  changePage = (page) => {
    const { location, history } = this.props;
    const stringObject = queryString.parse(location.search);

    stringObject.page = page - 1;
    const string = queryString.stringify(stringObject);

    history.push(`/trips/search?${string}`);
    this.props.searchTrips(`?${string}`);
  };

  render() {
    const { user, totalSearch } = this.props;
    const { isLoading, data, currentPage } = this.state;

    return (
      <div className="container">
        <GoBack />
        <BodyWrapper>
          <div className="row">
            <div className="col-3">
              <Wrapper>
                <h5 className="font-weight-normal d-flex align-items-center mb-4">
                  <Icon type="filter" className="mr-1" />
                  Search
                </h5>
                <BookingForm isLoading={this.isLoading} />
              </Wrapper>
            </div>
            <div className="col-9">
              <Wrapper>
                <h5 className="font-weight-normal d-flex align-items-center mb-4">
                  <Icon type="car" className="mr-1" />
                  Trips
                </h5>
                <Skeleton active loading={isLoading}>
                  <TripItem userType={user.user.userType} trips={data} />
                </Skeleton>
                {!_.isEmpty(data) && (
                  <Pagination
                    pageSize={5}
                    className="text-right"
                    size="small"
                    defaultCurrent={currentPage}
                    total={totalSearch}
                    onChange={this.changePage}
                  />
                )}
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
    searchTrip: state.SearchTrips,
    user: state.Authenticate,
    totalSearch: state.CountSearchTrip,
  };
};

export default connect(mapStateToProps, { countSearchTrips, searchTrips })(
  withRouter(SearchTrip)
);
