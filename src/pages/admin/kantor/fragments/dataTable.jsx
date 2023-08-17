import React from "react";
import ActionButton from "./ActionButton";

const columns = [
  {
    title: "Nama Kantor",
    dataIndex: "nama_kantor",
    key: "nama_kantor",
    width: "30%",
    defaultSortOrder: "ascend",
  },
  {
    title: "Alamat",
    dataIndex: "alamat",
    key: "alamat",
    width: "30%",
  },
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
