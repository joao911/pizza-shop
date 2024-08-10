export const handlePhoneChange = (e: any) => {
  let value = e.target.value;

  // Remove tudo que não for dígito
  value = value.replace(/\D/g, "");

  // Aplica a máscara conforme o tamanho do valor
  if (value.length <= 10) {
    // Máscara para telefone fixo (99) 9999-9999
    value = value.replace(/(\d{2})(\d)/, "($1) $2");
    value = value.replace(/(\d{4})(\d)/, "$1-$2");
  } else {
    // Máscara para celular (99) 99999-9999
    value = value.replace(/(\d{2})(\d)/, "($1) $2");
    value = value.replace(/(\d{5})(\d)/, "$1-$2");
  }

  return value;
};