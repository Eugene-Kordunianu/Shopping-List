import React from 'react';

class MyComponent extends React.Component {
   state = {
      items: [],
      newItem: '',
      editItem: null,
      showAddButton: true
   };

   //!InputChange
   handleInputChange = event => {
      this.setState({ newItem: event.target.value });
   };

   //!ShowInput+button
   handleShowInput = () => this.setState({ showAddButton: false });
      

   //!натиск зберегти після редагування
   handleSaveItem = () => {
      const { items, editItem, newItem } = this.state;
      const newItems = [...items];
      newItems[editItem] = { name: newItem, bought: items[editItem].bought };
      this.setState({ items: newItems, newItem: '', editItem: null, showAddButton: true });
   };

   //!натиск додати після воду в інпут
   handleAddItem = () => {

      const { items, newItem } = this.state;
      this.setState({ editItem: null });
      if (newItem.trim() !== '') {
         this.setState({
            items: [...items,
            { name: newItem, bought: false }],
            newItem: '',
            showAddButton: true,
         });
      }
   };

   //!editAitem
   handleEditItem = (index) => {
      const { items } = this.state;
      this.setState({
         editItem: index,
         newItem: items[index].name,
         showAddButton: false,
      });
   };

   //!deletItem
   handleDeleteItem = (index) => {
      const { items } = this.state;
      const newItems = [...items];
      newItems.splice(index, 1);
      this.setState({ items: newItems });
   };

   //!paintLin
   handleToggleBought = (index) => {
      const { items } = this.state;
      const newItems = [...items];
      newItems[index].bought = !newItems[index].bought;
      this.setState({ items: newItems });
   };

   render() {
      const { items, newItem, editItem, showAddButton } = this.state;

      return (
         <div>
            {showAddButton ? (
               <button className='btn-plus' onClick={this.handleShowInput}>➕</button>
            ) : (
               <div className='box-inp-btn'>
                  <input
                     type="text"
                     value={newItem}
                     onChange={this.handleInputChange}
                  />
                  {editItem !== null ? (
                     <button onClick={this.handleSaveItem}>Зберегти 📀</button>
                  ) : (
                     <button onClick={this.handleAddItem}>Додати ➕</button>
                  )}
               </div>
            )}
            <table className='table'>
               <thead className='thead'>
                  <tr className='thead__items'>
                     <th>№</th>
                     <th>список покупок</th>
                     <th>редагувати✍️</th>
                     <th>куплено✅</th>
                     <th>видалити❌</th>
                  </tr>
               </thead>
               <tbody className='tbody'>
                  {items.map((item, index) => (
                     <tr className='tbody__items' key={index}>
                        <td>{index + 1}</td>
                        <td style={{ textDecoration: item.bought ? 'line-through' : 'none' }}>{item.name}</td>
                        <td><button className='tbody__btn' onClick={() => this.handleEditItem(index)}>✍️</button></td>
                        <td><button className='tbody__btn' onClick={() => this.handleToggleBought(index)}>✅</button></td>
                        <td><button className='tbody__btn' onClick={() => this.handleDeleteItem(index)}>❌</button></td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      );
   }
}

export default MyComponent;