import { Switch } from "@material-ui/core";
import styles_forms from "../styles/Forms.module.scss";
import styles_treasury from "../styles/Treasury.module.scss";
import { DateSelector } from "./DatePicker.module";

const TreasuryFormNew = () => (
  <form className={styles_forms.form}>
    <h1>New Token Grant</h1>
    <p>Forms and fields, work in progress 🌱 &gt; 🌳</p>
    <fieldset>
      <table>
        <div className="input-group">
          <tr>
            <th>
              <label htmlFor="mintToken">Mint Token</label>
            </th>
            <td>
              <Switch />
            </td>
          </tr>
          <tr>
            <th>
              <label htmlFor="amount">Amount</label>
            </th>
            <td>
              <input id="amount" type="text" />
            </td>
          </tr>
          <tr>
            <th>
              <label htmlFor="amount">Issue Options?</label>
            </th>
            <td>
              <Switch />
            </td>
          </tr>
          <tr>
            <th>
              <label htmlFor="duration">Duration</label>
            </th>
            <td>
              <input id="duration" type="text" />
            </td>
          </tr>
          <tr>
            <th>
              <label htmlFor="initialCliff">Initial Cliff</label>
            </th>
            <td>
              <input id="initialCliff" type="text" />
            </td>
          </tr>
          <tr>
            <th>
              <label htmlFor="vestPeriod">Vest Period</label>
            </th>
            <td>
              <DateSelector />
            </td>
          </tr>
          <tr>
            <th>
              <label htmlFor="amountPerPeriod">Amount per Period</label>
            </th>
            <td>
              <input id="amountPerPeriod" type="text" />
            </td>
          </tr>
          <tr>
            <th>
                <label htmlFor="numberOfPeriods">Number of Periods</label>
            </th>
            <td>
              <input id="numberOfPeriods" type="text" />
            </td>
          </tr>

          <tr>
            <th>
              <label htmlFor="recipient">Recipient(s)</label>
            </th>
            <td>
              <input id="recipient" type="text" />
              <fieldset className={styles_treasury.experiment}>
                <button className={styles_treasury.experiment}>+</button>
              </fieldset>
            </td>
          </tr>

  
        </div>
      </table>
    </fieldset>

    <div className="psy-button-group">
      <button>Save Draft</button>
      <button>Mint</button>
    </div>
  </form>
);
export default TreasuryFormNew;
