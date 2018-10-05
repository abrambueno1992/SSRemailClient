import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Side.css'
class Side extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        if (this.props.organized === true) {
            return (
                <div className="MainSide">
                  <div className="PersonName">{this.props.persons[0].name}</div>
                  <img className="Img" src={this.props.persons[0].avatar} />
                </div>
              )
        } else {
            return (
                <div>
                    Organizing...
                </div>
            )
        }
      
    }
}
const mapStateToProps = state => {
    return {
        messages: state.messages,
        persons: state.persons,
        organized: state.organized
    }
}

export default connect(mapStateToProps, {})(Side)
