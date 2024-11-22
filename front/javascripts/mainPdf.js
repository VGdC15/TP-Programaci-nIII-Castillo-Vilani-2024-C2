// instalar paquete: npm install jspdf

const { jsPDF } = window.jspdf;

const doc = new jsPDF();
function guardar() {
  doc.html(document.getElementById("ticket"), {
    callback: function (doc) {
      doc.save("Ticket Rider's Edge.pdf");
    },
    x: 10,
    y: 10,
  });
}