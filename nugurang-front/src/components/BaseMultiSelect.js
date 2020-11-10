import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';


export default function BaseMultiSelect({ items, label, onChange, placeholder=null }) {
  return (
    <Autocomplete
      multiple
      onChange={onChange}
      options={items}
      getOptionLabel={option => option.name}
      filterSelectedOptions
      renderInput={params => (
        <TextField
          {...params}
          variant="outlined"
          label={label}
          placeholder={placeholder}
          margin="normal"
          fullWidth
        />
      )}
    />
  );
}