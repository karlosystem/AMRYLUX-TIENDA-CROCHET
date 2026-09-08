const displaySolesCurrency = (num) => {
    const formatter = new Intl.NumberFormat('es-PE', {
        style: "currency",
        currency: 'PEN',
        minimumFractionDigits: 2
    });

    return formatter.format(num);
};

export default displaySolesCurrency;