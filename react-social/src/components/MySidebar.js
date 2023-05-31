import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'

export default function MySidebar() {
  return (
    <div class="sidebar">
      <h2>XYZ Car</h2>
      <ul>
        <li><Link to="/"><i class="fas fa-home"></i>Home</Link></li>
        <li><i class="fas fa-project-diagram"></i><SearchBar /></li>
      </ul>
    </div>
  )
}
