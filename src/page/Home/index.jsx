import { useState } from "react";
import "./style.css";
import img1 from "../../assets/edipng.png";
import Form from "../../components/FORM";
import axios from "axios";
import Swal from "sweetalert2";

function Home() {
  const [form, setForm] = useState({
    posisi_dilamar: "",
    nama: "",
    no_ktp: "",
    tempat_tanggal_lahir: "",
    jenis_kelamin: "",
    agama: "",
    golongan_darah: "",
    status: "",
    alamat_ktp: "",
    alamat_tinggal: "",
    email: "",
    no_telp: "",
    kontak_hubungi: "",
    skill: "",
    mutasi: "",
    penghasilan_diharapkan: "",
  });

  const [background, setBackground] = useState({
    pendidikan_terakhir: "",
    riwayat_pelatihan: "",
    riwayat_pekerjaan: "",
  });

  const userId = localStorage.getItem("id");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in form) {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    } else if (name in background) {
      setBackground((prevBackground) => ({
        ...prevBackground,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responses = await axios.all([
        axios.put(`${import.meta.env.VITE_API_URL}/update/${userId}`, form),
        axios.post(
          `${import.meta.env.VITE_API_URL}/detail/${userId}`,
          background
        ),
      ]);

      if (responses[0].status === 200 && responses[1].status === 201) {
        Swal.fire({
          icon: "success",
          title: "Update successful!",
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
          "An error occurred. Please try again.",
      });
    }
  };

  return (
    <main>
      <div>
        <img
          src={img1}
          alt="logo"
          width={250}
          height={250}
          className="img-fluid"
        />
      </div>
      <div>
        <h2 className="text-decoration-underline">DATA PRIBADI PELAMAR</h2>
      </div>
      <div className="text-start">
        <form onSubmit={handleSubmit}>
          <Form
            label="1. POSISI YANG DILAMAR ="
            name="posisi_dilamar"
            type="text"
            placeholder="Posisi yang Dilamar"
            value={form.posisi_dilamar}
            onChange={handleChange}
          />
          <Form
            label="2. NAMA ="
            name="nama"
            type="text"
            placeholder="Name"
            value={form.nama}
            onChange={handleChange}
          />
          <Form
            label="3. NO. KTP ="
            name="no_ktp"
            type="text"
            placeholder="No. KTP"
            value={form.no_ktp}
            onChange={handleChange}
          />
          <Form
            label="4. TEMPAT TANGGAL LAHIR ="
            name="tempat_tanggal_lahir"
            type="text"
            placeholder="Tempat Tanggal Lahir"
            value={form.tempat_tanggal_lahir}
            onChange={handleChange}
          />
          <Form
            label="5. JENIS KELAMIN ="
            name="jenis_kelamin"
            type="text"
            placeholder="Jenis Kelamin"
            value={form.jenis_kelamin}
            onChange={handleChange}
          />
          <Form
            label="6. AGAMA ="
            name="agama"
            type="text"
            placeholder="Agama"
            value={form.agama}
            onChange={handleChange}
          />
          <Form
            label="7. GOLONGAN DARAH ="
            name="golongan_darah"
            type="text"
            placeholder="Golongan Darah"
            value={form.golongan_darah}
            onChange={handleChange}
          />
          <Form
            label="8. STATUS ="
            name="status"
            type="text"
            placeholder="Status"
            value={form.status}
            onChange={handleChange}
          />
          <Form
            label="9. ALAMAT KTP ="
            name="alamat_ktp"
            type="text"
            placeholder="Alamat KTP"
            value={form.alamat_ktp}
            onChange={handleChange}
          />
          <Form
            label="10. ALAMAT TINGGAL ="
            name="alamat_tinggal"
            type="text"
            placeholder="Alamat Tinggal"
            value={form.alamat_tinggal}
            onChange={handleChange}
          />
          <Form
            label="11. EMAIL ="
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <Form
            label="12. NO TELP ="
            name="no_telp"
            type="text"
            placeholder="No Telp"
            value={form.no_telp}
            onChange={handleChange}
          />
          <Form
            label="13. ORANG TERDEKAT YANG DAPAT DIHUBUNGI ="
            name="kontak_hubungi"
            type="text"
            placeholder="Kontak Orang Terdekat"
            value={form.kontak_hubungi}
            onChange={handleChange}
          />
          <Form
            label="14. PENDIDIKAN TERAKHIR ="
            name="pendidikan_terakhir"
            type="text"
            placeholder="Jenjang Pendidikan Terakhir - Universitas - Jurusan - Tahun Masuk - Tahun Keluar"
            value={background.pendidikan_terakhir}
            onChange={handleChange}
          />
          <Form
            label="15. RIWAYAT PELATIHAN ="
            name="riwayat_pelatihan"
            type="text"
            placeholder="Nama kursus/Seminar - Sertifikat(Ya/Tidak) - Tahun"
            value={background.riwayat_pelatihan}
            onChange={handleChange}
          />
          <Form
            label="16. RIWAYAT PEKERJAAN ="
            name="riwayat_pekerjaan"
            type="text"
            placeholder="Nama Perusahaan - Posisi Terakhir - Pendapatan Terakhir -Tahun"
            value={background.riwayat_pekerjaan}
            onChange={handleChange}
          />
          <Form
            label="17. SKILL ="
            name="skill"
            type="text"
            placeholder="Skill"
            value={form.skill}
            onChange={handleChange}
          />
          <Form
            label="18. BERSEDIA DITEMPATKAN DI SELURUH KANTOR PERUSAHAAN ="
            name="mutasi"
            type="text"
            placeholder="YA / TIDAK"
            value={form.mutasi}
            onChange={handleChange}
          />
          <Form
            label="19. PENGHASILAN YANG DIHARAPKAN ="
            name="penghasilan_diharapkan"
            type="text"
            placeholder="Penghasilan yang Diharapkan"
            value={form.penghasilan_diharapkan}
            onChange={handleChange}
          />
          <button type="submit" className="btn btn-warning mt-3">
            Simpan
          </button>
        </form>
      </div>
    </main>
  );
}

export default Home;
