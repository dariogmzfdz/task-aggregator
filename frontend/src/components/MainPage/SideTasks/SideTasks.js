import React from "react";
import "./SideTasks.css";

function SideTasks() {
  return (
    <div>
      <nav className="tasks">
        <div className="tasks-header">
          <div>Today's tasks</div>
        </div>
        <div className="tasks-list">
          <div className="tasks-item">
            <div className="tasks-title">Task 1</div>
            <div className="tasks-time">08:00 AM</div>
          </div>
          <div className="tasks-item">
            <div className="tasks-title">Task 2</div>
            <div className="tasks-time">08:00 AM</div>
          </div>
          <div className="tasks-item">
            <div className="tasks-title">Task 3</div>
            <div className="tasks-time">08:00 AM</div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default SideTasks;
