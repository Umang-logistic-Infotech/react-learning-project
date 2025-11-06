// Sidebar.js
import React, { useContext } from 'react';
import './css/sidebar.css';
import { UserContext } from '../context/UserContextProvider';

function Sidebar() {
  const { user } = useContext(UserContext);
  console.log("User Name : ", user.name);
  console.log("User Login Status : ", user.loggedIn);

  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <h2 className="sidebar-title">React Tranning Tasks</h2>
        <ul className="sidebar-menu">
          <li><a href="/Program1">Program1</a></li>
          <li><a href="/Program2">Program2</a></li>
          <li><a href="/Program3">Program3</a></li>
          <li><a href="/Program4">Program4</a></li>
          <li><a href="/Program5">Program5</a></li>
          <li><a href="/Program6">Program6</a></li>
          <li><a href="/Program7">Program7</a></li>
          <li><a href="/Program8">Program8</a></li>
          <li><a href="/Program9">Program9</a></li>
          <li><a href="/TheMovieDB">The Movie DB</a></li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
