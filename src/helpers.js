export function formatPrice(number) {
    const formatter = new Intl.NumberFormat('pt-br', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
    });
    return formatter.format(number);
}

export const treatCurrencyValues = (aux, tipo) => {

    let valorPago;
    let valor;

    aux.valorPago != null && aux.valorPago != undefined ? valorPago = aux.valorPago : valorPago = 0.0;
    valorPago = valorPago.toString().replaceAll(",", ".");

    aux.valorPago = parseFloat(valorPago);

    if (tipo === "d") {

        aux.valorDespesa != null && aux.valorDespesa != undefined && aux.valorDespesa != "" ? valor = aux.valorDespesa : valor = 0.0;
        valor = valor.toString().replaceAll(",", ".");

        aux.valorDespesa = parseFloat(valor);
    }
    if (tipo === "r") {

        aux.valorReceita != null && aux.valorReceita != undefined && aux.valorReceita != "" ? valor = aux.valorReceita : valor = 0.0;
        valor = valor.toString().replaceAll(",", ".");

        aux.valorReceita = parseFloat(valor);
    }

}

export function brazilianDateFormat(aux, tipo) {

    if (tipo == "d") {
        if (aux.dataPagamento != null && aux.dataPagamento != undefined && aux.dataPagamento != "" && aux.dataPagamento != "-") {
            let formattedData = aux.dataPagamento.split("-").reverse().join("/");
            aux.dataPagamento = formattedData.toString();
        }
        if (aux.dataVencimento != null && aux.dataVencimento != undefined && aux.dataVencimento != "" && aux.dataVencimento != "-") {
            let formattedData = aux.dataVencimento.split("-").reverse().join("/");
            aux.dataVencimento = formattedData.toString();
        }
    }

    if (tipo == "r") {
        if (aux.dataCredito != null && aux.dataCredito != undefined && aux.dataCredito != "" && aux.dataCredito != "-") {
            let formattedData = aux.dataCredito.split("-").reverse().join("/");
            aux.dataCredito = formattedData.toString();
        }
    }
}

export function americanDateFormat(aux) {
    
    if (aux !== null && aux !== undefined && aux !== "" && aux !== "-") {
        let formattedData = aux.split("/").reverse().join("-");
        aux = formattedData.toString();
    }
    return aux;
}