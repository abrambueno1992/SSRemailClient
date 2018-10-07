import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { doneAction, fetchMessagesAction, fetchPersonAction } from '../actions/actions'
import { reorganizeAction } from '../actions/localActions';
import Head from 'next/head'
import Navigation from '../components/Navigation';
import './Email.css'
class Email extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 20,
      start: 0,
      tryCounter: 0,
      tryCounter2: 0,
      end: false,
      fetching: false,
      messages: '',
      persons: '',
      sorted: false,
      count: 0,
      cc: false
    }
  }
  static async getInitialProps({ store, query, pathname }) {


  }

  callActions = () => {
    this.props.fetchMessagesAction(this.state.start, this.state.index)
  }
  handleFetchPersons = async () => {
    await this.props.messages.map(async each => {
      this.props.fetchPersonAction(each.from)
    })

  }
  componentDidMount = () => {
    if (this.props.organized === false && this.props.messages === null && this.state.tryCounter < 5) {
      this.callActions();
      this.setState({ fetching: true })
    }
    if (this.props.messages && this.props.organized === false && this.props.messages.error !== null && this.state.tryCounter < 5) {
      this.callActions();
      let current = this.state.tryCounter + 1;
      this.setState({ tryCounter: current })
    }

  }
  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.messages !== this.props.messages && this.props.messages && this.props.messages.error === undefined) {
      if (this.props.fetchPersonsComplete === false) {
        this.handleFetchPersons()
      }

    }
    if (this.props.messages && this.props.messages.error && this.props.organized === false) {
      this.callActions()
    }
    if (prevProps.persons !== this.props.persons && this.props.messages.length === this.props.persons.length) {
      this.props.doneAction()
    }
    if (this.props.fetchPersonsComplete === true && this.props.organized === false) {
      const sortedMessages = this.props.messages.sort(this.dynamicSort('from'));
      let sortedPersons = this.props.persons.sort(this.dynamicSort('email'))
      let count = this.state.count + 1;
      this.props.reorganizeAction(sortedPersons, sortedMessages)
      this.setState({ messages: sortedMessages, persons: sortedPersons, sorted: true })
    }
  }
  /**
* Function to sort alphabetically an array of objects by some specific key.
* 
* @param {String} property Key of the object to sort.
*/
  dynamicSort = (property) => {
    var sortOrder = 1;

    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }

    return function (a, b) {
      if (sortOrder == -1) {
        return b[property].localeCompare(a[property]);
      } else {
        return a[property].localeCompare(b[property]);
      }
    }
  }
  handleCC = () => {
    this.setState({ cc: !this.state.cc })
  }


  render() {
    // console.log('Email props', this.props, Link)
    // console.log('URL path', this.props.url.asPath[this.props.url.asPath.length - 1])
    if (this.props.organized === true) {
      const index = parseInt(this.props.url.asPath[this.props.url.asPath.length - 1], 10);

      return (
        <div>
          {/* <Link href="/"> */}
          <Head>
            <title>This page has a title 🤔</title>
            <meta charSet='utf-8' />
            <meta name="description" content="That's it!" />
            <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
            {/* <meta name="viewport" content="width=device-width, initial-scale=0.86, maximum-scale=3.0, minimum-scale=0.86"></meta> */}
          </Head>
          <Navigation />
          {this.state.cc ?
            <div className="EmailHeader">
              {/* <div>{this.props.persons[index].name}</div> */}
              <span className={`EmailDetails${this.state.cc}`} onClick={this.handleCC}>Hide Details</span>
              <div className="EmailSubject">Subject: {this.props.messages[index].subject}</div>
              <div className="EmailCC">CC: <span>{this.props.messages[index].cc}</span></div>
              <div className="EmailFrom">From: {this.props.messages[index].from}</div>
            </div>
            : 
            <div className="EmailHeader">
            <div className="EmailFrom">From: {this.props.messages[index].from}</div>
            <span className={`EmailDetails${this.state.cc}`} onClick={this.handleCC}>View Details</span> 
            </div>
            }

          <div className="EmailBody">
            <div>Body:{this.props.messages[index].body}</div>

          </div>


        </div>
      )
    } else {
      return (
        <div>

          <h3>Loading Redux Store and Component</h3>
        </div>
      )
    }

  }
}
const mapDisPatchToProps = dispatch => {
  return {
    fetchMessagesAction: bindActionCreators(fetchMessagesAction, dispatch),
    fetchPersonAction: bindActionCreators(fetchPersonAction, dispatch),
    doneAction: bindActionCreators(doneAction, dispatch),
    reorganizeAction: bindActionCreators(reorganizeAction, dispatch)

  }
}
const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    nothing: state.nothing,
    persons: state.persons,
    error: state.error,
    fetchPersonsComplete: state.fetchPersonsComplete,
    organized: state.organized
  }
}

export default connect(mapStateToProps, mapDisPatchToProps)(Email)