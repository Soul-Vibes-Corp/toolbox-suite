document.getElementById('contractForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const companyName = document.getElementById('companyName').value.trim();
  const clientName = document.getElementById('clientName').value.trim();
  const serviceDesc = document.getElementById('serviceDesc').value.trim();
  const scopeWork = document.getElementById('scopeWork').value.trim();
  const paymentTerms = document.getElementById('paymentTerms').value.trim();
  const startDate = document.getElementById('startDate').value;
  const endDate = document.getElementById('endDate').value;
  const contractAmount = parseFloat(document.getElementById('contractAmount').value).toFixed(2);

  if (new Date(startDate) > new Date(endDate)) {
    alert("Start date can't be after the end date.");
    return;
  }

  const contractText = `
CLIENT SERVICE AGREEMENT

This Agreement is made on ${new Date().toLocaleDateString()} between:

${companyName} (the "Service Provider"), and
${clientName} (the "Client").

1. SERVICE DESCRIPTION
The Service Provider agrees to perform the following services:
${serviceDesc}

2. SCOPE OF WORK
${scopeWork}

3. TERM
This Agreement shall commence on ${startDate} and shall terminate on ${endDate}.

4. PAYMENT
The Client agrees to pay $${contractAmount} for the services described herein.
Payment Terms:
${paymentTerms}

5. CONFIDENTIALITY
Both parties agree to maintain confidentiality of all sensitive information exchanged.

6. TERMINATION
Either party may terminate this Agreement with a 15-day written notice.

7. SIGNATURES

_________________________         _________________________
${companyName} (Service Provider)   ${clientName} (Client)

Date: ________________             Date: ________________

---

Thank you for choosing ${companyName} for your services.
`;

  document.getElementById('contractOutput').innerText = contractText;
});
