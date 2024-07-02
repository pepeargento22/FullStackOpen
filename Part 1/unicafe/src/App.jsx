import { useState } from 'react'

const Button = ({ text, onClick }) => <button onClick={onClick}> {text} </button>

const Statistics = ( {feedback, stats, goodCounter, neutralCounter, badCounter} ) => {
  if ( goodCounter == 0 && neutralCounter == 0 && badCounter == 0) {
    return (
      <>
        <h2>Statistics</h2>  
        <div>No feedback given</div>
      </>
    )
  }

  return (
    <>
      <h2>Statistics</h2>
      <table>
        <StatisticLine text={feedback[0]} value={goodCounter} />
        <StatisticLine text={feedback[1]} value={neutralCounter} />
        <StatisticLine text={feedback[2]} value={badCounter} />
        <StatisticLine text={stats[0]} value={goodCounter + neutralCounter + badCounter} />
        <StatisticLine text={stats[1]} value={(goodCounter - badCounter) / (goodCounter + neutralCounter + badCounter)} />
        <StatisticLine text={stats[2]} value={goodCounter * 100 / (goodCounter + neutralCounter + badCounter) } />
      </table>
    </>
  )
}

const StatisticLine = ({ text, value }) => {
  if (text == 'positive') {
    return (
      <>
        <tr>
          <td>{text}</td> 
          <td>{value}%</td>
        </tr>
      </>
    )
  } else {
    return (
      <>
        <tr>
          <td>{text}</td> 
          <td>{value}</td>
        </tr>
      </>
    )
  }
}

function App() {
  const [goodCounter, setGoodCounter] = useState(0)
  const [neutralCounter, setNeutralCounter] = useState(0)
  const [badCounter, setBadCounter] = useState(0)

  const feedbackOptions = ['good', 'neutral', 'bad']
  const statisticOptions = ['all', 'average', 'positive']

  const increaseGoodCounter = () => setGoodCounter(goodCounter + 1)
  const increaseNeutralCounter = () => setNeutralCounter(neutralCounter + 1)
  const increaseBadCounter = () => setBadCounter(badCounter + 1)

  return (
    <>
      <h1>Give feedback</h1>
      <Button text={feedbackOptions[0]} onClick={increaseGoodCounter}/>
      <Button text={feedbackOptions[1]} onClick={increaseNeutralCounter}/>
      <Button text={feedbackOptions[2]} onClick={increaseBadCounter}/>
      <Statistics 
        feedback={feedbackOptions} 
        stats={statisticOptions} 
        goodCounter={goodCounter} 
        neutralCounter={neutralCounter} 
        badCounter={badCounter}
      />
    </>
  )
}

export default App
