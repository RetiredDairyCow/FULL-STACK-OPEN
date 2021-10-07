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

export default Course