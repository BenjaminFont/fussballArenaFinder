import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import data from './scraped/mac-arena-2023-05-10-new.json'

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

// const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

const startTime = "08:00:00.000Z"
const endTime = "22:00:00.000Z"
let headers = []
let rows = [["T1",true,true], ["T2",false,false], ["T3",false,true]]

function createTable(){
    data.forEach((court) => {
        headers.push(court.court)
    })
}
createTable()

function Cell({label, index}){
    if(index == 0){
      return <TableCell component="th">{label}</TableCell>
    }
    return <TableCell align="right">{label.toString()}</TableCell>
}

export default function BasicTable() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Timeslot</TableCell>
                        {headers.map((name) => (
                            <TableCell key={name} align="right">{name}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row[0]}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {row.map((cell, index)=>(
                                <Cell key={index} label={cell} index={index}/>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}