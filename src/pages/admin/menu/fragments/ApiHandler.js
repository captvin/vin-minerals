// import library yang dibutuhkan
import axios from "axios";
import { BASE_API } from "../../../../utils/constants";
import { getLocalStorage } from "../../../../utils/helper/localStorage";
import { LOCAL_STORAGE_TOKEN } from "../../../../utils/constants";

// fungsi untuk mengambil semua data menu
export const getAllMenu = async (param) => {
  // url untuk mengambil semua data menu
  const URL = `${BASE_API}/unit/${param}`;
  // melakukan request ke server
  try {
    // melakukan request ke server
    const data = await axios.get(URL, {
      // menambahkan header Authorization
      headers: {
        Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_TOKEN)}`, // mengambil token dari local storage
      },
    });
    // mengambil data dari response
    const res = data;

    // jika status response adalah success
    if (res.status === 200) {
      // mengembalikan data Meja
      return Promise.resolve({
        status: "success",
        data: res.data,
      });
    }
    
  } catch (err) {
    // jika terjadi error
    // mengembalikan error
    return Promise.resolve({
      status: "error",
      message: err.response,
    });
  }
};

// fungsi untuk mengambil data menu berdasarkan id
export const getMenuById = async (id) => {
  // url untuk mengambil data menu berdasarkan id
  const URL = `${BASE_API}/unit/${id}`;
  // melakukan request ke server
  try {
    // melakukan request ke server
    const data = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_TOKEN)}`, // mengambil token dari local storage
      },
    });
    // mengambil data dari response
    const res = data.data;

    // jika status response adalah success
    
      // mengembalikan data menu
      return Promise.resolve({
        status: "success",
        data: res.result,
      });
    
  } catch (err) {
    // jika terjadi error
    // mengembalikan error
    return Promise.resolve({
      status: "error",
      message: err.response.data.message,
    });
  }
};

// fungsi untuk mengambil data menu berdasarkan nama
export const searchMenu = async (value) => {
  // url untuk mengambil data menu berdasarkan nama
  const URL = `${BASE_API}/unit/${value}`;
  // melakukan request ke server
  try {
    // melakukan request ke server
    const data = await axios.get(URL, {
      // menambahkan header Authorization
      headers: {
        Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_TOKEN)}`, // mengambil token dari local storage
      },
    });
    // mengambil data dari response
    const res = data.data;

    // jika status response adalah success
    if (res.status === "success") {
      // mengembalikan data menu
      return Promise.resolve({
        status: "success",
        data: res.data,
      });
    }
  } catch (err) {
    // jika terjadi error
    // mengembalikan error
    return Promise.resolve({
      status: "error",
      message: err.response.data.message,
    });
  }
};

// fungsi untuk mengambil data menu
export const addMenu = async (values) => {
  // url untuk menambahkan data menu
  const URL = `${BASE_API}/unit/`;
  // melakukan request ke server
  try {
    // melakukan request ke server
    const data = await axios.post(URL, values, {
      headers: {
        Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_TOKEN)}`, // mengambil token dari local storage
      },
    });
    // mengambil data dari response
    const res = data.data;

    // jika status response adalah success
      return Promise.resolve({
        status: "success",
        message: "Berhasil menambahkan menu",
        data: res.data,
      });
    
  } catch (err) {
    // jika terjadi error
    // mengembalikan error
    return Promise.resolve({
      status: "error",
      message: err.response,
    });
  }
};

// fungsi untuk mengambil data menu berdasarkan id
export const updateMenu = async ({ values, id }) => {
  // url untuk mengubah data menu berdasarkan id
  const URL = `${BASE_API}/unit/${id}`;
  // melakukan request ke server
  try {
    // melakukan request ke server
    const data = await axios.patch(URL, values, {
      headers: {
        Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_TOKEN)}`, // mengambil token dari local storage
      },
    });
    // mengambil data dari response
    const res = data.data;

    // jika status response adalah success
    
      // mengembalikan data menu
      return Promise.resolve({
        status: "success",
        message: "Berhasil mengubah menu",
        data: res.data,
      });
    
  } catch (err) {
    // jika terjadi error
    // mengembalikan error
    return Promise.resolve({
      status: "error",
      message: err.response.data.message,
    });
  }
};

// fungsi untuk menghapus data menu berdasarkan id
export const deleteMenu = async (id) => {
  // url untuk menghapus data menu berdasarkan id
  const URL = `${BASE_API}/unit/${id}`;
  try {
    // melakukan request ke server
    const data = await axios.delete(URL, {
      headers: {
        Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_TOKEN)}`, // mengambil token dari local storage
      },
    });
    // mengambil data dari response
    const res = data.data;

    // jika status response adalah success
    if (res.status === "success") {
      // mengembalikan data menu
      return Promise.resolve({
        status: "success",
        message: "Berhasil menghapus menu",
        data: res.data.id_user,
      });
    }
  } catch (err) {
    // jika terjadi error
    // mengembalikan error
    return Promise.resolve({
      status: "error",
      message: err.response.data.message,
    });
  }
};

export const ServiceMenu = async (id) => {
  // url untuk menghapus data menu berdasarkan id
  const URL = `${BASE_API}/unit/service/${id}`;
  try {
    // melakukan request ke server
    const data = await axios.patch(URL,null, {
      headers: {
        Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_TOKEN)}`, // mengambil token dari local storage
      },
    });
    // mengambil data dari response
    const res = data.data;

    // jika status response adalah success
    if (res.status === "success") {
      // mengembalikan data menu
      return Promise.resolve({
        status: "success",
        message: "Berhasil menghapus menu",
        data: res.data.id_user,
      });
    }
    
  } catch (err) {
    // jika terjadi error
    // mengembalikan error
    return Promise.resolve({
      status: "error",
      message: err.response.data.message,
    });
  }
};
