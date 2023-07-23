// Currency Formater function
export const currencyFormater = (amount) => {
  const formatter = Intl.NumberFormat("en-us", {
    currency: "USD",
    style: "currency",
  });
  return formatter.format(amount);
};
