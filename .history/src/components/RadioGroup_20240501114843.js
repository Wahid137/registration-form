import React, { useState } from 'react';
import { Radio } from 'semantic-ui-react';

const RadioGroup = () => {
    const [value, setValue] = useState(null);

    const handleChange = (e, { value }) => setValue(value);

    return (


        <Radio
            label='Choose this'
            name='radioGroup'
            value='this'
            checked={value === 'this'}
            onChange={handleChange}
        />
         
        </>


    );
};

export default RadioGroup;