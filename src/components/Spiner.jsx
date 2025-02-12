import  { Component } from 'react'
import spinerr from './spiner.gif'
export class Spiner extends Component {
  

  render() {
    return (
      <div className='text-center'>
        <img src={spinerr} alt="loading" />
      </div>
    )
  }
}

export default Spiner