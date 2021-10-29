
import styles_forms from '../styles/Forms.module.scss';
import styles_contributor from '../styles/Contributor.module.scss';
type TFEProps = {
  publicKey: any;
};
const ContributorFormEdit: React.FC<TFEProps> = ({
  publicKey
}) => {
  return (
    <form className={styles_forms.form}>
      <p>This form is a placeholder, not the correct form</p>
      <h1>Edit Token Grant</h1>
      <p>{publicKey}</p>
      <p>Forms and fields, work in progress 🌱 &gt; 🌳</p>
      <fieldset>
        <div className='input-group'>
          <label htmlFor='mintToken'>Mint Token</label>
          <input id='mintToken' type='text' value='EZtmM6wPqRGPEikmq6KrJ4qfNvUWw7PHDZwdW5L6i9TD' />
        </div>
        <div className='input-group'>
          <label htmlFor='amount'>Amount</label>
          <input id='amount' type='text' value='196' />
        </div>
      </fieldset>
      <fieldset>
        <div className='input-group'>
          <label htmlFor='amount'>Issue Options?</label>
          <input id='amount' type='text' value='true' />
        </div>
        <div className='input-group'>
          <label htmlFor='duration'>Duration</label>
          <input id='duration' type='text' value='January 1, 2022 to January 1, 2023' />
        </div>
        <div className='input-group'>
          <label htmlFor='initialCliff'>Initial Cliff</label>
          <input id='initialCliff' type='text' value='March 1, 2022' />
        </div>
        <div className='input-group'>
          <label htmlFor='vestPeriod'>Vest Period</label>
          <input id='vestPeriod' type='text' value='Month' />
        </div>
        <div className='input-group'>
          <label htmlFor='amountPerPeriod'>Amount per Period</label>
          <input id='amountPerPeriod' className='demo-borderless' type='text' value='16.33' />
        </div>
        <div className='input-group'>
          <label htmlFor='numberOfPeriods'>Number of Periods</label>
          <input id='numberOfPeriods' className='demo-borderless' type='text' value='12' />
        </div>
      </fieldset>
      <fieldset className={styles_contributor['experiment-two']}>
        <div className='input-group'>
          <label htmlFor='recipient'>Recipients</label>
          <input id='recipient' type='text' value='EGoNCktkgDh2GwgNJQSvEUAthcHyw2Jty177sP1Vu53S' />
          <input id='recipient' type='text' value='BFRZwBCG8cLTtGw5UXr5pf2qwJaGApS8qwvUydFuoVxH' />
          <input id='recipient' type='text' value='CaQXi4YTM3JtXDGL7rGFKdbRQsVABGY5nFYX94TN2msT' />
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
  )
}

export default ContributorFormEdit;
