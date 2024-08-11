import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Data() {
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem("role");

  useEffect(() => {
    const fetchUserData = async (keyword = "", position = "") => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/search`,
          {
            params: { keyword, position },
          }
        );

        console.log("Response data:", response.data.rows);
        if (response.status === 200 && response.data.rows) {
          setData(response.data.rows);
          setFilteredData(response.data.rows);
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text:
            error.response?.data?.message ||
            "An error occurred while fetching user data.",
        });
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const searchUserData = async (keyword, position) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/search`,
        {
          params: { keyword, position },
        }
      );

      console.log("Search response data:", response.data);
      if (response.status === 200 && response.data?.data) {
        setFilteredData(response.data.data);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          error.response?.data?.message ||
          "An error occurred while searching for user data.",
      });
    }
  };

  const handleSearch = () => {
    const [keyword, position] = searchInput
      .split(",")
      .map((part) => part.trim());
    console.log("Search parameters:", { keyword, position });
    searchUserData(keyword || "", position || "");
  };

  const handleDetail = (id) => {
    navigate(`/detail/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/users/${id}`
      );

      if (response.status === 200) {
        const updatedData = data.filter((item) => item.id !== id);
        setData(updatedData);
        setFilteredData(updatedData);
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Data has been deleted.",
          timer: 1500,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          error.response?.data?.message ||
          "An error occurred while deleting the data.",
      });
    }
  };

  return (
    <main>
      <h2>Data Pribadi Pelamar</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Keyword, Position (e.g., Developer, IT)"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={handleSearch}>
          Search
        </button>
      </div>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Tempat Tinggal</th>
            <th>Tempat Tanggal Lahir</th>
            <th>Posisi yang Dilamar</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.nama}</td>
                <td>{item.alamat_tinggal}</td>
                <td>{item.tempat_tanggal_lahir}</td>
                <td>{item.posisi_dilamar}</td>
                <td>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => handleDetail(item.id)}
                  >
                    Detail
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                Tidak ada data tersedia
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  );
}

export default Data;
