// import library yang dibutuhkan
import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Grid,
  GridItem,
  Container,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Textarea,
  Button,
  Heading,
  FormHelperText,
  Box,
  Flex,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { updateMenu, getMenuById } from "./ApiHandler";
import AlertNotification from "../../../../components/alert";
import { formatUang } from "../../../../utils/helper/formatUang";

// buat komponen ModalAdd
export default function ModalAdd({ isOpen, onClose, payload, reload }) {
  // buat state
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [unit, setUnit] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  // fungsi untuk menambahkan unit
  const submitHandler = async (values) => {
    setIsLoading(true);
    // set value dari form
    let form = new FormData();
    unit.nama_model !== values?.nama_model &&
      form.append("nama_model", values?.nama_model);
    unit.nomor_unit !== values?.nomor_unit &&
      form.append("nomor_unit", values?.nomor_unit);
    unit.jenis_BBM !== values?.jenis_BBM &&
      form.append("jenis_BBM", values?.jenis_BBM);
    unit.jenis_angkutan !== values?.jenis_angkutan && form.append("jenis_angkutan", values?.jenis_angkutan);
    unit.average_BBM !== values?.average_BBM && form.append("average_BBM", values?.average_BBM);
    unit.service !== values?.service && form.append("service", values?.service);
    values?.foto[0] &&
      unit.image !== values?.foto[0] &&
      form.append("gambar", values?.foto[0]);

    // panggil fungsi updateMenu
    const res = await updateMenu({ values: form, id: payload });
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

  // useEffect untuk mengambil data menu berdasarkan id
  useEffect(() => {
    if (unit) {
      reset({
        nama_model: unit.nama_model,
        nomor_unit: unit.nomor_unit,
        jenis_BBM: unit.jenis_bbm,
        jenis_angkutan: unit.jenis_angkutan,
        average_BBM: unit.average_BBM,
        service: unit.service,
      });
    }
  }, [unit]);

  // useEffect untuk mengambil data menu berdasarkan id
  useEffect(() => {
    const getMenu = async () => {
      const res = await getMenuById(payload);
      setUnit(res.data);
    };
    getMenu();
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
          <Heading fontSize={20}>Edit unit</Heading>
          <Box mt={4}>
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
                    placeholder="Model"
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
                    placeholder="Nomor"
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
                      required: true,
                    })}
                  />
                  {/* 
                    jika error type nya required, maka tampilkan pesan error
                  */}
                  {errors.average_BBM?.type === "required" && (
                    <FormHelperText textColor="red" mb={4}>
                      Masukkan Average
                    </FormHelperText>
                  )}
                </Flex>
                <Flex direction="column">
                  <Input
                    name="service"
                    id="service"
                    borderRadius="lg"
                    focusBorderColor="green.600"
                    placeholder="Waktu service"
                    {...register("service", {
                      required: true,
                    })}
                  />
                  {/* 
                    jika error type nya required, maka tampilkan pesan error
                  */}
                  {errors.service?.type === "required" && (
                    <FormHelperText textColor="red" mb={4}>
                      Masukkan Waktu Service
                    </FormHelperText>
                  )}
                </Flex>
                <Flex direction="column">
                  <Input
                    type={"file"}
                    name="foto"
                    id="foto"
                    borderRadius="lg"
                    focusBorderColor="green.500"
                    placeholder="Foto"
                    {...register("foto")}
                  />
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
