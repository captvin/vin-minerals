import React from "react";
import ActionButton from "./ActionButton";
import { Text } from "@chakra-ui/react";


const columns = [
  {
    title: "Nomor",
    dataIndex: "nomor_unit",
    key: "nomor_unit",
    width: "15%",
  },
  {
    title: "Model",
    dataIndex: "nama_model",
    key: "nama_model",
    width: "15%",
  },
  {
    title: "BBM",
    dataIndex: "jenis_BBM",
    key: "jenis_BBM",
    width: "15%",
    render: (data) => (
      <Text noOfLines={2} fontSize="sm">
        {data}
      </Text>
    ),
  },
  {
    title: "Angkutan",
    dataIndex: "jenis_angkutan",
    key: "jenis_angkutan",
    width: "15%",
    render: (data) => (
      <Text noOfLines={2} fontSize="sm">
        {data}
      </Text>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: "15%",
    render: (data) => (
      <Text noOfLines={2} fontSize="sm">
        {data}
      </Text>
    ),
  },
  {
    title: "AVG",
    dataIndex: "average_BBM",
    key: "average_BBM",
    width: "15%",
    render: (data) => (
      <Text noOfLines={2} fontSize="sm">
        {data}Km/lt
      </Text>
    ),
  },
  {
    title: "Service",
    dataIndex: "service",
    key: "service",
    width: "15%",
    render: (data) => (
      <Text noOfLines={2} fontSize="sm">
        per {data} bulan
      </Text>
    ),
  },
  {
    title: "Service Terakhir",
    dataIndex: "terakhir_service",
    key: "terakhir_service",
    width: "15%",
    render: (data) => (
      <Text noOfLines={2} fontSize="sm">
        {data}
      </Text>
    ),
  },
  {
    title: "Pemakaian",
    dataIndex: "pemakaian",
    key: "pemakaian",
    width: "15%",
    render: (data) => (
      <Text noOfLines={2} fontSize="sm">
        {data} kali
      </Text>
    ),
  },
  // {
  //   title: "Gambar",
  //   dataIndex: "imageData",
  //   key: "imageData",
  //   width: "15%",
  //   render: (data) => (
  //     <Image
  //       src={data}
  //       alt="foto unit"
  //       h={24}
  //       w={24}
  //       objectFit={"cover"}
  //       objectPosition={"center"}
  //     />
  //   ),
  // },
  {
    title: "Aksi",
    key: "aksi",
    width: "15%",
    render: (data) => (
      <ActionButton payload={data.id} reload={data.reload} />
    ),
  },
];

export { columns };
