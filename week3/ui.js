export const renderTable = (data) => {
  const table = document.getElementById("tableBody");
  table.innerHTML = data.map(({name, empid, dept, photo}, i) => `
    <tr>
      <td>${name}</td>
      <td>${empid}</td>
      <td>${dept}</td>
      <td>
        <div class="photo-box">
          <img src="${photo || 'https://via.placeholder.com/80x80?text=No+Photo'}" alt="${name}">
        </div>
      </td>
      <td>
        <button class="download-btn" onclick="downloadCard(${i})">Download</button>
      </td>
    </tr>
  `).join("");
};