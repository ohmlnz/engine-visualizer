import React, { Component } from 'react';

class BackgroundPicker extends Component {
  state = {
    current: '',
    showModal: false
  };

  updateInput = event => {
    this.setState({ current: event.target.value });
  };

  submitBackground = () => {
    this.state.current && this.props.changeBackground(this.state.current);
    this.setState({ current: '', showModal: false });
  };

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  render() {
    return (
      <div className="background-wrapper">
        <div className="background-picker">
          <div onClick={() => this.props.changeBackground()}>Change background</div>
          <div onClick={this.toggleModal}> Add your own image</div>
        </div>
        {this.state.showModal && (
          <>
            <div className="background-overlay" onClick={this.toggleModal}></div>
            <div className="background-modal" style={{ display: this.state.showModal ? 'block' : 'none' }}>
              <span>Enter the url of your background image below:</span>
              <div>
                <input type="text" value={this.state.current} onChange={this.updateInput} />
              </div>
              <div className="background-submit" onClick={this.submitBackground}>
                Submit
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default BackgroundPicker;
