 const { jsPDF } = window.jspdf;

 const doc = new jsPDF();

 function guardar() {
  const ticketElement = document.getElementById("ticket");

  html2canvas(ticketElement).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const doc = new jsPDF(); 

    const imgWidth = 400; 
    const imgHeight = (canvas.height * imgWidth) / canvas.width; 

    // posición centrada
    const x = (210 - imgWidth) / 2; // horizontal
    const y = (297 - imgHeight) / 7; // vertical

    doc.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
    doc.save("Ticket Rider's Edge.pdf");
  });
}


