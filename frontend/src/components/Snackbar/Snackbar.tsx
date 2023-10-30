import {
   Snackbar as SnackBar,
   Alert,
   AlertColor,
   SnackbarCloseReason,
} from "@mui/material";
import { FC, SyntheticEvent } from "react";

interface ISnackbarProps {
   message: {
      text: string;
      isOpen: boolean;
   };
   handleClose: (
      event:
         | Event
         | SyntheticEvent<any, Event>
         | SyntheticEvent<Element, Event>,
      // reason: SnackbarCloseReason
   ) => void;
   variant: AlertColor | undefined;
}

export const Snackbar: FC<ISnackbarProps> = ({
   handleClose,
   message,
   variant,
}) => {
   return (
      <SnackBar
         open={message?.isOpen}
         autoHideDuration={6000}
         onClose={handleClose}
      >
         <Alert onClose={handleClose} severity={variant} sx={{ width: "100%" }}>
            {message?.text}
         </Alert>
      </SnackBar>
   );
};
