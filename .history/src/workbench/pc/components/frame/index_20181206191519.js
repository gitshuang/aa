import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { mapStateToProps } from '@u';
import Modal from 'bee/modal';
import { frame } from './index.css';

@connect(
  mapStateToProps(
    'frameParam',
  ),
  {}
)
class Frame extends Component {
  static propTypes = {
    frameParam: PropTypes.shape({

    }),
  };
  static defaultProps = {
    frameParam: {
      
    },
  };
  constructor(props) {
    super(props);
    this.state = {
      w: '100%',
      h: '100%',
    };
  }


  render() {
    const { id, url, rect, backdrop, backdropStyle } = this.props.frameParam;
    const Style = {
      width: rect && rect.w || this.state.w,
      height: rect && rect.h || this.state.h,
    }
    return (
      <div>
        <Modal
          className={frame}
          show
          backdrop={backdrop}
          animation={true}
          backdropStyle={backdropStyle}
        >
          <iframe 
            id={id} 
            title={id} 
            src={url}
            style={Style}
          />
        </Modal>
      </div>
    )
  }
}

export default Frame;
