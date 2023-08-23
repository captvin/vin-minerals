// import library yang dibutuhkan
import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Grid,
  Container,
  FormControl,
  Input,
  Button,
  Heading,
  FormHelperText,
  Box,
  Flex,
  Select,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { updateMeja, getMejaById } from "./ApiHandler";
import AlertNotification from "../../../../components/alert";

// buat komponen ModalAdd
export default function ModalAdd({ isOpen, onClose, payload, reload }) {
  // buat state
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [tambang, setTambang] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // fungsi untuk menambahkan meja
  const submitHandler = async (values) => {
    setIsLoading(true);
    // membuat object value untuk menampung data yang akan diupdate
    let value = {};
    // jika nomor_meja yang diinputkan tidak sama dengan nomor_meja yang ada di database maka tambahkan nomor_meja ke object value
    if (tambang.nama !== values?.nama) {
      value.nama= values?.nama;
    }
    // jika status yang diinputkan tidak sama dengan status yang ada di database maka tambahkan status ke object value

    // panggil fungsi updateMeja
    const res = await updateMeja({ values: value, id: payload });
    // set message dan status dari respon
    setMessage(res.message);
    setStatus(res.status);
    // jika status respon adalah success
    if (res.status === "success") {
      // set loading menjadi false dan reset form setelah 500ms
      setTimeout(() => {
        onClose(), reset(), setStatus(""), setMessage(""), reload();
        setIsLoading(false);
      }, 500);
      return;
    }
    // jika status respon bukan success
    else {
      // set loading menjadi false dan reset form setelah 1000ms
      setTimeout(() => {
        setIsLoading(false), setMessage(""), setStatus("");
      }, 1000);
    }
  };

  // fungsi untuk menutup modal
  const handleClose = () => {
    reset();
    onClose();
  };

  // useEffect untuk mengambil data meja berdasarkan id
  useEffect(() => {
    if (tambang) {
      reset({
        nama: tambang.nama,
      });
    }
  }, [tambang]);

  // useEffect untuk mengambil data meja berdasarkan id
  useEffect(() => {
    const getMeja = async () => {
      const res = await getMejaById(payload);
      setTambang(res.data);
    };
    getMeja();
  }, [payload]);

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      blockScrollOnMount={false}
      motionPreset="scale"
      size={{ base: "sm", md: "xl" }}
    >
      <ModalOverlay />
      <ModalContent borderRadius="20px">
        <ModalBody p={8}>
          <Heading fontSize={20}>Edit tambang</Heading>
          <Box mt={4}>
            <AlertNotification status={status} message={message} />
          </Box>
          <FormControl method="POST">
            <Container gridTemplateRows="repeat(2,1fr)" p={0} my={6}>
              <Grid templateColumns="repeat(2, 1fr)" gap={5} my={3}>
                <Flex direction="column">
                  <Input
                    name="nama_kantor"
                    id="nama_kantor"
                    borderRadius="lg"
                    focusBorderColor="green.600"
                    placeholder="Nama"
                    {...register("nama", {
                      required: true,
                    })}
                  />
                  {/* 
                    jika error type nya required, maka tampilkan pesan error
                  */}
                  {errors.nama?.type === "required" && (
                    <FormHelperText textColor="red" mb={4}>
                      Masukkan Nama Tambang
                    </FormHelperText>
                  )}
                </Flex>
              </Grid>
            </Container>
            <Button
              variant="outline"
              colorScheme={"green"}
              fontWeight={500}
              px={6}
              borderRadius="lg"
              // ketika tombol batal diklik maka akan menjalankan fungsi handleClose
              onClick={handleClose}
            >
              Batal
            </Button>
            <Button
              type="submit"
              ml={4}
              px={6}
              colorScheme={"green"}
              borderRadius="lg"
              fontWeight={500}
              // ketika tombol submit diklik maka akan menjalankan fungsi submitHandler
              onClick={handleSubmit(async (values) => {
                await submitHandler(values);
              })}
              isLoading={isLoading}
            >
              Edit
            </Button>
          </FormControl>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
