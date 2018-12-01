import React from 'react'
import AddItem from './AddItem'
import Header from "./Header";
import ItemList from "./ItemList";

const App = () => (
  <div className='container'>
      <Header/>
      <ItemList />
      <AddItem />
  </div>
);

export default App
