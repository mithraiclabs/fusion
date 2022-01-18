
import { Switch } from '@material-ui/core';
import styles_forms from '../styles/Forms.module.scss';
import styles_treasury from '../styles/Treasury.module.scss';
import { DateSelector } from './DatePicker.module';
import SliderCheckBox from './SliderCheckbox';
const TreasuryFormNew = () => (
  <form className={styles_forms.form}>
    <h1>New Token Grant</h1>
    <p>Forms and fields, work in progress 🌱 &gt; 🌳</p>
    <fieldset>
      <div className='input-group'>
        <label htmlFor='mintToken'>Mint Token</label>
        <Switch/>
        
      </div>
      <div className='input-group'>
        <label htmlFor='amount'>Amount</label>
        <input id='amount' type='text' />
      </div>
    </fieldset>
    <fieldset>
      <div className='input-group'>
        <label htmlFor='amount'>Issue Options?</label>
        <Switch/>
      </div>
      <div className='input-group'>
        <label htmlFor='duration'>Duration</label>
        <input id='duration' type='text' />
      </div>
      <div className='input-group'>
        <label htmlFor='initialCliff'>Initial Cliff</label>
        <input id='initialCliff' type='text' />
      </div>
      <div className='input-group'>
        <label htmlFor='vestPeriod'>Vest Period</label>
        <DateSelector/>
      </div>
      <div className='input-group'>
        <label htmlFor='amountPerPeriod'>Amount per Period</label>
        <input id='amountPerPeriod' type='text' />
      </div>
      <div className='input-group'>
        <label htmlFor='numberOfPeriods'>Number of Periods</label>
        <input id='numberOfPeriods' type='text' />
      </div>
    </fieldset>
    <fieldset className={styles_treasury.experiment}>
      <div className='input-group'>
        <label htmlFor='recipient'>Recipient(s)</label>
        <input id='recipient' type='text' />
        <button>+</button>
      </div>
    </fieldset>
      <div className='psy-button-group'>
        <button>
          Save Draft
        </button>
        <button>
          Mint
        </button>
      </div>
  </form>
);
export default TreasuryFormNew;
