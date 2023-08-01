import { useState } from 'react';
import './App.css';
import data from './scraped/data.json';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import moment from 'moment';
import MultiSelectDropdown from './components/dropdown.jsx'
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function App() {
  // State variable to hold the selected options
  const [selectedOptions, setSelectedOptions] = useState([]);

  return (
    <>
      <div>
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
    <Box style={{ minWidth: "100%" }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {data.map((court_info) => {
          if (selectedOptions.length > 0 && !selectedOptions.includes(court_info.court))
            return null;
          // only create grids for the available slots
          return court_info.results.filter(time_slot => time_slot.is_available).map((time_slot, idx) => {
            return <div key={idx} style={{ margin: "10px" }}>
              <BasicCard
                source_website={court_info.source_website}
                court={court_info.court}
                time_slot_start={time_slot.time_slot_start}
                time_slot_end={time_slot.time_slot_end}
                is_available={true}
              />
            </div>;
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
  const displayFormat = "HH:mm";
  const dateStart = moment(time_slot_start);
  const dateEnd = moment(time_slot_end);
  const duration = moment.duration(dateEnd.diff(dateStart));
  const datePart = moment(time_slot_start).format("DD MMM");
  return (
    <a href={source_website} target="_blank" rel="noreferrer" style={{ display: "block" }}>
      <Card sx={{
        minWidth: 275, width: 275, background: "#eee", ':hover': {
          background: "white", // theme.shadows[20]
        },
      }} >
        <CardContent style={{ paddingBottom: "0px" }}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" style={{ wordWrap: "break-word" }} gutterBottom>
            {court}
          </Typography>
          <Typography color="text.secondary" >{datePart}</Typography>
          <Typography sx={{ mb: 1.5, fontSize: 20 }} color="text.secondary">
            {dateStart.format(displayFormat)}
          </Typography>
          <div style={{ display: "flex" }}>
            <AccessTimeIcon color="text.secondary" fontSize="small" style={{ marginLeft: "auto" }} />
            <Typography sx={{ mb: 1.5, fontSize: 16, textAlign: "right" }} >
              {duration.asMinutes()}m
            </Typography>
          </div>
        </CardContent>
      </Card>
    </a>
  );
}
