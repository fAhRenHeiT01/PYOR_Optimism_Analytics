import { LineChartComponent, BarChartComponent} from './components/charts';
import { GetTransactions, GetPrice } from './components/functions';

export default function App(props) {

  var transactions = GetTransactions("http://localhost:5000/get_transactions")
  var prices = GetPrice("http://localhost:5000/get_price")
   
return (
  <div>
    <div>
      <LineChartComponent {...props} data={transactions}></LineChartComponent>
    </div>
  <br></br>
    <div>
      <BarChartComponent {...props} data={prices}></BarChartComponent>
    </div>
  </div>
  
  );
};
