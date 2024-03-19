import { useState, useEffect } from 'react';
import initialData from './components/data/initialData.json';
import loadFromLS from './scripts/loadFromLS';
import saveToLS from './scripts/saveToLS';
import Phonebook from './components/PhoneBook/PhoneBook';
import ContactForm from './components/ContactForm/ContactForm';
import SearchBox from './components/SearchBox/SearchBox';
import ContactList from './components/ContactList/ContactList';
import './App.css';

function App() {
  const KEY_LOCAL_STORAGE = 'contacts';

  const [data, setData] = useState(() =>
    loadFromLS(KEY_LOCAL_STORAGE, initialData),
  );
  const [filter, setFilter] = useState('');

  const filteredContacts = data.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase()),
  );
  const deleteContact = contactId => {
    setData(prevState => {
      return prevState.filter(({ id }) => id !== contactId);
    });
  };
  const addContact = newContact => {
    setData(prevState => {
      return [newContact, ...prevState];
    });
  };
  useEffect(() => {
    saveToLS(KEY_LOCAL_STORAGE, data);
  }, [data]);

  return (
    <>
      <div className="wrapper">
        <Phonebook />
        <ContactForm onAddContact={addContact} />
        <SearchBox value={filter} onFilter={setFilter} />
      </div>

      <ContactList onDelete={deleteContact} data={filteredContacts} />
    </>
  );
}

export default App;
