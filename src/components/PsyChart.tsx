import { Pie } from "react-chartjs-2";

type PsyChartProps = {
  data: any;
  options: any;
}

const PsyChart: React.FC<PsyChartProps> = ({
  data,
  options
}) => {
  return (
    <>
      <Pie data={data} options={options} />
    </>
  );
};

export default PsyChart;
