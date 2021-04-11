import { fetchDespesas } from "api";
import { formatPrice } from "helpers";
import { useEffect, useState } from "react";
import { Doughnut } from 'react-chartjs-2';



function HistoricalDespesas() {
    const [despesas, setDespesas] = useState([]);
    const [series, setSeries] = useState([]);
    const [labels, setLabels] = useState([]);

    useEffect(async () => (
        await fetchDespesas().then(d => setDespesas(d.data))
    ), [despesas.length]);

    function setDataGraph() {
        let serie = new Array();
        let label = new Array();

        let mes = new Date().getMonth();
        let ano = new Date().getFullYear();
        let dataVencimento = parseInt(mes + 1) < 10 ? "0" + parseInt(mes + 1) + "/" + ano : parseInt(mes + 1) + "/" + ano;


        for (let i = 0; i < despesas.length; i++) {
            if (despesas[i] !== undefined && despesas[i] !== null && despesas[i].dataVencimento.slice(3) === dataVencimento) {
                label.push(despesas[i].nomeDespesa)
                serie.push(despesas[i].valorDespesa)
            }
        }

        setSeries(serie);
        setLabels(label);
    }

    useEffect(() => {
        setDataGraph();
    }, [despesas])



    const data = {
        labels: labels,
        datasets: [{
            data: series,
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    };

    return (
        <>
            <div>
                <Doughnut data={data} options={{
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
                        },
                        onClick: (e) => e.stopPropagation()
                    }
                }} />
            </div>
        </>
    )
}

export default HistoricalDespesas