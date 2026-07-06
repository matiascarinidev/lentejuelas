export function printTicket(venta: {
  id: string;
  fecha: string;
  items: {
    productoId: string;
    nombre?: string;
    cantidad: number;
    precioUnitario: number;
    subtotal: number;
  }[];
  total: number;
  metodoPago: string;
  cliente?: { nombre: string } | null;
  mesa?: number;
}) {
  const now = venta.fecha ? new Date(venta.fecha) : new Date();
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
        @page {
          size: 58mm auto;
          margin: 0;
        }
        body {
          width: 58mm;
          margin: 0;
          padding: 2mm;
          font-family: monospace;
          font-size: 10px;
        }
        h2 { text-align: center; margin: 0 0 1mm; font-size: 12px; }
        .mesa { text-align: center; font-size: 14px; font-weight: bold; margin: 2mm 0; }
        .line { border-top: 1px dashed #000; margin: 2mm 0; }
        .item { display: flex; justify-content: space-between; font-size: 10px; margin: 1mm 0; }
        .total { font-size: 14px; font-weight: bold; text-align: right; margin-top: 2mm; }
        .footer { text-align: center; margin-top: 3mm; font-size: 9px; }
        .metodo { margin: 2mm 0; font-size: 10px; }
        .cliente { margin: 1mm 0; font-size: 9px; }
      </style>
    </head>
    <body>
      <h2>LENTEJUELAS</h2>
      <p style="text-align:center;margin:0;font-size:9px;">${fecha} ${hora}</p>
      ${venta.mesa ? `<div class="mesa">MESA #${venta.mesa}</div>` : ""}
      <div class="line"></div>
      ${venta.items
        .map(
          (i) => `
        <div class="item">
          <span>${i.cantidad}x ${i.nombre || `#${i.productoId.slice(-4)}`}</span>
          <span>$${Number(i.subtotal).toFixed(2)}</span>
        </div>`
        )
        .join("")}
      <div class="line"></div>
      <div class="total">TOTAL: $${Number(venta.total).toFixed(2)}</div>
      <p class="metodo">${venta.metodoPago}</p>
      ${venta.cliente?.nombre ? `<p class="cliente">Cliente: ${venta.cliente.nombre}</p>` : ""}
      <div class="line"></div>
      <p class="footer">Gracias por tu visita</p>
      <script>
        window.onload = function() { setTimeout(function() { window.print(); }, 200); }
      </script>
    </body>
    </html>
  `;

  const win = window.open("", "_blank", "width=250,height=400");
  win?.document.write(html);
  win?.document.close();
}
