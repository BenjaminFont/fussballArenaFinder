import { useState } from 'react';
import './App.css';
import data from './scraped/data.json';
import MultiSelectDropdown from './components/dropdown.jsx'
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import TabComponent from './components/tab';
import { AutoGrid } from './components/grid';

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

  return (
    <>
      <div>
        <h1>Stuttgart Soccer 24 <SportsSoccerIcon color="primary" fontSize="large" /></h1>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <TabComponent onTabChange={setSelectedDay} />
          <MultiSelectDropdown
            options={data.map(e => e.court)}
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
