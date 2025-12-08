import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

function combineArrays(arrLabels: Array<string>, arrValues1: Array<number>, arrValues2: Array<number>) {
   return arrLabels.map((label, index) => ({
      id: index,
      label: label,
      value1: arrValues1[index],
      value2: arrValues2[index]
   }));
}

const columns: GridColDef[] = [
   { field: 'id', headerName: 'ID', width: 90 },
   {
      field: 'label',
      headerName: 'Hora',
      width: 125,
   },
   {
      field: 'value1',
      headerName: 'Value 1',
      width: 125,
   },
   {
      field: 'value2',
      headerName: 'Value 2',
      width: 125,
   },
   {
      field: 'resumen',
      headerName: 'Resumen',
      description: 'No es posible ordenar u ocultar esta columna.',
      sortable: false,
      hideable: false,
      width: 100,
      valueGetter: (_, row) => `${row.label || ''} ${row.value1 || ''} ${row.value2 || ''}`,
   },
];


interface IndicatorUIProps {
   nombre1:string;
   nombre2:string;
   nombre3:string;
   arrValues1: number[];
   arrValues2: number[];
   arrLabels: string[];
 }

export default function TableUI(props: IndicatorUIProps) {

   const rows = combineArrays(props.arrLabels, props.arrValues1, props.arrValues2);
 
   columns[1].headerName = props.nombre1;
   columns[2].headerName = props.nombre2;
   columns[3].headerName = props.nombre3;

   return (
      <Box sx={{ height: 350, width: '100%' }}>
         <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
               pagination: {
                  paginationModel: {
                     pageSize: 5,
                  },
               },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
         />
      </Box>
   );
}