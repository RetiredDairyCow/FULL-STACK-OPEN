import React from 'react'

const Course = (props) => 
{
  return (
    <div>
      <Header name={props.course.courseName}/>
      <Content parts={props.course.parts}/> 
      <Total tot={props.course.parts}/>
    </div>
  )
}

const Content = (props) =>
{
  return (
    <ul>
    {props.parts.map(line => 
        <Part key={line.id} part={line}/>)}
    </ul>
  )
}

const Part = (props) => 
{
  return (
    <li>{props.part.name} {props.part.exercises}</li>
  )
}   
    
    


const Header = (props) => 
{
  return (
    <div>
      <p>{props.name}</p>
    </div>
  )
}

const Total = (props) =>
{
  return (
    <div>
      <p>Total = {props.tot.reduce((prev, next) => prev + next.exercises, 0)}</p>
    </div>
  )
}

const App = () => {
  const course = { 
    id: 1,
    courseName : 'FRONT END BABY Stack application development',
    parts : [
    {
      id:1,
      name :'Fundamentals of React',
      exercises : 10
    },
    {
      id:2,
      name : 'Using props to pass data',
      exercises : 7
    },
    {
      id:3,
      name :'State of a component',
      exercises : 14
    }
  ]
  }
  return <Course course={course}/>
}

export default App