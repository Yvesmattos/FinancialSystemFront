import React, { useEffect, useState } from "react";

// react-bootstrap components
import {
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { fetchDespesas } from "api";
import { fetchReceitas } from "api";
import { formatPrice } from "helpers";
import DespesaToReceitaChart from "components/Charts/DespesaToReceitaChart";
import HistoricalDespesas from "components/Charts/HistoricalDespesas";
import HistoricalReceitas from "components/Charts/HistoricalReceitas";

function Dashboard() {

  const [despesas, setDespesas] = useState([]);
  const [receitas, setReceitas] = useState([]);
  const [valorDespesasAbertas, setValorDespesasAbertas] = useState(0);
  const [valorDespesasPagas, setValorDespesasPagas] = useState(0);
  const [valorReceitasAbertas, setValorReceitasAbertas] = useState(0);
  const [valorReceitasPagas, setValorReceitasPagas] = useState(0);
  const [showDespesaChart, setShowDespesaChart] = useState(false)
  const [showReceitaChart, setShowReceitaChart] = useState(true)

  useEffect(async () => (
    await fetchDespesas().then(d => setDespesas(d.data))

  ), [despesas.length]);

  useEffect(async () => (
    await fetchReceitas().then(d => setReceitas(d.data))
  ), [receitas.length]);

  useEffect(() => {
    console.log(despesas)
    console.log(despesas)
    atualizarValoresCards();
  }, [despesas, receitas]);


  const atualizarValoresCards = () => {
    let mes = new Date().getMonth();
    let ano = new Date().getFullYear();
    let dataVencimento = parseInt(mes + 1) < 10 ? "0" + parseInt(mes + 1) + "/" + ano : parseInt(mes + 1) + "/" + ano;
    let mesRef = parseInt(mes + 1) < 10 ? "0" + parseInt(mes) + "/" + ano : parseInt(mes) + "/" + ano;

    let despesasPagas = despesas.filter((despesa) => despesa.situacao === "PAGO" && despesa.dataVencimento.slice(3) === dataVencimento).reduce((acc, val) => acc += val.valorPago, 0);
    let despesasEmAberto = despesas.filter((despesa) => despesa.situacao !== "PAGO" && despesa.dataVencimento.slice(3) === dataVencimento).reduce((acc, val) => acc += val.valorDespesa, 0);
    let receitasPagas = receitas.filter((receita) => receita.situacao === "PAGO" && (receita.mesReferencia === mesRef || (receita.dataCredito !== null && receita.dataCredito.slice(3) === dataVencimento))).reduce((acc, val) => acc += val.valorPago, 0);
    let receitasEmAberto = receitas.filter((receita) => receita.situacao !== "PAGO" && receita.mesReferencia === mesRef).reduce((acc, val) => acc += val.valorReceita, 0);

    setValorDespesasPagas(despesasPagas);
    setValorDespesasAbertas(despesasEmAberto);
    setValorReceitasPagas(receitasPagas)
    setValorReceitasAbertas(receitasEmAberto);
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-money">
                      <i className="nc-icon nc-money-coins text-info"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Receitas em aberto</p>
                      <Card.Title as="h5">{formatPrice(valorReceitasAbertas)}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  Mês atual
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-money-coins text-success"></i>
                    </div>
                  </Col>

                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Receitas recebidas</p>
                      <Card.Title as="h5">{formatPrice(valorReceitasPagas)}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  Mês atual
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-money-coins text-danger"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Despesas em aberto</p>
                      <Card.Title as="h5">{formatPrice(valorDespesasAbertas)}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  Mês atual
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-money-coins text-secondary"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Despesas pagas</p>
                      <Card.Title as="h5">{formatPrice(valorDespesasPagas)}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  Mês atual
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="8">
            <Card onClick={() => setShowDespesaChart(true, setShowReceitaChart(false))} hidden={showDespesaChart}
              style={{ fontSize: 15, fontWeight: 'bold', cursor: 'pointer' }}
            >
              <Card.Header>
                <Card.Title as="h4">Despesas deste mês <span style={{ fontSize: 15, color: 'red' }}>(Clique para ver receitas)</span> </Card.Title>
                <p className="card-category">Índice de saídas previstas no mês atual por categorias</p>
              </Card.Header>
              <Card.Body>
                <div>
                  <p style={{ textAlign: 'center' }} hidden={despesas.length > 0 || despesas !== undefined || despesas !== null ? true : false}>SEM DESPESAS NESTE MÊS!!!</p>
                  <HistoricalDespesas></HistoricalDespesas>
                </div>
              </Card.Body>
            </Card>
            <Card onClick={() => setShowDespesaChart(false, setShowReceitaChart(true))} hidden={showReceitaChart}
              style={{ fontSize: 15, fontWeight: 'bold', cursor: 'pointer' }}
            >
              <Card.Header>
                <Card.Title as="h4">Receitas deste mês <span style={{ fontSize: 15, color: 'red' }}>(Clique para ver despesas)</span></Card.Title>
                <p className="card-category">Índice de entradas previstas no mês atual por categorias</p>
              </Card.Header>
              <Card.Body>
                <div>
                  <HistoricalReceitas></HistoricalReceitas>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Relação despesas/receitas</Card.Title>
              </Card.Header>
              <Card.Body
                style={{ height: 371 }}>
                <div>
                  <DespesaToReceitaChart></DespesaToReceitaChart>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
