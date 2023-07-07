import { useState } from 'react';
import './App.css';
import data from './scraped/data.json';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import moment from 'moment';
import MultiSelectDropdown from './components/dropdown.jsx'
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';


function App() {
  // State variable to hold the selected options
  const [selectedOptions, setSelectedOptions] = useState([]);

  return (
    <>
      <div >
        <h1>Stuttgart Soccer 24 <SportsSoccerIcon color="primary" fontSize="large" /></h1>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <MultiSelectDropdown
            options={data.map(e => e.court)}
            selectedOptions={selectedOptions}
            onOptionSelect={(selected) => {
              setSelectedOptions(selected);
            }} />
        </div>
        <AutoGrid selectedOptions={selectedOptions} />
      </div>

    </>
  );
}

export default App

function AutoGrid({ selectedOptions }) {
  return (
    <Box>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {data.map((court_info) => {
          if (selectedOptions.length > 0 && !selectedOptions.includes(court_info.court))
            return null;
          // only create grids for the available slots
          return court_info.results.filter(time_slot => time_slot.is_available).map((time_slot, idx) => {
            return <Grid xs={3} key={idx}>
              <BasicCard
                source_website={court_info.source_website}
                court={court_info.court}
                time_slot_start={time_slot.time_slot_start}
                time_slot_end={time_slot.time_slot_end}
                is_available={true}
              />
            </Grid>;
          })

        })}
      </Grid>
    </Box>
  );
}

function BasicCard({
  source_website,
  court,
  time_slot_start,
  time_slot_end,
  is_available,
}) {
  const displayFormat = "DD MMM HH:mm"
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {court}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {moment(time_slot_start).format(displayFormat)} to {moment(time_slot_end).format(displayFormat)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" href={source_website}>Go to website</Button>
      </CardActions>
    </Card>
  );
}
