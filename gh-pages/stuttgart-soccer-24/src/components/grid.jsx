import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import moment from 'moment';
import AccessTimeIcon from '@mui/icons-material/AccessTime';


export function AutoGrid({ data }) {
  return (
    <Box style={{ width: "80rem", minHeight: "80rem" }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {data.map((court_info) => {
          // only create grids for the available slots
          return court_info.results.map((time_slot, idx) => {
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
        minWidth: 275, width: 275, background: "#c6c6c685", ':hover': {
          background: "#e3e3e385",
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
