import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import {connect} from "react-redux";
import {fetchMessagesAction, fetchPersonAction} from '../actions/actions'


class Index extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            index : 20,
            start: 0,
            tryCounter: 0,
            tryCounter2: 0
        }
    }
    static async getInitialProps ({Component, store }) {
        await store.dispatch(fetchMessagesAction(0, 20))
    }
    increaseIndex = () => {
        
        this.handleFetchPersons()

    }
    callActions = () => {
        console.log('fired get message', this.state.tryCounter)
        this.props.fetchMessagesAction(this.state.start, this.state.index)
    }
    componentDidMount = () => {
      if (this.props.error !== null || this.props.messages.error) {
          console.log(this.props.error)
          if (this.props.messages === null && this.state.tryCounter < 5) {
              this.callActions();
              let current = this.state.tryCounter + 1;
              this.setState({tryCounter: current})
          }
          if (this.props.messages.error !== null && this.state.tryCounter < 5) {
            this.callActions();
            let current = this.state.tryCounter + 1;
            this.setState({tryCounter: current})
        }
      }
      if (this.props.messages.length > 0 && this.props.error === null && this.props.persons.length === 0) {
          this.handleFetchPersons();
      }
      
    }
    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.messages !== this.props.messages && this.props.persons.length === 0 && this.state.tryCounter2 < 5) {
            this.handleFetchPersons();
        }
    }
    
    
    handleFetchPersons = () => {
        console.log('handle persons fired')
        this.props.messages.map(async each => {
            await this.props.fetchPersonAction(each.from)
        })
    }
    
    render() {
      return (
        <div>
          <h1>Hello, this is an email app.</h1>
          <button onClick={this.increaseIndex}>Increase by 20</button>
        </div>
      )
    }
}
const mapDisPatchToProps = dispatch => {
    return {
        fetchMessagesAction: bindActionCreators(fetchMessagesAction, dispatch),
        fetchPersonAction: bindActionCreators(fetchPersonAction, dispatch)
    }
}
const mapStateToProps = state => {
    return {
        messages: state.messages,
        nothing: state.nothing,
        persons: state.persons,
        error: state.error
    }
}

export default connect(mapStateToProps, mapDisPatchToProps)(Index)