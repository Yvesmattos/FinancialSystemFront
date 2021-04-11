import { fetchReceitas } from "api";
import { formatPrice } from "helpers";
import { useEffect, useState } from "react";
import { Doughnut } from 'react-chartjs-2';



function HistoricalReceitas() {
    const [receitas, setReceitas] = useState([]);
    const [series, setSeries] = useState([]);
    const [labels, setLabels] = useState([]);

    useEffect(async () => (
        await fetchReceitas().then(d => setReceitas(d.data))
    ), [receitas.length]);

    function setDataGraph() {
        let serie = new Array();
        let label = new Array();

        let mes = new Date().getMonth();
        let ano = new Date().getFullYear();
        let mesRef = parseInt(mes + 1) < 10 ? "0" + parseInt(mes) + "/" + ano : parseInt(mes) + "/" + ano;


        for (let i = 0; i < receitas.length; i++) {
            if (receitas[i] !== undefined && receitas[i] !== null && receitas[i].mesReferencia === mesRef) {
                label.push(receitas[i].nomeReceita)
                serie.push(receitas[i].valorReceita)
            }
        }

        setSeries(serie);
        setLabels(label);
    }

    useEffect(() => {
        setDataGraph();
    }, [receitas])



    const data = {
        labels: labels,
        datasets: [{
            data: series,
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
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
                            },
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

export default HistoricalReceitas