import { useState } from 'react';
import './App.css';
// import dynamically generated files
import data_today from './scraped/data_today.json';
import data_tomorrow from './scraped/data_tomorrow.json';
import data_overmorrow from './scraped/data_overmorrow.json';
import MultiSelectDropdown from './components/dropdown.jsx'
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import TabComponent from './components/tab';
import { AutoGrid } from './components/grid';
import Typography from '@mui/material/Typography';
import moment from 'moment';

const data = data_today.concat(data_tomorrow).concat(data_overmorrow);

function App() {
  // State variable to hold the selected options
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedDay, setSelectedDay] = useState([]);

  // filter the data base on the selected options and selected day
  const courtsFiltered = data.filter(
    courtInfo => (selectedOptions.length > 0 && selectedOptions.includes(courtInfo.court)) || selectedOptions.length == 0
  ).map(courtInfo => ({
    ...courtInfo,
    results: courtInfo.results.filter(time_slot => time_slot.is_available).filter(
      time_slot => selectedDay.length == 0 || selectedDay.isDateWithinRange(time_slot.time_slot_start)
    ),
  })
  )
  // get one of the dates from courts
  const parsedAt = moment(courtsFiltered[0].parsed_at);
  const duration = moment.duration(moment().diff(parsedAt));

  return (
    <>
      <div>
        <h1 style={{ marginBottom: "1rem" }} >Stuttgart Soccer 24 <SportsSoccerIcon color="primary" fontSize="large" /></h1>
        <Typography style={{ color: "dark" }} >Last updated {Math.round(duration.asMinutes())} minutes ago</Typography>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <TabComponent onTabChange={setSelectedDay} />
          <MultiSelectDropdown
            options={data.map(e => e.court).filter((value, index, array) => array.indexOf(value) === index)}
            selectedOptions={selectedOptions}
            onOptionSelect={(selected) => {
              setSelectedOptions(selected);
            }} />
        </div>
        <AutoGrid data={courtsFiltered} />
      </div>
    </>
  );
}

export default App
