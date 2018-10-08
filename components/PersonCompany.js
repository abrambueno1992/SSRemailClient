import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchBar from './SearchBar'
import './Side.css'

const PersonCompany = props => {
    return (
        <div className="MainSide">
        <div className="SearchBarComponent">
        <SearchBar />
        </div>
        
        {props.personChosen !== null ?
        <div>
            <div className="PersonName">
                Person: {props.personChosen.name}
            </div>
            <div className="CompanyName">
                Company: {props.personChosen.company !== null ? 
                    props.personChosen.company.name : 
                    "No Company"}
            </div>
            <img className="Img" src={props.personChosen.avatar} />
        </div>
        :
        <div>Loading person</div>
        }
    </div>
    )
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