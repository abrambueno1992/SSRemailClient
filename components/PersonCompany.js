import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchBar from './SearchBar'
import './Side.css'
class PersonCompany extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPerson: '',
            currentAvatar: '',
            currentCompany: '',
        }
    }
    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.personChosen !== this.props.personChosen && this.props.personChosen !== null) {
            console.log('Person has been chosen', this.props.personChosen)
            let company;
            if (this.props.personChosen.company) {
                company = this.props.personChosen.company.name
            } else {
                company = 'No Company'
            }
            this.setState({
                currentPerson: this.props.personChosen.name,
                currentAvatar: this.props.personChosen.avatar,
                currentCompany: company,
            })
        }
        if (prevProps.organized !== this.props.organized  && this.props.personChosen === null) {
            let company;
            if (this.props.persons[0].company) {
                company = this.props.persons[0].company.name
            } else {
                company = 'No Company'
            }
            this.setState({
                currentPerson: this.props.persons[0].name,
                currentAvatar: this.props.persons[0].avatar,
                currentCompany: company
            })
        }
        
    }
    componentDidMount = () => {
        if (this.props.organized === true && this.props.personChosen === null) {
            let company;
            if (this.props.persons[0].company) {
                company = this.props.persons[0].company.name
            } else {
                company = 'No Company'
            }
            this.setState({
                currentPerson: this.props.persons[0].name,
                currentAvatar: this.props.persons[0].avatar,
                currentCompany: company
            })
        }

    }
    

    render() {
        return (
            <div className="MainSide">
                {/* Hello SearchBar Component */}
                {/* <PersonCompany /> */}
          <SearchBar />
                <div>
                    <div className="PersonName">
                        Person: {this.state.currentPerson}
                    </div>
                    <div className="CompanyName">
                        Company: {this.state.currentCompany}
                    </div>
                    <img className="Img" src={this.state.currentAvatar} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        personChosen: state.personChosen,
        messages: state.messages,
        persons: state.persons,
        organized: state.organized
    }
}

export default connect(mapStateToProps, {})(PersonCompany)