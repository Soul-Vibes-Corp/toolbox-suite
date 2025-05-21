document.getElementById('addItem').addEventListener('click', () => {
  const newRow = document.createElement('div');
  newRow.classList.add('item-row');
  newRow.innerHTML = `
    <input type="text" class="desc" placeholder="Description" required />
    <input type="number" class="qty" placeholder="Qty" required />
    <input type="number" class="rate" placeholder="Rate" required />
  `;
  document.getElementById('itemList').appendChild(newRow);
});

document.getElementById('invoiceForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const sender = document.getElementById('sender').value;
  const client = document.getElementById('client').value;
  const invoiceNumber = document.getElementById('invoiceNumber').value;
  const date = document.getElementById('date').value;
  const taxRate = parseFloat(document.getElementById('taxRate').value);

  let items = [];
  document.querySelectorAll('.item-row').forEach(row => {
    const desc = row.querySelector('.desc').value;
    const qty = parseFloat(row.querySelector('.qty').value);
    const rate = parseFloat(row.querySelector('.rate').value);
    items.push({ desc, qty, rate });
  });

  let subtotal = 0;
  items.forEach(item => {
    subtotal += item.qty * item.rate;
  });

  const tax = (subtotal * taxRate) / 100;
  const total = subtotal + tax;

  let invoice = `
INVOICE #${invoiceNumber}
Date: ${date}

From: ${sender}
To: ${client}

----------------------------------
ITEMS:
`;

  items.forEach((item, i) => {
    invoice += `${i + 1}. ${item.desc} — ${item.qty} x ${item.rate} = ${(item.qty * item.rate).toFixed(2)}\n`;
  });

  invoice += `
----------------------------------
Subtotal: $${subtotal.toFixed(2)}
Tax (${taxRate}%): $${tax.toFixed(2)}
TOTAL: $${total.toFixed(2)}

Thank you for your business!
`;

  document.getElementById('invoiceOutput').innerText = invoice;
});
