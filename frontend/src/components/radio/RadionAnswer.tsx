import { TextField, FormControlLabel, Radio } from "@mui/material";
import { useState, ChangeEvent } from "react";

const RadionAnswer = () => {
   const [label, setLabel] = useState("");

   const handleLabelChange = (event: ChangeEvent<HTMLInputElement>) => {
      setLabel(event.target?.value);
   };

   return (
      <FormControlLabel
         value="option"
         control={<Radio disabled />}
         label={
            <TextField
               value={label}
               onChange={handleLabelChange}
               placeholder="Enter label"
            />
         }
      />
   );
};

export default RadionAnswer;
