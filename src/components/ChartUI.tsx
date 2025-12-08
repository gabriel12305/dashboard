import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';

const arrValues1 = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const arrValues2 = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const arrLabels = ['A','B','C','D','E','F','G'];

interface IndicatorUIProps {
    value1?: string;
    value2?: string;
    value3?: string;
    arrValues1: number[];
    arrValues2: number[];
    arrLabels: string[]
 }

export default function ChartUI(props: IndicatorUIProps) {
   return (
      <>
         <Typography variant="h5" component="div">
            Grafico {props.value3} vs {props.value1} & {props.value2}
         </Typography>
         <LineChart
            height={300}
            series={[
               { data: props.arrValues1, label: props.value1},
               { data: props.arrValues2, label: props.value2},
            ]}
            xAxis={[{ scaleType: 'point', data: props.arrLabels }]}
         />
      </>
   );
}