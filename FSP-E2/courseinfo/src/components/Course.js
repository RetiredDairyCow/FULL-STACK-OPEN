import React from 'react'

const Course = (props) => 
{
  return (
    <div>
      <Header name={props.course.name}/>
      <Content parts={props.course.parts}/> 
      <Total tot={props.course.parts}/>
    </div>
  )
}

const Content = (props) =>
{
  return (
    <div>
    {props.parts.map(line => 
        <Part key={line.id} part={line}/>)}
    </div>
  )
}

const Part = (props) => 
{
  return (
    <p>{props.part.name} {props.part.exercises}</p>
  )
}   
    
const Header = (props) => 
{
  return (
    <div>
      <h3>{props.name}</h3>
    </div>
  )
}

const Total = (props) =>
{
  return (
    <div>
      <p><b>total of {props.tot.reduce((prev, next) => prev + next.exercises, 0)} exercises</b></p>
    </div>
  )
}

export default Course