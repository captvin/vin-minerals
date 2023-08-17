// import library yang dibutuhkan
import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Grid,
  Container,
  FormControl,
  Input,
  Select,
  Button,
  Heading,
  FormHelperText,
  Box,
  Flex,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { addMenu } from "./ApiHandler";
import AlertNotification from "../../../../components/alert";

// buat komponen ModalAdd
export default function ModalAdd({ isOpen, onClose, reload }) {
  // buat state
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  // fungsi untuk menambahkan meja
  const submitHandler = async (values) => {
    // set loading menjadi true
    setIsLoading(true);
    let form = new FormData();
    form.append("nama_model", values.nama_model);
    form.append("nomor_unit", values.nomor_unit);
    form.append("jenis_BBM", values.jenis_BBM);
    form.append("jenis_angkutan", values.jenis_angkutan);
    form.append("average_BBM", values.average_BBM);
    form.append("service", values.service);
    form.append("image", values.image[0]);

    if (
      values.image[0].type !== "image/jpeg" &&
      values.image[0].type !== "image/png" &&
      values.image[0].type !== "image/jpg" &&
      values.image[0].type !== "image/webp"
    ) {
      setMessage("File harus berupa gambar");
      setStatus("error");
      setTimeout(() => {
        setIsLoading(false), setMessage(""), setStatus("");
      }, 1000);
      return;
    }

    // panggil fungsi addMenu
    const res = await addMenu(form);
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
          <Heading fontSize={20}>Tambah Unit</Heading>
          <Box mt={4}>
            {/* 
              jika status respon bukan success, maka tampilkan alert
            */}
            <AlertNotification status={status} message={message} />
          </Box>
          <FormControl method="POST">
            <Container gridTemplateRows="repeat(2,1fr)" p={0} my={6}>
              <Grid templateColumns="repeat(2, 1fr)" gap={5} my={3}>
                <Flex direction="column">
                  <Input
                    name="nama_model"
                    id="nama_model"
                    borderRadius="lg"
                    focusBorderColor="green.600"
                    placeholder="Nama Unit"
                    {...register("nama_model", {
                      required: true,
                    })}
                  />
                  {/* 
                    jika error type nya required, maka tampilkan pesan error
                  */}
                  {errors.nama_model?.type === "required" && (
                    <FormHelperText textColor="red" mb={4}>
                      Masukkan Nama Model
                    </FormHelperText>
                  )}
                </Flex>
                <Flex direction="column">
                  <Input
                    name="nomor_unit"
                    id="nomor_unit"
                    borderRadius="lg"
                    focusBorderColor="green.600"
                    placeholder="Nomor Unit"
                    {...register("nomor_unit", {
                      required: true,
                    })}
                  />
                  {/* 
                    jika error type nya required, maka tampilkan pesan error
                  */}
                  {errors.nomor_unit?.type === "required" && (
                    <FormHelperText textColor="red" mb={4}>
                      Masukkan Nomor Unit
                    </FormHelperText>
                  )}
                </Flex>
                <Flex direction="column">
                  <Select
                    name="jenis_BBM"
                    id="jenis_BBM"
                    borderRadius="lg"
                    focusBorderColor="green.600"
                    placeholder="BBM"
                    {...register("jenis_BBM", {
                      required: true,
                    })}
                  >
                    <option value="bensin">Bensin</option>
                    <option value="diesel">Diesel</option>
                  </Select>
                  {/* 
                    jika error type nya required, maka tampilkan pesan error
                  */}
                  {errors.jenis_BBM?.type === "required" && (
                    <FormHelperText textColor="red" mb={4}>
                      Masukkan jenis BBM
                    </FormHelperText>
                  )}
                </Flex>
                <Flex direction="column">
                  <Select
                    name="jenis_angkutan"
                    id="jenis_angkutan"
                    borderRadius="lg"
                    focusBorderColor="green.600"
                    placeholder="Angkutan"
                    {...register("jenis_angkutan", {
                      required: true,
                    })}
                  >
                    <option value="barang">Barang</option>
                    <option value="orang">Orang</option>
                  </Select>
                  {/* 
                    jika error type nya required, maka tampilkan pesan error
                  */}
                  {errors.jenis_angkutan?.type === "required" && (
                    <FormHelperText textColor="red" mb={4}>
                      Masukkan jenis angkutan
                    </FormHelperText>
                  )}
                </Flex>
                <Flex direction="column">
                  <Input
                    name="average_BBM"
                    id="average_BBM"
                    borderRadius="lg"
                    focusBorderColor="green.600"
                    placeholder="Average"
                    {...register("average_BBM", {
                      required: "Masukkan average",
                      validate: (value) => !isNaN(value) || "Masukkan nilai yang valid",
                    })}
                  />
                  {/* 
                    jika error type nya required, maka tampilkan pesan error
                  */}
                  {errors.average_BBM && (
                    <FormHelperText textColor="red" mb={4}>
                      {errors.average_BBM.message}
                    </FormHelperText>
                  )}
                </Flex>
                <Flex direction="column">
                  <Input
                    name="service"
                    id="service"
                    borderRadius="lg"
                    focusBorderColor="green.600"
                    placeholder="Service"
                    {...register("service", {
                      required: "Masukkan nilai",
                      validate: (value) => !isNaN(value) || "Masukkan nilai yang valid",
                    })}
                  />
                  {/* 
                    jika error type nya required, maka tampilkan pesan error
                  */}
                  {errors.service && (
                    <FormHelperText textColor="red" mb={4}>
                      {errors.service.message}
                    </FormHelperText>
                  )}
                </Flex>
                <Flex direction="column">
                  <Input
                    type={"file"}
                    name="image"
                    id="image"
                    borderRadius="lg"
                    focusBorderColor="green.500"
                    placeholder="Foto"
                    {...register("image", {
                      required: true,
                    })}
                  />
                  {/* 
                    jika error type nya required, maka tampilkan pesan error
                  */}
                  {errors.image?.type === "required" && (
                    <FormHelperText textColor="red" mb={4}>
                      Masukkan gambar
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
              onClick={handleClose} // panggil fungsi handleClose untuk menutup modal dan mereset form saat tombol batal diklik
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
              // panggil fungsi handleSubmit dan submitHandler saat tombol tambah diklik
              onClick={handleSubmit(async (values) => {
                await submitHandler(values);
              })}
              isLoading={isLoading}
            >
              Tambah
            </Button>
          </FormControl>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
