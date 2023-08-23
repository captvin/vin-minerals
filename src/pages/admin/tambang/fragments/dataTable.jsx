import React from "react";
import ActionButton from "./ActionButton";

const columns = [
  {
    title: "Nama Tambang",
    dataIndex: "nama",
    key: "nama",
    width: "30%",
    defaultSortOrder: "ascend",
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
