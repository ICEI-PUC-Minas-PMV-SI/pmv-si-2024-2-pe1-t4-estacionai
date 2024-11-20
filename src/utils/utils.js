const formatCurrency = (price) => price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

const typePaymentPeriod = (type) => {
    switch (type) {
        case "hora":
            return "/h";
        case "mes":
            return "/mês";
    }
}