import React, {Component as ReactComponent} from 'react'

export default (OriginalComponent) => class ToggleMobileMode extends ReactComponent {
    state = {
        mobileMode: false
    }

    componentDidMount() {
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }

    resize() {
        this.setState({mobileMode: window.innerWidth <= 610});
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.resize.bind(this));
    }


    render() {
        return <OriginalComponent 
        {...this.props} 
        {...this.state} 
        mobileMode = {this.state.mobileMode}
        />
    }

}