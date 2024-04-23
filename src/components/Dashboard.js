// src/components/Dashboard.js
import React, { Component } from 'react';
import Panel from './Panel';
import classnames from 'classnames';

const data = [
  {
    id: 1,
    label: 'Total Photos',
    value: 10,
  },
  {
    id: 2,
    label: 'Total Topics',
    value: 4,
  },
  {
    id: 3,
    label: 'User with the most uploads',
    value: 'Allison Saeng',
  },
  {
    id: 4,
    label: 'User with the least uploads',
    value: 'Lukas Souza',
  },
];

import {
  getTotalPhotos,
  getTotalTopics,
  getUserWithMostUploads,
  getUserWithLeastUploads
} from "../helpers/selectors";

class Dashboard extends Component {
  state = {
    loading: true,
    focused: null,
    photos: [],
    topics: []
  };

  componentDidMount() {
    const urlsPromise = ["/api/photos", "/api/topics"].map(url =>
      fetch(url).then(response => response.json())
    );

    Promise.all(urlsPromise).then(([photos, topics]) => {
      this.setState({
        loading: false,
        photos: photos,
        topics: topics
      });
    });
  }

  selectPanel = id => {
    this.setState(previousState => ({
      focused: previousState.focused !== null ? null : id
    }));
  };

  render() {
    const dashboardClasses = classnames("dashboard", {
      "dashboard--focused": this.state.focused
    });

    if (this.state.loading) {
      return <Loading />;
    }

    const data = [
      {
        id: 1,
        label: "Total Photos",
        getValue: getTotalPhotos
      },
      {
        id: 2,
        label: "Total Topics",
        getValue: getTotalTopics
      },
      {
        id: 3,
        label: "User with the most uploads",
        getValue: getUserWithMostUploads
      },
      {
        id: 4,
        label: "User with the least uploads",
        getValue: getUserWithLeastUploads
      }
    ];

    const panels = data.map(panel => (
      <Panel
        key={panel.id}
        label={panel.label}
        value={panel.getValue(this.state)}
        onSelect={() => this.selectPanel(panel.id)}
      />
    ));

    return <main className={dashboardClasses}>{panels}</main>;
  }
}

export default Dashboard;
