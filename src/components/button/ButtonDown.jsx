// import library yang dibutuhkan
import React from "react";
import { Button, Icon } from "@chakra-ui/react";
import { FaDownload } from "react-icons/fa";

// buat komponen ButtonAdd
export default function ButtonDown({ heading, onclick }) {
  return (
    <Button
      colorScheme={"blue"}
      size={{ base: "sm", md: "md" }}
      px={"10"}
      fontWeight={400}
      fontFamily={"Poppins"}
      onClick={() => onclick()}
      w={{ base: "full", md: "auto" }}
    >
      {heading} {/* tampilkan heading */}
      <Icon ml={2} as={FaDownload} w={5} h={5} />
    </Button>
  );
}
