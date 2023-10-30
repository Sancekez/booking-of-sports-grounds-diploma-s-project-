import { InputLabel, MenuItem, Select, FormControl } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface ISelect {
   data: {
      options: string[] | [];
      inputLabel: string | null;
      labelId: string | undefined;
   };
   field: any;
   sx: object | null;
   errors: any;
   // helperText: string | null;
}

export function CustomSelect({ field, data, sx, errors }: ISelect) {
   return (
      <FormControl variant="standard" fullWidth sx={sx} error={errors}>
         <InputLabel id={data.labelId} color="secondary">
            {data.inputLabel}
         </InputLabel>
         <Select
            labelId={data.labelId}
            id="rule-select"
            value={field.value}
            label="Rule"
            onChange={(e) => field.onChange(e)}
            color="secondary"
            IconComponent={KeyboardArrowDownIcon}
            error={errors}
         >
            {data.options.map((item, i) => {
               return (
                  <MenuItem key={i} sx={{ p: "10px" }} value={item}>
                     {item}
                  </MenuItem>
               );
            })}
         </Select>
      </FormControl>
   );
}
