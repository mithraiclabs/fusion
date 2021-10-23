import { Pie } from "react-chartjs-2";

type PsyChartProps = {
  data: any;
}

const PsyChart: React.FC<PsyChartProps> = ({
  data
}) => {
  return (
    <div>
      <Pie data={data} />
    </div>
  );
};

export default PsyChart;
