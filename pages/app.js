import React, { Component } from 'react';
import { reorganizeAction } from '../actions/localActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './App.css';
import Link from 'next/link';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: '',
            persons: '',
            sorted: false,
            count: 0,
            
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
    componentDidMount = () => {
        if (this.props.fetchPersonsComplete === true && this.props.organized === false) {
            const sortedMessages = this.props.messages.sort(this.dynamicSort('from'));
            let sortedPersons = this.props.persons.sort(this.dynamicSort('email'))
            let count = this.state.count + 1;
            this.props.reorganizeAction(sortedPersons, sortedMessages)
            this.setState({ messages: sortedMessages, persons: sortedPersons, sorted: true })
        }

    }
    componentDidUpdate = (prevProps, prevState) => {

    }


    render() {
        if (this.props.organized === true) {
            const persons = this.props.persons
            return (
                <div>
                    {this.props.messages.map(((each, i) => {
                            return (
                                <Link key={each + i} as={`/email/${i}`}  href={`/email`}>
                                    <div key={each} className="MainApp">
                                        <div className="Subject">{each.subject}</div>
                                        <div className="From">{persons[i].name}</div>
                                    </div>
                                </Link>
                            )
                    }))}
                </div>
            )
        } else {
            return (
                <div>
                    Sorting...
                </div>
            )
        }

    }
}
const mapDisPatchToProps = dispatch => {
    return {
        reorganizeAction: bindActionCreators(reorganizeAction, dispatch),
    }
}
const mapStateToProps = state => {
    return {
        messages: state.messages,
        persons: state.persons,
        fetchPersonsComplete: state.fetchPersonsComplete,
        organized: state.organized
    }
}
export default connect(mapStateToProps, mapDisPatchToProps)(App);