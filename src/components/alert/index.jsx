// import library yang dibutuhkan
import React from "react";
import { Alert, AlertIcon } from "@chakra-ui/react";

// buat komponen AlertNotification
export default function AlertNotification({ logged, message }) {
  if (logged === true) {
    // jika status success
    return (
      // tampilkan alert success
      <Alert status="success" variant="left-accent" borderRadius={"md"}>
        <AlertIcon />
        {message} {/* tampilkan message */}
      </Alert>
    );
  } else if (logged === false) {
    // jika status error
    return (
      // tampilkan alert error
      <Alert status="error" variant="left-accent" borderRadius={"md"}>
        <AlertIcon />
        {message} {/* tampilkan message */}
      </Alert>
    );
  }
}
