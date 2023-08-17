// import library yang dibutuhkan
import { useDisclosure, IconButton } from "@chakra-ui/react";
import { Tool } from "react-feather";
import {ServiceMenu} from "../ApiHandler";

// buat komponen Delete
export default function Service({ payload, reload }) {
  // buat state untuk menampilkan modal
  
  return (
    <>
      {/* set onOpen ke komponen IconButton */}
      <IconButton
        onClick={async () => {
          await ServiceMenu(payload);
          await reload();
        }}
        aria-label="service"
        icon={<Tool />}
        colorScheme="green"
      />
    </>
  );
}
