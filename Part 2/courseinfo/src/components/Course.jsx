const Header = ({ courseName }) => {
    return (
     <h2>{courseName}</h2>
    )
}
  
const Part = ({ name, exercises }) => {
    return (
      <p>
        {name} {exercises}
      </p>
    )
}
  
const Content = ({ parts }) => {
    return (
      <div>
        {
          parts.map(part => (
            <Part key= {part.id} name= {part.name} exercises= {part.exercises}/>
          ))
        }
      </div>
    )
}
  
const Total = ({ parts }) => {
    const initialValue = 0
    const sum = parts.reduce(
      (acc, part) => acc + part.exercises,
      initialValue)
    return (
      <p style={{fontWeight: 'bold'}}>Total of {sum} exercises </p>
    )
}
  
const Course = ({ course }) => {
    return (
      <div>
        <Header courseName = {course.name} />
        <Content parts = {course.parts} />
        <Total parts = {course.parts} />
      </div>
    )
}

export default Course