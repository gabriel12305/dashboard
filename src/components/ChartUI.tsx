import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';

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