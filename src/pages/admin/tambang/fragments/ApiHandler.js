// import library yang dibutuhkan
import axios from "axios";
import { BASE_API } from "../../../../utils/constants";
import { getLocalStorage } from "../../../../utils/helper/localStorage";
import { LOCAL_STORAGE_TOKEN } from "../../../../utils/constants";

// fungsi untuk mengambil semua data Meja
export const getAllMeja = async (param) => {
  // url untuk mengambil semua data Meja
  const URL = `${BASE_API}/tambang/${param}`;
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
      message: err.response.data.message,
    });
  }
};

// fungsi untuk mengambil data meja berdasarkan id
export const getMejaById = async (id) => {
  // url untuk mengambil data meja berdasarkan id
  const URL = `${BASE_API}/tambang/${id}`;
  // melakukan request ke server
  try {
    // melakukan request ke server
    const data = await axios.get(URL, {
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
      message: err.response.data.message,
    });
  }
};

// fungsi untuk mengambil data Meja berdasarkan nama
export const searchMeja = async (value) => {
  // url untuk mengambil data Meja berdasarkan nama
  const URL = `${BASE_API}/tambang/?nama=${value}`;
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
      // mengembalikan data meja
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

// fungsi untuk mengambil data Meja
export const addMeja = async (values) => {
  // url untuk menambahkan data Meja
  const URL = `${BASE_API}/tambang`;
  // melakukan request ke server
  try {
    // melakukan request ke server
    const data = await axios.post(URL, values, {
      headers: {
        Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_TOKEN)}`, // mengambil token dari local storage
      },
    });
    // mengambil data dari response
    const res = data;

    // jika status response adalah success
    if (res.status === 200) {
      return Promise.resolve({
        status: "success",
        message: "Berhasil menambahkan meja",
        data: res.data.data,
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

// fungsi untuk mengambil data meja berdasarkan id
export const updateMeja = async ({ values, id }) => {
  // url untuk mengubah data meja berdasarkan id
  const URL = `${BASE_API}/tambang/${id}`;
  // melakukan request ke server
  try {
    // melakukan request ke server
    const data = await axios.patch(URL, values, {
      headers: {
        Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_TOKEN)}`, // mengambil token dari local storage
      },
    });
    // mengambil data dari response
    const res = data;

    // jika status response adalah success
    if (res.status === 200) {
      // mengembalikan data meja
      return Promise.resolve({
        status: "success",
        message: "Berhasil mengubah meja",
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

// fungsi untuk menghapus data meja berdasarkan id
export const deleteMeja = async (id) => {
  // url untuk menghapus data meja berdasarkan id
  const URL = `${BASE_API}/tambang/${id}`;
  try {
    // melakukan request ke server
    const data = await axios.delete(URL, {
      headers: {
        Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_TOKEN)}`, // mengambil token dari local storage
      },
    });
    // mengambil data dari response
    
  } catch (err) {
    // jika terjadi error
    // mengembalikan error
    return Promise.resolve({
      status: "error",
      message: err.response.data.message,
    });
  }
};
