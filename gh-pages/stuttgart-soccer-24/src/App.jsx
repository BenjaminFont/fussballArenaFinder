import './App.css';
import data from './data.json';

function App() {


  return (
    <>
      {data.map((e) => {
        return <Element  {...e}/>
      })}
    </>
  );
}

export default App


function Element({ 
  source_website,
  court,
  time_slot_start,
  time_slot_end,
  is_available,
}) {
  return (
    <div>
      {source_website}
      {court}
      {time_slot_start}
      {time_slot_end}
      {is_available}
    </div>
  );

}

