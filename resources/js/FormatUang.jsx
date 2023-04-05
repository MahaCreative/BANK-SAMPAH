export const FormatUang = (number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "decimal",
        currency: "IDR",
        decimal: false,
    }).format(number);
};
