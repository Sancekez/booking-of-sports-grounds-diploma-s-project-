import {
   Box,
   TextField,
   SxProps,
   FormControl,
   FormLabel,
   RadioGroup,
   FormControlLabel,
   Radio,
} from "@mui/material";


type ModulCreateQuestionProps = {
   questionIndex: number;
   sx: SxProps;
};

export const ModulCreateQuestion = ({
   questionIndex,
   sx,
}: ModulCreateQuestionProps) => {


   return (
      <Box sx={sx}>
         <TextField variant="filled" label={questionIndex}>
            {questionIndex}
         </TextField>
         <FormControl>
            <RadioGroup>
               
            </RadioGroup>
         </FormControl>
      </Box>
   );
};
