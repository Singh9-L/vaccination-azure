import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      title: 'Vaccination checklist',
      act: 0,
      index: '',
      datas: [{
        name:'John W', address:'Brussels', number : 147852369, birthDate : '2000-10-22', vaccinated : true
      },{
        name:'Denn K', address:'Kharkiv', number : 456321789, birthDate : '1998-08-13', vaccinated : false
      },{
        name:'Olia M', address:'Vilnius', number : 564852136, birthDate : '1999-02-18', vaccinated : true
      },{
        name:'Claudia S', address:'Naples', number : 753123654, birthDate : '1997-05-15', vaccinated : false
      },{
        name:'Katia K', address:'Minsk', number : 578945612, birthDate : '1996-11-12', vaccinated : true
      }]
    }
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
        name, address, number, birthDate, vaccinated
      }
      datas.push(data);
    }else{                      //update
      let index = this.state.index;
      datas[index].name = name;
      datas[index].address = address;
      datas[index].number = number;
      datas[index].birthDate = birthDate;
      datas[index].vaccinated = vaccinated;
    }    

    this.setState({
      datas: datas,
      act: 0
    });

    this.refs.myForm.reset();
    this.refs.name.focus();
  }

  fRemove = (i) => {
    let datas = this.state.datas;
    datas.splice(i,1);
    this.setState({
      datas: datas
    });

    this.refs.myForm.reset();
    this.refs.name.focus();
  }

  fEdit = (i) => {
    let data = this.state.datas[i];
    this.refs.name.value = data.name;
    this.refs.address.value = data.address;
    this.refs.phoneNumber.value = data.number;
    this.refs.birthDate.value = data.birthDate;
    this.refs.vaccinated.checked = data.vaccinated;

    this.setState({
      act: 1,
      index: i
    });

    this.refs.name.focus();
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
              <button onClick={()=>this.fRemove(i)} className="myListButton">remove </button>
              <button onClick={()=>this.fEdit(i)} className="myListButton">edit </button>
            </li>
          )}
        </pre>
      </div>
    );
  }
}

export default App;
