
import styles_forms from '../styles/Forms.module.scss';
import styles_contributor from '../styles/Contributor.module.scss';
const ContributorFormNew = () => (
  <form className={styles_forms.form}>
    <p>This form is a placeholder, not the correct form</p>
    <h1>New Token Grant</h1>
    <p>Forms and fields, work in progress 🌱 &gt; 🌳</p>
    <fieldset>
      <div className='input-group'>
        <label htmlFor='mintToken'>Mint Token</label>
        <input id='mintToken' type='text' />
      </div>
      <div className='input-group'>
        <label htmlFor='amount'>Amount</label>
        <input id='amount' type='text' />
      </div>
    </fieldset>
    <fieldset>
      <div className='input-group'>
        <label htmlFor='amount'>Issue Options?</label>
        <input id='amount' type='text' value='true' />
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
        <input id='vestPeriod' type='text' />
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
    <fieldset className={styles_contributor.experiment}>
      <div className='input-group'>
        <label htmlFor='recipient'>Recipient(s)</label>
        <input id='recipient' type='text' />
      </div>
      <div >
        <div className='psy-button-group'>
          <button>+</button>
        </div>
      </div>
    </fieldset>
    <div className='psy-button-group'>
      <button>
        Submit
      </button>
    </div>
  </form>
);
export default ContributorFormNew;
