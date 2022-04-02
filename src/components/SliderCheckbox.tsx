import * as React from 'react';
import styles from '../styles/SliderCheckbox.module.scss';


//https://stackoverflow.com/questions/67996468/how-to-access-a-components-variable-outside-the-component-in-react-native
export default function SliderCheckBox() {
  return (
  <div className={styles["container"]}>
    <label className="switch" htmlFor="checkbox">
      <input type="checkbox" id="checkbox" />
      <div className="slider round"></div>
    </label>
  </div>
  );
} 
