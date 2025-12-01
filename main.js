// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBMSsNz6Dgss5vr8vlPbDdKgwOIn3dMBik",
  authDomain: "insancemerlang2025.firebaseapp.com",
  projectId: "insancemerlang2025",
  storageBucket: "insancemerlang2025.firebasestorage.app",
  messagingSenderId: "900746896855",
  appId: "1:900746896855:web:20cfd37822398ef034d792"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const siswaCollection = collection(db, "Biodata");

// =======================
// MENAMPILKAN DAFTAR
// =======================
export async function tampilkanDaftar() {

  const snapshot = await getDocs(siswaCollection);
  const tabel = document.getElementById('tabelData');
  tabel.innerHTML = "";

  snapshot.forEach(docx => {
    const data = docx.data();
    const id = docx.id;

    const baris = document.createElement("tr");

    // Kolom nama
    const kolomNamaLengkap = document.createElement("td");
    kolomNamaLengkap.textContent = data.nama;

    const kolomJenisKelamin = document.createElement("td");
    kolomJenisKelamin.textContent = data.jenisKelamin;

    const kolomTanggalLahir = document.createElement("td");
    kolomTanggalLahir.textContent = data.tanggalLahir;

    const kolomAgama = document.createElement("td");
    kolomAgama.textContent = data.agama;

    const kolomHobi = document.createElement("td");
    kolomHobi.textContent = data.hobi;

    const kolomCitacita = document.createElement("td");
    kolomCitacita.textContent = data.citacita;

    const kolomNomorTelepon = document.createElement("td");
    kolomNomorTelepon.textContent = data.nomorTelepon;

    const kolomAlamat = document.createElement("td");
    kolomAlamat.textContent = data.alamat;

    // Aksi
    const kolomAksi = document.createElement("td");

    const tombolEdit = document.createElement("a");
    tombolEdit.textContent = "Edit";
    tombolEdit.href = "edit.html?id=" + id;
    tombolEdit.className = "button edit";

    const tombolHapus = document.createElement("button");
    tombolHapus.textContent = "Hapus";
    tombolHapus.className = "button delete";
    tombolHapus.onclick = async () => {
      await hapusSiswa(id);
    };

    kolomAksi.appendChild(tombolEdit);
    kolomAksi.appendChild(tombolHapus);

    // Masukkan ke tabel
    baris.appendChild(kolomNamaLengkap);
    baris.appendChild(kolomJenisKelamin);
    baris.appendChild(kolomTanggalLahir);
    baris.appendChild(kolomAgama);
    baris.appendChild(kolomHobi);
    baris.appendChild(kolomCitacita);
    baris.appendChild(kolomNomorTelepon);
    baris.appendChild(kolomAlamat);
    baris.appendChild(kolomAksi);

    tabel.appendChild(baris);
  });
}

// =======================
// MENAMBAHKAN DATA
// =======================
export async function tambahDataSiswa() {

  const nama = document.getElementById('nama').value;
  const jenisKelamin = document.getElementById('jenisKelamin').value;
  const tanggalLahir = document.getElementById('TanggalLahir').value;
  const agama = document.getElementById('Agama').value;
  const hobi = document.getElementById('hobi').value;
  const citacita = document.getElementById('cita-cita').value;
  const nomorTelepon = document.getElementById('nomor').value;
  const alamat = document.getElementById('alamat').value;

  await addDoc(siswaCollection, {
    nama: nama,
    jenisKelamin: jenisKelamin,
    tanggalLahir: tanggalLahir,
    agama: agama,
    hobi: hobi,
    citacita: citacita,
    nomorTelepon: nomorTelepon,
    alamat: alamat
  });

  window.location.href = "daftar.html";
}

// =======================
// HAPUS DATA
// =======================
export async function hapusSiswa(id) {
  await deleteDoc(doc(db, "Biodata", id));
  await tampilkanDaftar();
}