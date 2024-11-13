function showFilter() {
    document.getElementById("filterSection").style.display = "block";
    document.getElementById("historySection").style.display = "none";
    document.getElementById("receiptSection").style.display = "none";
}

function showHistory() {
    document.getElementById("filterSection").style.display = "none";
    document.getElementById("historySection").style.display = "block";
    document.getElementById("receiptSection").style.display = "none";
}

function showReceipt() {
    document.getElementById("filterSection").style.display = "none";
    document.getElementById("historySection").style.display = "none";
    document.getElementById("receiptSection").style.display = "block";
}

function goBack() {
    // Add functionality to go back if needed
    alert("Voltando para a página anterior.");
}


