import React from 'react';
import { Radio } from 'semantic-ui-react';

const RadioGroup = () => {


    return (


        <Radio
            label='Choose this'
            name='radioGroup'
            value='this'
            checked={value === 'this'}
            onChange={handleChange}
        />

    );
};

export default RadioGroup;