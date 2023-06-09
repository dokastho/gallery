import React from 'react';
import PropTypes from 'prop-types';

class SmallIcon extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { src, className, onClick, keyName } = this.props;
    return (
      <img src={src} className={className} key={keyName} id='small-icon' onClick={() => { onClick() }} />
    )
  }
}

SmallIcon.propTypes = {
  src: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  keyName: PropTypes.string.isRequired
  // onClick: action method on click
};

class SmallTextIcon extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { text, className, onClick, args } = this.props;
    return (
      <h2 className={className} id='small-text' onClick={() => { onClick(args) }}>{text}</h2>
    )
  }
}

SmallTextIcon.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  args: PropTypes.instanceOf(Object),
  // onClick: action method on click
};

class SmallConfirmatoryTextIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    }
    this.toggleSelect = this.toggleSelect.bind(this);
  }

  toggleSelect() {
    const { selected } = this.state;
    this.setState({ selected: !selected });
  }

  render() {
    const { selected } = this.state;
    const { text, className, onClick, args } = this.props;
    return (
      selected ? <h2 className={className} id='small-text-selected' onClick={() => { onClick(args) }}>{text}</h2> : <h2 className={className} id='small-text' onClick={() => { this.toggleSelect() }}>{text}</h2>
    )
  }
}

SmallConfirmatoryTextIcon.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  args: PropTypes.instanceOf(Object),
  // onClick: action method on click
};

export { SmallIcon, SmallTextIcon, SmallConfirmatoryTextIcon }
