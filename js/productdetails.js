const selected_product = JSON.parse(new URLSearchParams(window.location.search).get('selected_product') ?? 'null');
console.log(selected_product);

//Use this selected_product and fetch details based on ID