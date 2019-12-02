import React, {Component} from 'react';

class ErrorBoundary extends Component{

  state = {hasError: false};
  static getDerivedStateFromError(error) {
    this.setState({...this.state.hasError, hasError: !this.state.hasError})
  }

  componentDidCatch(error, info) {
    console.error(error, info);
  }
  
  render () {
   
      if (this.state.hasError) {
        return <h1>Something went wrong</h1>
      }
    return this.props.children
  }
}

export default ErrorBoundary;