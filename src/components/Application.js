import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Secured from './Secured';
import Unsecured from './Unsecured';
import NavigationService from '../../NavigationService';

class Application extends React.Component {
  render() {
    console.log(this.props)
    if (this.props.isLoggedIn) {
      return (
        <Secured
          ref={(navigatorRef) => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      );
    }

    return <Unsecured />;
  }
}

Application.propTypes = {
  isLoggedIn: PropTypes.bool,
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps)(Application);
