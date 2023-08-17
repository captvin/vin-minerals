// Desc: Halaman Kelola Menu
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
import { getAllMenu } from "./fragments/ApiHandler";
import Excel from './fragments/action/Excel'

// buat komponen index
export default function index() {
  // buat state
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(false); // state untuk search
  const [data, setData] = useState([]); // state untuk data menu
  const [page, setPage] = useState([])
  const [dataSearch, setDataSearch] = useState([]); // state untuk data menu [search
  const { isOpen, onOpen, onClose } = useDisclosure(); // buat state untuk modal

  // fungsi untuk mencari menu
  const handleSearch = async (value) => {
    setLoading(true);
    // melakukan filter pada data menu
    const res = data.filter((item) =>
      // jika nama menu mengandung value, maka tampilkan
      item.nama_model.toLowerCase().includes(value)
    );
    // menyimpan data menu yang sudah difilter ke dalam state dataSearch
    setDataSearch(res);
    setLoading(false);
  };

  // fungsi untuk mengambil data menu
  const getData = async (newPage) => {
    setPage((prevState) => ({
      ...prevState,
    }));
    setLoading(true);
    const Page = `?page=${newPage}`
    const res = await getAllMenu(Page);
    setData(res.data.result);
    setPage(res.data)
    setLoading(false);
  };

  const ExcelHandler = async () => {
    const excel = `?limit=${page.count}`
    const res = await getAllMenu(excel)
    Excel(res.data.result)
  }

  // ambil data menu ketika komponen pertama kali di render
  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <ModalAdd isOpen={isOpen} onClose={onClose} reload={getData} />
      {/* modal tambah menu */}
      <Heading text="Kelola Unit" /> {/* memanggil komponen heading */}
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        my={5}
        gap={5}
        flexDir={{ base: "column", md: "row" }}
      >
        {/* memanggil komponen button add */}
        <Box display={"flex"} flexDirection={"column"} gap={3}>
        <ButtonAdd heading={"Tambah Unit"} onclick={onOpen} />
        <ButtonDown heading={"Download Excel"} onclick={ExcelHandler} />
        </Box>
        
        <Box w={{ base: "full", md: "auto" }}>
          <Search
            placeholder="Cari Nama Unit"
            // jika ada perubahan pada input, maka panggil fungsi handleSearch
            onChange={(e) => {
              // jika input kosong, maka panggil fungsi getData
              if (e.target.value === "") {
                setSearch(false);
                getData();
              }
              // jika input tidak kosong, maka panggil fungsi handleSearch
              else {
                setSearch(true);
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
              data={
                search
                  ? dataSearch?.map((item, index) => {
                      return {
                        ...item,
                        reload: getData,
                        key: index,
                      };
                    })
                  : data?.map((item, index) => {
                      return {
                        ...item,
                        reload: getData,
                        key: index,
                      };
                    })
              }
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
