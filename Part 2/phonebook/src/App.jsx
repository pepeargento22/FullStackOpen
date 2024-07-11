import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import { getPhonebook, addPhonebook, deletePhonebook, changePhonebook } from './services/numbers'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')
  const [notification, setNotification] = useState({message: null, errorBoolean: true})

  useEffect(() => {
    getPhonebook()
      .then(initialPhonebook => {
        setPersons(initialPhonebook)
      })
  },[])

  const isFiltered = filterText != ''
  const applyFilter = (person) => ( person.name.toLowerCase().includes(filterText.toLowerCase()))

  const Notification = ({ message, isError }) => {
    if (message === null) {
      return null
    } else {
      return (
        <div className={ isError ? 'error' : 'success'}>
          {message}
        </div>
      )
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newObject = { name: newName, number: newNumber}
    const alreadyAdded = persons.find(person => newName === person.name)
    if (alreadyAdded) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        changePhonebook(alreadyAdded.id, newObject)
          .then(changedPerson => {
            setPersons(persons.map(person => person.id === alreadyAdded.id ? changedPerson : person))
            setNotification({ message: `${newName} number has been changed`, errorBoolean: false })
            setNewName('')
            setNewNumber('')
            setTimeout(() => {
              setNotification({ message: null})
            }, 3000);
          })
          .catch(error => {
            setNotification({ message: `Information of ${newName} has already been removed from server`, errorBoolean: true })
            setTimeout(() => {
              setNotification({message: null})
            }, 3000);
          })
      }
    } else {
      addPhonebook(newObject)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setNotification({message: `Added ${newName}`, errorBoolean: false })
          setNewName('')
          setNewNumber('')
          setTimeout(() => {
            setNotification({ message: null })
          }, 3000);
        })
    }
    
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }
  const handleFilter = (e) => {
    setFilterText(e.target.value)
  }

  const handleDelete = (personId, personName) => {
    if(window.confirm(`Delete ${personName} ?`)) {
        deletePhonebook(personId)
        setPersons(persons.filter(person => person.id !== personId))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} isError={notification.errorBoolean}/>
      <Filter 
        value={filterText} 
        onChange={handleFilter} 
      />
      <h3>add a new</h3>
      <PersonForm 
        nameValue={newName} 
        numberValue={newNumber} 
        onSubmit={handleSubmit} 
        onNameChange={handleNameChange} 
        onNumberChange={handleNumberChange} 
      />
      <h3>Numbers</h3>
      <Persons 
        persons={persons}
        setPersons={setPersons} 
        isFiltered={isFiltered} 
        apply={applyFilter}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App