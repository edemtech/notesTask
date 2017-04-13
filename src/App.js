import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPressed: false,
      items: [
        {id: 0, text: 'Элемент 0', isRemoved: false},
        {id: 1, text: 'Элемент 1', isRemoved: false},
        {id: 2, text: 'Элемент 2', isRemoved: false},
        {id: 3, text: 'Элемент 3', isRemoved: false}
      ]
    }
  }

  handleChange(item, e){
    const items = this.state.items;
    items[items.indexOf(item)].text = e.target.value;
    this.setState({ items: items });
  }
  addTab(){
    const items = this.state.items;
    if ( items.length > 0){
      items.push({ id: ( items[ items.length-1 ].id+1 ) , text: '' })
    } else items.push({ id: 0, text: '', isRemoved: false });
    this.setState({ items: items });
  }
  deleteTab(item){
    const items = this.state.items;
    if (items.indexOf(item) > -1) {
       items.splice(items.indexOf(item), 1);
    }
    this.setState({ items: items });
  }
  markTabAsRemoved(item){
    const items = this.state.items;
    items[items.indexOf(item)].isRemoved = true;
    this.setState({ items: items });
  }
  restoreTab(item){
    const items = this.state.items;
    items[items.indexOf(item)].isRemoved = false;
    this.setState({ items: items });
  }
  openPanel(st){
    (st===false) ? ( this.setState({ isPressed: true }) ) : ( this.setState({ isPressed: false }) );
  }

  render() {
    const { isPressed, items } = this.state;
    const listOfItems = items.map( (item) =>
      item.isRemoved ? (
        <div className="panel panel-danger" key={item.id}>
          <div className="panel-heading panel-heading-x">Item #{item.id}</div>
          <div className="panel-body panel-body-x">
            <textarea disabled className="form-control textarea-x"
                      rows="3"
                      value=''
                      onChange={this.handleChange.bind(this, item)}>
            </textarea>
          </div>
          <button className="btn btn-xs btn-primary" onClick={this.restoreTab.bind(this, item)}>Restore</button>
          <button className="btn btn-xs btn-danger" onClick={this.deleteTab.bind(this, item)}>Remove completely</button>
        </div>
      ) : (
        <div className="panel panel-danger" key={item.id}>
            <div className="panel-heading panel-heading-x">Item #{item.id}</div>
            <div className="panel-body panel-body-x">
              <textarea className="form-control textarea-x" rows="3" value={item.text} onChange={this.handleChange.bind(this, item)}></textarea>
            </div>
          <button className="btn btn-xs btn-danger" onClick={this.markTabAsRemoved.bind(this, item)}>Remove</button>
        </div>
      )
    );
    const listOfProps = items.map( (item) =>
      item.isRemoved ? <li className="list-group-item hidden" key={item.id}></li> : <li className="list-group-item" key={item.id}><span>{item.text}</span></li>
    );


    return (
      <div className="App col-md-6">
            <div className="panel panel-x col-md-6">
              <button className="btn btn-success"
                      onClick={this.openPanel.bind(this, isPressed)}>
                      { isPressed===false ? 'Open menu' : 'Close menu' }
              </button>
              <ul className="list-group">
                {listOfProps}
              </ul>
            </div>

            <div className={isPressed ? '' : 'hidden'}>
              <div className="panel panel-x col-md-6">
                {listOfItems}
                <button className="btn btn-success" onClick={  this.addTab.bind(this, items.id)  }>Add item</button>
              </div>
            </div>
      </div>
    );
  }
}

export default App;
