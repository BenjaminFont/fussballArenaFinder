import { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import moment from 'moment';


function rangeObject(timeStart, timeEnd) {
  return {
    time_start: timeStart, // Convert input to Date objects
    time_end: timeEnd,     // Convert input to Date objects

    // Function to check if a date is within the range
    isDateWithinRange: function (dateToCheck) {
      if (!this.time_start || !this.time_end)
        return true;
      const dateToCheckMoment = moment(dateToCheck);
      return dateToCheckMoment.isBetween(this.time_start, this.time_end);
    },
  };
}


function getDayFromIndex(index) {
  if (index === -1) {
    return rangeObject(null, null);
  }
  const day_from_index = moment().startOf('day').add(index, "days");
  return rangeObject(day_from_index, day_from_index.clone().add(1, "day"));
}


function TabComponent({ onTabChange }) {
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    onTabChange(getDayFromIndex(selectedTab - 1));
  }, [selectedTab, onTabChange])

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    onTabChange(getDayFromIndex(selectedTab - 1));
  };

  return (
    <div>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        centered
      >
        <Tab label="No filter" />
        <Tab label="Today" />
        <Tab label="Tomorrow" />
        <Tab label="In 2 days" />
      </Tabs>
    </div>
  );
}

export default TabComponent;
