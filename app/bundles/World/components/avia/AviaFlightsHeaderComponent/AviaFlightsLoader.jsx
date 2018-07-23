import React, { Component, PropTypes } from 'react';
import ProgressBar from 'progressbar.js';
import { connect } from 'react-redux';
import { setLoaderElement } from '../../../actions/aviaFlightLoaderAC';

class Loader extends React.Component {
	static propTypes = {
		//from props
		transitionTitle: PropTypes.string,
		//from connect
		dispatch: PropTypes.func,
		ticketsLoadedSuccess: PropTypes.bool
	}

	state = {
		loaderElement: null,
	}


  componentDidMount() {
  	const {dispatch} = this.props
  	let id = 'bar-loader'
  	let bar = new ProgressBar.Line(document.getElementById(id), {
	    strokeWidth: 0.25,
	    easing: 'easeInOut',
	    duration: 35000,
	    color: 'url(#gradient)',
	    trailColor: '#fff',
	    trailWidth: 1,
	    svgStyle: {width: '100%', height: '100%'},
	    text: {
	      style: {
	        // Text color.
	        // Default: same as stroke color (options.color)

	      },
	      autoStyleContainer: false
	    },
    });

    bar.animate(1);
    this.setState({
    	loaderElement: bar,
    })
//    background-image: linear-gradient(to right, #067fd4 0%, #06b5d4 100%);
    let linearGradient = `
	  <defs>
	    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
	      <stop offset="20%" stop-color="#ffbe66"/>
	      <stop offset="50%" stop-color="#F5F5F5"/>
	    </linearGradient>
	  </defs>
	`

	bar.svg.insertAdjacentHTML('afterBegin', linearGradient);

  }

  componentWillUpdate(nextProps, nextState) {
  	if (nextProps.ticketsLoadedSuccess) {
  		this.setSuccesProgress()
  	}
  }

  setSuccesProgress = () => {
  	const { loaderElement } = this.state
  	loaderElement.set(1)
  }

  componentDidUpdate() {
  	const { dispatch } = this.props
  	dispatch(setLoaderElement(this.state.loaderElement))
  }

  render() {
    return (
		<div id='bar-loader'>
		</div>     
    );
  }
}

export default connect(state => ({
	ticketsLoadedSuccess: state.aviaSearchesState.get('ticketsLoadedSuccess')
}))(Loader)