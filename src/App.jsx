import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Component } from 'react';
import LoadingBar from 'react-top-loading-bar'
import Navbar from './components/Navbar';
import News from './components/News';

export default class App extends Component {
  pageSize = 15
  apiKey = import.meta.env.VITE_NEWS_API
  state={
    progress:0
  }
  setprogress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <Router>
        <Navbar />
        <LoadingBar color='#f11946' progress={this.state.progress} />
        <Routes>
          <Route path="/" element={<News setprogress={this.setprogress} apiKey={this.apiKey}  key="general" pageSize={this.pageSize} category="general" />} />
          <Route path="/business" element={<News setprogress={this.setprogress} apiKey={this.apiKey}  key="business" pageSize={this.pageSize} category="business" />} />
          <Route path="/entertainment" element={<News setprogress={this.setprogress} apiKey={this.apiKey}  key="entertainment" pageSize={this.pageSize} category="entertainment" />} />
          <Route path="/health" element={<News setprogress={this.setprogress} apiKey={this.apiKey}  key="health" pageSize={this.pageSize} category="health" />} />
          <Route path="/science" element={<News setprogress={this.setprogress} apiKey={this.apiKey}  key="science" pageSize={this.pageSize} category="science" />} />
          <Route path="/sports" element={<News setprogress={this.setprogress} apiKey={this.apiKey}  key="sports" pageSize={this.pageSize} category="sports" />} />
          <Route path="/technology" element={<News setprogress={this.setprogress} apiKey={this.apiKey}  key="technology" pageSize={this.pageSize} category="technology" />} />
        </Routes>
      </Router>
    );
  };




}


