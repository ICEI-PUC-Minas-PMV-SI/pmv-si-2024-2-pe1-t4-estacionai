const formatCurrency = (price) => price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

const typePaymentPeriod = (type) => {
    switch (type) {
        case "hora":
            return "/hora";
        case "mes":
            return "/mês";
        case "diaria":
            return "/dia";
        default:
            return "";
    }
}