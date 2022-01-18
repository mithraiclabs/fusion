import { Switch } from "@material-ui/core";
import styles_forms from "../styles/Forms.module.scss";
import styles_treasury from "../styles/Treasury.module.scss";
import { DateSelector } from "./DatePicker.module";
import SliderCheckBox from "./SliderCheckbox";
const TreasuryFormNew = () => (
  <form className={styles_forms.form}>
    <h1>New Token Grant</h1>
    <p>Forms and fields, work in progress 🌱 &gt; 🌳</p>
    <fieldset>
      <table>
        <div className="input-group">
          <tr className="row-one">
            <th>
              <label htmlFor="mintToken">Mint Token</label>
            </th>
            <th>
              <Switch />
            </th>
          </tr>
          <tr>
            <th>
              <label htmlFor="amount">Amount</label>
            </th>
            <th>
              <input id="amount" type="text" />
            </th>
          </tr>
          <tr>
            <th>
              <label htmlFor="amount">Issue Options?</label>
            </th>
            <th>
              <Switch />
            </th>
          </tr>
          <tr>
            <th>
              <label htmlFor="duration">Duration</label>
            </th>
            <th>
              <input id="duration" type="text" />
            </th>
          </tr>
          <tr>
            <th>
              <label htmlFor="initialCliff">Initial Cliff</label>
            </th>
            <th>
              <input id="initialCliff" type="text" />
            </th>
          </tr>
          <tr>
            <th>
              {" "}
              <label htmlFor="vestPeriod">Vest Period</label>
            </th>
            <th>
              <DateSelector />
            </th>
          </tr>
          <tr>
            <th>
              {" "}
              <label htmlFor="amountPerPeriod">Amount per Period</label>
            </th>
            <th>
              <input id="amountPerPeriod" type="text" />
            </th>
          </tr>
          <tr>
            <th>
              {" "}
              <label htmlFor="numberOfPeriods">Number of Periods</label>
            </th>
            <th>
              <input id="numberOfPeriods" type="text" />
            </th>
          </tr>

          <tr>
            <th>
              {" "}
              <label htmlFor="recipient">Recipient(s)</label>
            </th>
            <th>
              {" "}
              <input id="recipient" type="text" />
              <fieldset className={styles_treasury.experiment}>
                <button className={styles_treasury.experiment}>+</button>
              </fieldset>
            </th>
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
