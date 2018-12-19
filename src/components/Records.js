import React, { Component } from 'react';
import Record from './Record';
import RecordForm from './RecordForm';
import AmountBox from './AmountBox';

import * as RecordsAPI from '../utils/RecordsApi'

class Records extends Component {
  constructor(){
    super();
    this.state={
      error:null,
      isLoad:false,
      records:[]
    }
  }
  
  componentDidMount(){
    RecordsAPI.getAll().then(
      response =>this.setState({
        isLoad:true,
        records:response.data
      })
    ).catch(
      error => this.setState({
        isLoad:true,
        error
      })
    )    
  }

  addRecord(record){
     this.setState({
      error:null,
      isLoad:true,
      records:[
        ...this.state.records,
        record
      ]
     })
  }

  updateRecord(record, data){
      const recordIndex = this.state.records.indexOf(record);
      const newRecords = this.state.records.map((item, index)=>{
        if(index !== recordIndex){
          return item;
        }
        return{
          ...item,
          ...data
        };
      });
      this.setState({
        records: newRecords
      })
  }

  deleteRecord(record){
    const recordIndex = this.state.records.indexOf(record);
    const newRecords= this.state.records.filter( (item, index) => index !== recordIndex);
    this.setState({
      records: newRecords
    })
  }

  credit(){
    let credits = this.state.records.filter((record) => {
      return record.amount >=0;
    })
    return credits.reduce((prev,curr)=>{
      return prev+Number.parseInt(curr.amount,0)
    }, 0)
  }

  debit(){
    let credits = this.state.records.filter((record) => {
      return record.amount <0;
    })
    return credits.reduce((prev,curr)=>{
      return prev+Number.parseInt(curr.amount,0)
    }, 0)

  }

  balance(){
    return this.credit() + this.debit();
  }

  render() {
    const { isLoad, error, records} =  this.state;
    let recordsComponents;
   if(error){
     recordsComponents = <div>Error: {error.message}</div>; 
   }else if(!isLoad){
    recordsComponents = <div>Loading....</div>;
   }else{
     recordsComponents = ( 
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Date</th>
                <th>Title</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
   {records.map((record) => 
    (<Record key={record.id}
             record={record}  
             handelEditRecord={this.updateRecord.bind(this)}  
             handelDeleteRecord={this.deleteRecord.bind(this)}/>
    ))}
            </tbody>
          </table>      
      );
   }
   return(
    <div className="Records">
    <h2>Records</h2>
    <div className="row mb-3">
      <AmountBox text="Credit" type="success" amount={this.credit()} />
      <AmountBox text="Debit" type="danger" amount={this.debit()}    />
      <AmountBox text="Balance" type="info" amount={this.balance()}   />
    </div>
    <RecordForm  handelNewReocrd={this.addRecord.bind(this)} />
    {recordsComponents}
    </div>
   )
  }
}

export default Records;
