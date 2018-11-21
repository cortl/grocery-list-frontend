import React from 'react'
import AddItem from '../containers/AddItem'
import ItemList from "../containers/ItemList";
import Header from "./Header";

const App = () => (
  <div className='container'>
      <Header/>
      <ItemList />
      <AddItem />
  </div>
);

export default App
