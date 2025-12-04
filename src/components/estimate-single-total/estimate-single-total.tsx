type EstimateSingleTotalProps = {
  totalValue: number;
};
import "./estimate-single-total.scss";
const EstimateSingleTotal = ({ totalValue }: EstimateSingleTotalProps) => {
  return <div className="estimate-total">Wartość całkowita: {totalValue}</div>;
};

export default EstimateSingleTotal;
