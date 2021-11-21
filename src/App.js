import React, { Component } from 'react';
import './App.css';

import {supabase} from './client.js'

class App extends Component {
  currentID = 1000
  constructor(props){
    super(props);
    this.state={
      title: 'Vaccination checklist',
      act: 0,
      index: '',
      datas: []
    }
  } 

  insertEntry = async (item) =>{
    const insertData = {...item, birthDate: new Date(item.birthDate).toISOString().replace('.000Z', "")}

    const {data, error} = await supabase.from('vaccination-list').insert([insertData])
    console.log(error)
  }
  updateEntry = async (item) =>{
    const updateData = {...item, birthDate: new Date(item.birthDate).toISOString().replace('.000Z', "")}

    const {data, error} = await supabase.from('vaccination-list').update(updateData).match({id:updateData.id})
  }
  deleteEntry = async (id) =>{
    const insertData = {}

    const {data, error} = await supabase.from('vaccination-list').delete().match({id})
  }

  fSubmit = (e) =>{
    e.preventDefault();
    let datas = this.state.datas;
    let name = this.refs.name.value;
    let address = this.refs.address.value;
    let number = this.refs.phoneNumber.value;
    let birthDate = this.refs.birthDate.value;
    let vaccinated = this.refs.vaccinated.checked;

    if(this.state.act === 0){   //new
      let data = {
        id: ++this.currentID, name, address, number, birthDate, vaccinated
      }
      datas.push(data);
      this.insertEntry(data)
    }else{     
      let index = this.state.index;
      let data = {
        id: index, name, address, number, birthDate, vaccinated
      }                 //update
      const itemIndex = datas.findIndex(el => el.id === index)
      datas[itemIndex].name = name;
      datas[itemIndex].address = address;
      datas[itemIndex].number = number;
      datas[itemIndex].birthDate = birthDate;
      datas[itemIndex].vaccinated = vaccinated;
      this.updateEntry(data)
    }    

    this.setState({
      datas: datas,
      act: 0
    });

    this.refs.myForm.reset();
    this.refs.name.focus();
  }

  fRemove = (id) => {
    let datas = this.state.datas;
    datas.splice(datas.findIndex(el => el.id === id),1);
    this.setState({
      datas: datas
    });
    this.deleteEntry(id)

    this.refs.myForm.reset();
    this.refs.name.focus();
  }

  fEdit = (id) => {
    console.log(id)
    const index = this.state.datas.findIndex(el => el.id === id)
    console.log(index)
    let data = this.state.datas[index];
    this.refs.name.value = data.name;
    this.refs.address.value = data.address;
    this.refs.phoneNumber.value = data.number;
    this.refs.birthDate.value = data.birthDate;
    this.refs.vaccinated.checked = data.vaccinated;

    console.log(data.birthDate)

    this.setState({
      act: 1,
      index: id
    });

    this.refs.name.focus();
  }  

  loadSupabase = async () => {
    const data = await supabase.from('vaccination-list').select()
    console.log(data.data)
    const vaccinationData = data.data.map(el => {
      this.currentID = Math.max(this.currentID, el.id)
      return({
        ...el,
        birthDate: new Date(el.birthDate).toISOString().substr(0, 10)
      })
    })
    this.setState({datas : vaccinationData})
    console.log(vaccinationData)
  }

  componentDidMount(){
    this.loadSupabase()
  }

  render() {
    let datas = this.state.datas;
    return (
      <div className="App">
        <h2>{this.state.title}</h2>
        <form ref="myForm" className="myForm">
          <input type="text" ref="name" placeholder="name surname" className="formField" />
          <input type="text" ref="address" placeholder="address" className="formField" />
          <input type="number" ref="phoneNumber" placeholder="your number" className="formField" />
          <input type="date" ref="birthDate" placeholder="Date"  className="formField"/>
          <label>
            Vacinated?
           <input type="checkbox" ref="vaccinated" placeholder="vaccinated yes/ no"  className="formField"/>
          </label>
          <button onClick={(e)=>this.fSubmit(e)} className="myButton">submit </button>
        </form>
        <pre>
          {datas.map((data, i) =>
            <li key={i} className="myList">
              {i+1}. {data.name}, {data.address}, {data.birthDate},{data.number},{data.vaccinated ? 'Vaccinated' : 'Not vaccinated'}
              <button onClick={()=>this.fRemove(data.id)} className="myListButton">remove </button>
              <button onClick={()=>this.fEdit(data.id)} className="myListButton">edit </button>
            </li>
          )}
        </pre>
      </div>
    );
  }
}

export default App;
