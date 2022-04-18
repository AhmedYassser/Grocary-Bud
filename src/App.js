import { useEffect, useState } from "react";
import AlertMsg from "./AlertMsg";
import "./App.css";
import List from "./List";

function getLocalStorage(){
  let list = localStorage.getItem("List");
  if(list){
    return ( list = JSON.parse(localStorage.getItem("List")));
  }
  else{
    return [];
  }
};

function App() {
  const [name, setname] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setisEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [Alert, setAlert] = useState({ show: false, msg: "", type: "" });


  function handleSubmit(e) {
    e.preventDefault();
    if (!name) {
      showAlert(true, "Please enter value", "danger");
    } 
    
    else if (isEditing && name) {
      setList( 
        list.map( (item)=> {
          if(item.id == editID){
            return {...item , title:name};
          }
          return item;
        } )
      );
      setname("")
      setEditID(null);
      setisEditing(false);
      showAlert(true , "item edited" , "success")
    }
    
    else {
      showAlert(true, 'item added to the list ', 'success' );
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setname('');    }
  }

  function showAlert(show = false, msg = "", type = "") {
    setAlert({ show, msg, type });
  }

  function removeList (){
    showAlert( true , "List cleared successfully" , "danger");
    setList([]);
    setisEditing(false);
    setname('');
  }

  function removeItem(id) {
    showAlert(true , "Item deleted" , "danger");
    setList( list.filter((item) => item.id !== id));
  }

  function editItem(id){
    const toBeEdited = list.find((item)=> item.id === id);
    setisEditing(true);
    setEditID(id);
    setname(toBeEdited.title)
  }

  useEffect(() => {
        localStorage.setItem("List" , JSON.stringify(list));
  }, [list])

  return (
    <>
      <div className="Glass_container">

        <h3 className="p-3">Grocary Bud</h3>
        {Alert && <AlertMsg {...Alert} removeAlert={showAlert} list={list} />}
        <form onSubmit={handleSubmit} className="d-flex justify-content-between align-items-center m-3">

          <input type='text'
            className="form-control p-1 mx-1"
            placeholder='e.g. eggs'
            value={name}
            onChange={(e) => setname(e.target.value)} />

          <button className="btn btn-dark p-1">
          {isEditing ? 'edit' : 'submit'}
          </button>
        </form>

          <List items={list} removeItem={removeItem} editItem={editItem}/>
        
        <div className="text-center py-3 my-3">
          <button onClick={removeList} type='buttom' className="btn btn-info">Clear All</button>
        </div>

      </div>
    </>
  );
}

export default App;
