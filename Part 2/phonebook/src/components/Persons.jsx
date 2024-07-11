const Person = ({ id, name, number, handleDelete }) => {
    const handleClick = () => {
        handleDelete(id, name)
    }

    return (
        <div>
            {name} {number} 
            <button onClick={handleClick}>delete</button>
        </div>
    )
}

const Persons = ( { persons, isFiltered, apply, handleDelete }) => {
    

    return (
        <>
            { isFiltered 
                ? persons.filter(apply).map(person => <Person key={person.id} id={person.id} name={person.name} number={person.number} handleDelete={handleDelete} />)   
                : persons.map(person => <Person key={person.id} id={person.id} name={person.name} number={person.number} handleDelete={handleDelete} />)
            }
        </>
    )
}

export default Persons