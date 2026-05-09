import { addItem } from './utils.js';
import { renderTable } from './ui.js';
import { createCounter } from './counter.js';
let facultyList = [];
const getId = createCounter();
/* Read Image */
const readImage = file =>
new Promise(res => {
const reader = new FileReader();
reader.onload = () => res(reader.result);
reader.readAsDataURL(file);
});
/* Add Faculty */
export const addFaculty = async () => {
  const name = document.getElementById("name").value.trim();
  const empid = document.getElementById("empid").value.trim();
  const dept = document.getElementById("dept").value.trim();
  const desig = document.getElementById("desig").value.trim();
  const file = document.getElementById("photo").files[0];

  if (!name || !empid || !dept || !desig) {
    alert('Please enter Name, Emp ID, Department, and Designation.');
    return;
  }

  const photo = file ? await readImage(file) : "";
  const newObj = {
    id: getId(),
    name,
    empid,
    dept,
    desig,
    photo
  };

  facultyList = addItem(facultyList, newObj);
  renderTable(facultyList);

  document.getElementById("name").value = "";
  document.getElementById("empid").value = "";
  document.getElementById("dept").value = "";
  document.getElementById("desig").value = "";
  document.getElementById("photo").value = "";
};
/* Download ID Card */
window.downloadCard = (i) => {
  const f = facultyList[i];
  const win = window.open("", "", "width=400,height=600");
  win.document.write(`
  <html>
  <head>
  <style>
  body { font-family: Arial, sans-serif; text-align:center; background:#f3f4f6; margin:0; }
  .id-card {
    width:320px;
    min-height:520px;
    margin: 24px auto;
    border:2px solid #1f2937;
    border-radius:18px;
    padding:18px;
    background:#ffffff;
    box-shadow: 0 18px 40px rgba(15,23,42,0.12);
  }
  .header {
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:8px;
    margin-bottom:16px;
  }
  .brand {
    width:60px;
    height:60px;
    border-radius:50%;
    background:#1d4ed8;
    color:#ffffff;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:24px;
    font-weight:bold;
    letter-spacing:1px;
  }
  .title {
    font-size:18px;
    font-weight:700;
    color:#1d4ed8;
    margin:0;
  }
  .subtitle {
    font-size:14px;
    color:#4b5563;
    margin:0;
  }
  .photo-box {
    width:130px;
    height:170px;
    margin:12px auto;
    overflow:hidden;
    border:2px solid #d1d5db;
    border-radius:14px;
  }
  .photo-box img {
    width:100%;
    height:100%;
    object-fit:cover;
  }
  .name {
    font-weight:bold;
    color:#111827;
    font-size:20px;
    margin:14px 0 6px;
  }
  .detail {
    margin:6px 0;
    color:#374151;
    font-size:14px;
  }
  .footer {
    font-size:12px;
    margin-top:20px;
    color:#6b7280;
    line-height:1.4;
  }
  </style>
  </head>
  <body>
  <div class="id-card">
    <div class="header">
      <div class="brand">KL</div>
      <p class="title">Faculty ID Card</p>
      <p class="subtitle">K L College, Hyderabad</p>
    </div>
    <div class="photo-box">
      <img src="${f.photo || 'https://via.placeholder.com/130x170?text=No+Photo'}" alt="${f.name}">
    </div>
    <div class="name">${f.name}</div>
    <p class="detail">Emp ID: ${f.empid}</p>
    <p class="detail">${f.desig}</p>
    <p class="detail">${f.dept}</p>
    <div class="footer">
      Bowrampet, Hyderabad, Telangana - 500043<br>
      Ph: 040-23542127
    </div>
  </div>
  </body>
  </html>
  `);
  win.print();
};