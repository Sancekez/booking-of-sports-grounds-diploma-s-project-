import React from "react";
interface IMessage {
   isOpen: boolean;
   text: string;
}

export const useSetSnackbar = () => {
   const [message, setMessage] = React.useState<IMessage>({
      isOpen: false,
      text: "",
   });

   const handleClose = (reason?: string) => {
      if (reason === "clickaway") {
         return;
      }

      setMessage((prev) => ({ ...prev, isOpen: false }));
   };
   const handleOpen = (text: any) => {
      setMessage((prev) => ({ ...prev, isOpen: true, text: text }));
   };

   return { handleOpen, handleClose, message };
};
