import React from 'react';
import PropTypes from 'prop-types';

class Topbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { logname } = this.props;
    return (
      <div className='topbar-tray'>
        <div className='topbar-content'>
          <h1><a href='/'>Photos</a></h1>
          {
            logname === 'log in' ? <h2><a href={'/accounts/login/'}>{logname}</a></h2> : <h2><a href={`/user/${logname}`}>{logname}</a></h2>
          }
        </div>
      </div>
    )
  }
}

Topbar.propTypes = {
  logname: PropTypes.string.isRequired
};

export default Topbar
