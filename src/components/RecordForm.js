import React, { Component } from 'react';
import * as RecordsAPI from '../utils/RecordsApi';


export default class RecordForm extends Component {
  constructor(){
    super();
    this.state = {
      date:"",
      title:"",
      amount:""
    }
  }

  valid(){
    return this.state.date && this.state.title && this.state.amount
  }

  handleChange(event){
     let name, obj;
     name = event.target.name;
     this.setState((
       obj={},
       obj[""+name]=event.target.value,
       obj
     ))
  }

  handleSubmit(event){
    event.preventDefault();
    const data ={
      date: this.state.date, 
      title: this.state.title, 
      amount:Number.parseInt(this.state.amount, 0)
    }
    RecordsAPI.create(data).then(
      response => this.props.handelNewReocrd(response.data),
      this.setState({
        date:"",
        title:"",
        amount:""
      })
    ).catch(
      error => console.log(error.message)
    )
  }

 
  render() {

    return (
        <form className="form-inline mb-3" onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group mr-1">
            <input type="text" className="form-control" placeholder="Date" onChange={this.handleChange.bind(this)} name="date" value={this.state.date}/>
          </div>
          <div className="form-group mr-1">
            <input type="text" className="form-control" placeholder="Title" onChange={this.handleChange.bind(this)} name="title" value={this.state.title}/>
          </div>
          <div className="form-group mr-1">
            <input type="text" className="form-control" placeholder="Amount" onChange={this.handleChange.bind(this)} name="amount" value={this.state.amount}/>
          </div>
          <button type="submit" className="btn btn-primary" disabled={!this.valid()}>Creat Record</button> 
        </form>
      


    );
  }
}  