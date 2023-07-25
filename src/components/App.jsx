import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import { Wrapper, Header } from './App.styled';
import { ContactForm } from './contactForm/ContactForm';
import { Filter } from './filter/Filter';
import { ContactList } from './contactList/ContactList';
const contactsKey = 'contacts';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const parsedContacts = JSON.parse(localStorage.getItem(contactsKey));
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem(contactsKey, JSON.stringify(this.state.contacts));
    }
  }

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  addContact = (name, number) => {
    if (
      this.state.contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts`);
      return;
    }
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getFiltredContacts = () => {
    const normalizedFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const filtredContacts = this.getFiltredContacts();

    return (
      <Wrapper>
        <Header>Phonebook</Header>
        <ContactForm onSubmit={this.addContact} />

        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.changeFilter} />
        <ContactList
          filtredContacts={filtredContacts}
          onDeleteContact={this.deleteContact}
        />
      </Wrapper>
    );
  }
}
