import { Switch } from "@material-ui/core";
import styles_forms from "../styles/Forms.module.scss";
import styles_treasury from "../styles/Treasury.module.scss";
import { DateSelector } from "./DatePicker.module";

const TreasuryFormNew = () => (
  <div className={styles_treasury.top}>
    <h1>New Token Grant</h1>
    <p>Forms and fields, work in progress 🌱 &gt; 🌳</p>

      <table>
        <div className="input-group">
          <tr>
            <th>
              Mint Token 
            </th>
            <td>
              <Switch />
            </td>
          </tr>
          <tr>
            <th>
              Amount 
            </th>
            <td>
              <input id="amount" type="text" />
            </td>
          </tr>
          <tr>
            <th>
              Issue Options? 
            </th>
            <td>
              <Switch />
            </td>
          </tr>
          <tr>
            <th>
              Duration 
            </th>
            <td>
              <input id="duration" type="text" />
            </td>
          </tr>
          <tr>
            <th>
               Initial Cliff 
            </th>
            <td>
              <input id="initialCliff" type="text" />
            </td>
          </tr>
          <tr>
            <th>
               Vest Period 
            </th>
            <td>
              <DateSelector />
            </td>
          </tr>
          <tr>
            <th>
               Amount per Period 
            </th>
            <td>
              <input id="amountPerPeriod" type="text" />
            </td>
          </tr>
          <tr>
            <th>
               Number of Periods 
            </th>
            <td>
              <input id="numberOfPeriods" type="text" />
            </td>
          </tr>

          <tr>
            <th>
               Recipient(s) 
            </th>
            <td className="recipients">
              <input id="recipient" type="text" />
              <button className={styles_treasury.experiment}>+</button>
            </td>
          </tr>
        </div>
      </table>
  

    <div className="psy-button-group">
      <button>Save Draft</button>
      <button>Mint</button>
    </div>
  </div>
);
export default TreasuryFormNew;
