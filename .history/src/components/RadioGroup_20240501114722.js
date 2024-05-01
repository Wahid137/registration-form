import React, { useState } from 'react';
import { Form, FormField, Radio } from 'semantic-ui-react';

const RadioGroup = () => {
    const [value, setValue] = useState(null);

    const handleChange = (e, { value }) => setValue(value);

    return (
        <Form>
            <FormField>
                Selected value: <b>{value}</b>
            </FormField>
            <FormField>
                <Radio
                    label='Choose this'
                    name='radioGroup'
                    value='this'
                    checked={value === 'this'}
                    onChange={handleChange}
                />
            </FormField>
            <FormField>
                <Radio
                    label='Or that'
                    name='radioGroup'
                    value='that'
                    checked={value === 'that'}
                    onChange={handleChange}
                />
            </FormField>
        </Form>
    );
};

export default RadioGroup;