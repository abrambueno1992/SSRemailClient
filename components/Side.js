// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import './Side.css'
// import PersonCompany from './PersonCompany';
// class Side extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             search: '',
//             query: false,
//             list: [],
//             currentPerson: '',
//             currentAvatar: '',
//             currentCompany: '',
//         }
//     }
//     handleInput = e => {
//         e.preventDefault();
//         this.setState({
//             [e.target.name]: e.target.value.toLowerCase(),
//             query: true
//         });
//     }
//     handleAvatar = (i) => {
//         let company;
//         if (this.props.persons[i].company) {
//             company = this.props.persons[i].company.name
//         } else {
//             company = 'No Company'
//         }
//         this.setState({
//             currentCompany: company,
//             currentPerson: this.state.list[i].name,
//             currentAvatar: this.state.list[i].avatar,
//             search: '',
//             query: false,
//             list: []
//         })
//     }
//     componentDidUpdate = (prevProps, prevState) => {
        
//         if (prevProps.organized !== this.props.organized) {
//             let company;
//             if (this.props.persons[0].company) {
//                 company = this.props.persons[0].company.name
//             } else {
//                 company = 'No Company'
//             }
//             this.setState({
//                 currentPerson: this.props.persons[0].name,
//                 currentAvatar: this.props.persons[0].avatar,
//                 currentCompany: company,
//             })
//         }
//     }
//     componentDidMount = () => {

//         if (this.props.organized === true) {
//             let company;
//             if (this.props.persons[0].company) {
//                 company = this.props.persons[0].company.name
//             } else {
//                 company = 'No Company'
//             }
//             this.setState({
//                 currentPerson: this.props.persons[0].name,
//                 currentAvatar: this.props.persons[0].avatar,
//                 currentCompany: company
//             })
//         }
//     }


//     handleSubmit = () => {

//         let newregex = new RegExp(this.state.search, 'gi')
//         const temp = [];
//         this.props.persons.map(each => {
//             if (each.name.match(newregex)) {

//                 temp.push(each)

//             }
//         })
//         this.setState({ list: temp })
//     }
//     render() {
//         if (this.props.organized === true) {
//             return (
//                 <div className="MainSide">
//                     {/* <PersonCompany /> */}
//                     {/* <input
//                         type="text"
//                         name="search"
//                         placeholder="𝖰 Search for person"
//                         value={this.state.search}
//                         onChange={this.handleInput}
//                         className="InputSearch"
//                     />
//                     <button className="BtnSearch" onClick={this.handleSubmit}>Search</button>
//                     {this.state.query === false ?
//                         <div>
//                             <div className="PersonName">
//                                 Person: {this.state.currentPerson}
//                             </div>
//                             <div className="CompanyName">
//                                 Company: {this.state.currentCompany}
//                             </div>
//                             <img className="Img" src={this.state.currentAvatar} />
//                         </div> */}
//                         {/* :
//                         <div>
//                             <ul>
//                                 {this.state.list.map((each, i) => {
//                                     return (
//                                         <li onClick={() => this.handleAvatar(i)} key={each.email + i} name={i}>
//                                             {each.name}
//                                         </li>
//                                     )
//                                 })}
//                             </ul>
//                         </div>} */}
//                 </div>
//             )
            

//         } else {
//             return (
//                 <div>
//                     Organizing...
//                 </div>
//             )
//         }

//     }
// }
// const mapStateToProps = state => {
//     return {
//         messages: state.messages,
//         persons: state.persons,
//         organized: state.organized
//     }
// }

// export default connect(mapStateToProps, {})(Side)
