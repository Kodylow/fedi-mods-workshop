const COMMON_HEADERS = {
    "Content-Type": "application/json"
};

async function fetchData(apiEndpoint, bodyContent, inputSelector, authorizationHeader) {
    const inputValue = document.querySelector(inputSelector).value;

    const headers = { ...COMMON_HEADERS };
    if (authorizationHeader) {
        headers["Authorization"] = authorizationHeader;
    }

    const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(bodyContent(inputValue))
    });

    return response;
}

async function handlePayment(response) {
    if (response.status !== 402) {
        return response;
    }

    const authHeader = response.headers.get("Www-Authenticate");
    const tokenMatch = authHeader.match(/token="([^"]+)"/);
    const invoiceMatch = authHeader.match(/invoice="([^"]+)"/);

    const token = tokenMatch ? tokenMatch[1] : null;
    const invoice = invoiceMatch ? invoiceMatch[1] : null;

    try {
        console.log("Invoice:", invoice);
        await window.webln.enable();
        const { preimage } = await window.webln.sendPayment(invoice);
        const L402Auth = `L402 ${token}:${preimage}`;
        return await fetchData(apiEndpoint, bodyContent, inputSelector, L402Auth);
    } catch (err) {
        console.error(err);
        alert("Error with WebLN payment.");
        throw err;  // propagate error further for custom error handling in respective pages
    }
}
