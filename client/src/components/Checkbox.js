import React, { useCallback, useState, Fragment, useEffect } from "react";

import { Checkbox } from "@shopify/polaris";

export default function CheckboxExample(props) {
  const [checked, setChecked] = useState(false);

  const handleChange = useCallback(
    newChecked => setChecked(newChecked),

    []
  );
  useEffect(() => {
    setChecked(props.value);
  }, [props]);
  return (
    <Fragment>
      <Checkbox
        label={props.label}
        name={props.name}
        checked={checked}
        value={checked}
        onChange={handleChange}
      />
    </Fragment>
  );
}
