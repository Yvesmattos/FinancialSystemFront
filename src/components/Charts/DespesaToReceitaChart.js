import { fetchReceitas } from "api";
import { fetchDespesas } from "api";
import { formatPrice } from "helpers";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

function DespesaToReceitaChart() {


  const [despesas, setDespesas] = useState([]);
  const [receitas, setReceitas] = useState([]);
  const [series, setSeries] = useState([]);

  useEffect(async () => (
    await fetchDespesas().then(d => setDespesas(d.data))
  ), [despesas.length]);

  useEffect(async () => (
    await fetchReceitas().then(d => setReceitas(d.data))
  ), [receitas.length]);

  function setDataGraph() {
    let serie = new Array();

    let mes = new Date().getMonth();
    let ano = new Date().getFullYear();
    let dataVencimento = parseInt(mes + 1) < 10 ? "0" + parseInt(mes + 1) + "/" + ano : parseInt(mes + 1) + "/" + ano;
    let mesRef = parseInt(mes + 1) < 10 ? "0" + parseInt(mes) + "/" + ano : parseInt(mes) + "/" + ano;
    let totalReceita;
    let totalDespesa;

    if (despesas !== undefined && receitas !== undefined) {
      totalDespesa = despesas.filter((desp) => desp.dataVencimento.slice(3) == dataVencimento).reduce((acc, val) => acc += val.valorDespesa, 0);
      totalReceita = receitas.filter((rec) => rec.mesReferencia === mesRef).reduce((acc, val) => acc += val.valorReceita, 0);
    }

    if (totalReceita !== undefined) {
      serie.push(totalReceita);
    }
    if (totalDespesa !== undefined) {
      serie.push(totalDespesa);
    }

    setSeries(serie);
  }

  useEffect(() => {
    setDataGraph();
  }, [receitas, despesas])

  const data = {
    labels: ["Receitas", "Despesas"],
    datasets: [{
      data: series,
      backgroundColor: [
        'rgb(29, 199, 234)',
        'rgb(255, 74, 85)',
      ],
      hoverOffset: 4
    }]
  };


  return (
    <>
      <div>
        <Pie data={data} width={2} height={2} options={{
          tooltips: {
            callbacks: {
              label: function (t, d) {
                var xLabel = d.labels[t.index];
                var yLabel = formatPrice(d.datasets[0].data[t.index])
                return xLabel + ': ' + yLabel;
              }
            }
          },
          legend: {
            labels: {
              fontSize: 17,
              fontStyle: 'bold'
            }
          }

        }} />
      </div>
    </>
  );
}

export default DespesaToReceitaChart;