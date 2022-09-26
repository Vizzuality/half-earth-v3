import React from 'react';

import Component from './radio-button-component';

function RadioButton(props) {
  const { groupedOptions } = props;

  const parseGroupOptions = () => {
    const groupedOptionsMultiple = groupedOptions
      .filter((o) => !!o.options.length)
      .find((o) => o.options.length > 1);

    if (!groupedOptionsMultiple) {
      return groupedOptions.map((go) => {
        return {
          ...go,
          label: null,
        };
      });
    }
    return groupedOptions;
  };

  return <Component parseGroupOptions={parseGroupOptions} {...props} />;
}

export default RadioButton;
