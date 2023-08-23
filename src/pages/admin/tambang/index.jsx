// Desc: Halaman Kelola Pengguna
// import library yang dibutuhkan
import React, { useState, useEffect } from "react";
import { Box, Flex, Progress, useDisclosure } from "@chakra-ui/react";
import { Input } from "antd";
const { Search } = Input;
import Heading from "../../../components/text/Heading";
import Container from "../../../components/container/Container";
import Table from "../../../components/table";
import { columns } from "./fragments/dataTable";
import ButtonAdd from "../../../components/button/ButtonAdd";
import ButtonDown from "../../../components/button/ButtonDown";
import ModalAdd from "./fragments/ModalAdd";
import { getAllMeja, searchMeja } from "./fragments/ApiHandler";
import Excel from "./fragments/action/Excel";

// buat komponen index
export default function index() {
  // buat state
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState([])
  const [data, setData] = useState([]); // state untuk data pengguna
  const { isOpen, onOpen, onClose } = useDisclosure(); // buat state untuk modal

  // fungsi untuk mencari pengguna
  const handleSearch = async (value) => {
    setLoading(true);
    const res = await searchMeja(value);
    // jika status respon adalah error, maka set data menjadi array kosong
    if (res.status === "error") {
      setData([]);
    }
    //  jika status respon bukan error, maka set data menjadi data respon
    else {
      setData(res.data.rows);
      setPage(res.data)
    }
    setLoading(false);
  };

  

  // fungsi untuk mengambil data pengguna
  const getData = async (newPage) => {
    setPage((prevState) => ({
      ...prevState,
    }));
    setLoading(true);
    const Page = `?page=${newPage}`
    const res = await getAllMeja(Page);
    setData(res.data.rows);
    setPage(res.data)
    setLoading(false);
  };

  const ExcelHandler = async () => {
    const excel = `?limit=${page.count}`
    const res = await getAllMeja(excel)
    Excel(res.data.rows)
  }

  // ambil data pengguna ketika komponen pertama kali di render
  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <ModalAdd isOpen={isOpen} onClose={onClose} reload={getData} />
      {/* modal tambah pengguna */}
      <Heading text="Kelola Tambang" /> {/* memanggil komponen heading */}
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        my={5}
        gap={5}
        flexDir={{ base: "column", md: "row" }}
      >
        {/* memanggil komponen button add */}
        <Box display={"flex"} flexDirection={"column"} gap={3}>
        <ButtonAdd heading={"Tambah Tambang"} onclick={onOpen} />
        <ButtonDown heading={"Download Excel"} onclick={ExcelHandler} />
        </Box>
        <Box w={{ base: "full", md: "auto" }}>
          <Search
            placeholder="Cari Tambang"
            // jika ada perubahan pada input, maka panggil fungsi handleSearch
            onChange={(e) => {
              // jika input kosong, maka panggil fungsi getData
              if (e.target.value === "") {
                getData();
              }
              // jika input tidak kosong, maka panggil fungsi handleSearch
              else {
                handleSearch(e.target.value);
              }
            }}
            style={{ width: "100%" }}
            allowClear={true}
          />
        </Box>
      </Flex>
      <Box my={10} maxW={"100%"}>
        {/*  jika loading true, maka tampilkan progress bar, jika loading false maka tampilkan table */}
        {loading ? (
          <Progress size="xs" isIndeterminate />
        ) : (
          <Box w={"100%"}>
            <Table
              columns={columns}
              data={data?.map((item, index) => {
                return {
                  ...item,
                  reload: getData,
                  key: index,
                };
              })}
              pagination={{
                position: ["bottomRight"],
                defaultPageSize: 10,
                showSizeChanger: false,
                current: page.currentPage,
                total: page.count,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} dari ${page.count} items`,
                onChange: getData,
              }}
            />
          </Box>
        )}
      </Box>
    </Container>
  );
}
