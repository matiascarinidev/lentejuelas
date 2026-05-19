export function printTicket(venta: {
  id: string;
  fecha: string;
  items: {
    productoId: string;
    cantidad: number;
    precioUnitario: number;
    subtotal: number;
  }[];
  total: number;
  metodoPago: string;
  cliente?: { nombre: string } | null;
}) {
  const now = new Date(venta.fecha);
  const fecha = now.toLocaleDateString("es-AR");
  const hora = now.toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const html = `
    <html>
    <head>
      <title>Ticket</title>
      <style>
        body { font-family: monospace; font-size: 12px; width: 58mm; margin: 0 auto; padding: 8px; }
        h2 { text-align: center; margin: 0 0 4px; font-size: 14px; }
        .line { border-top: 1px dashed #000; margin: 4px 0; }
        .item { display: flex; justify-content: space-between; }
        .total { font-size: 16px; font-weight: bold; text-align: right; margin-top: 4px; }
        .footer { text-align: center; margin-top: 8px; font-size: 10px; }
      </style>
    </head>
    <body>
      <h2>LENTEJUELAS</h2>
      <p style="text-align:center;margin:0;">${fecha} ${hora}</p>
      <div class="line"></div>
      ${venta.items
        .map(
          (i) => `
        <div class="item">
          <span>${i.cantidad}x #${i.productoId.slice(-4)}</span>
          <span>$${Number(i.subtotal).toFixed(2)}</span>
        </div>`
        )
        .join("")}
      <div class="line"></div>
      <div class="total">TOTAL: $${Number(venta.total).toFixed(2)}</div>
      <p style="margin:4px 0;">${venta.metodoPago}</p>
      ${venta.cliente ? `<p style="margin:4px 0;">Cliente: ${venta.cliente.nombre}</p>` : ""}
      <div class="line"></div>
      <p class="footer">Gracias por tu compra</p>
    </body>
    </html>
  `;

  const win = window.open("", "_blank", "width=250,height=400");
  win?.document.write(html);
  win?.document.close();
  setTimeout(() => win?.print(), 300);
}
