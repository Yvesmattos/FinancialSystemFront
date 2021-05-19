import { fetchDespesas } from "api";
import { formatPrice } from "helpers";
import React, { useEffect, useState } from "react";
import '../layouts/custom.css';
import ModalDespesaUpdate from './Despesa/ModalDespesaUpdate';
import ModalDespesaInsert from './Despesa/ModalDespesaInsert';
// react-bootstrap components
import {
  Button,
  Card,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { deleteDespesa } from "api";
import { updateDespesa } from "api";
import { insertDespesa } from "api";
import { treatCurrencyValues } from "helpers";
import { brazilianDateFormat } from "helpers";
import DespesaFilter from "components/MovementFilter/DespesaFilter";
import DataTable from "components/DataTable/DataTable";
import { fetchDespesasOnPage } from "api";

function Despesas() {

  const [despesas, setDespesas] = useState([]);
  const [despesaUpdate, setDespesaUpdate] = useState();
  const [despesaExcluir, setDespesaExcluir] = useState();
  const [open, setOpen] = useState(false);
  const [openDialogUpdate, setOpenDialogUpdate] = useState(false);
  const [openDialogInsert, setOpenDialogInsert] = useState(false);
  const [valorTotal, setValorTotal] = useState(0);
  const [valorPendente, setValorPendente] = useState(0);
  const [valorPago, setValorPago] = useState(0);
  const [activePage, setActivePage] = useState(0);
  const [page, setPage] = useState({
    first: true,
    last: true,
    number: 0,
    totalElements: 0,
    totalPages: 0,
  });
  const dicionario = {
    despesa: "Despesa",
    favorecido: "Favorecido",
    dataVencimento: "Data de Vencimento",
    valorDespesa: "Valor da despesa",
    valorPago: "Valor Pago",
    situacao: "Situação"
  }
  const [despFiltro, setDespFiltro] = useState({
    nomeDespesa: null,
    favorecido: null,
    formaPagamento: null,
    meioPagamento: null,
    situacao: "PENDENTE",
    mesReferencia: null
  })

  const handleOpenDialog = (despesa) => {
    let despAux = JSON.parse(JSON.stringify(despesa));
    setOpenDialogUpdate(true);
    setDespesaUpdate(despAux);
  };

  const handleClickOpen = (despesa) => {
    setDespesaExcluir(despesa)
    setOpen(true);
  };

  const handleClose = (props) => {
    deleteDespesa(props.id)
      .then(() => fetchDespesas()
        .then(response => {
          setDespesas(response.data);
          fetchDespesasOnPage(page.numberOfElements === 1 ? page.number - 1 : page.number, despFiltro).then(
            (response) => setPage(response.data)
          )
        })
        .catch(e => console.log(e))
      )
      .catch(e => console.log(e));
    setOpen(false);
  };

  const handleDialogInsert = () => {
    setOpenDialogInsert(true);
  }

  const handleUpdate = async (despesa) => {
    let despAux = JSON.parse(JSON.stringify(despesa));
    treatCurrencyValues(despAux, "d");
    brazilianDateFormat(despAux, "d");
    await updateDespesa(despAux.id, despAux).then(response=>console.log(response));
    fetchDespesasOnPage(page.number, despFiltro).then(
      (response) => setPage(response.data)
    );
    const request = await fetchDespesas();
    setDespesas(request.data);
    setOpenDialogUpdate(false);
  }

  const handleInsert = async (despesa) => {
    let despAux = JSON.parse(JSON.stringify(despesa));
    treatCurrencyValues(despAux, "d");
    brazilianDateFormat(despAux, "d");
    await insertDespesa(despAux);
    const request = await fetchDespesas();
    setDespesas(request.data);
    setOpenDialogInsert(false);
    fetchDespesasOnPage(page.number, despFiltro).then(
      (response) => setPage(response.data)
    );
  }

  const atualizarTotal = () => {
    let total = despesas.reduce((acc, val) => acc += val.valorDespesa, 0);
    setValorTotal(total);
  }

  const atualizarPendente = () => {
    let total = despesas.filter((despesa) => despesa.situacao !== "PAGO").reduce((acc, val) => acc += val.valorDespesa, 0);
    setValorPendente(total);
  }

  const atualizarPago = () => {
    let total = despesas.filter((despesa) => despesa.situacao === "PAGO").reduce((acc, val) => acc += val.valorPago, 0);
    setValorPago(total);
  }

  const handleFilter = () => {
    fetchDespesasOnPage(activePage, despFiltro)
      .then(response => {
        setActivePage(0)
        setPage(response.data)
      }).catch(error => console.log(error))
  }

  useEffect(() => {
    fetchDespesas()
      .then(response => setDespesas(response.data))
      .catch(error => console.log(error));
  }, [])

  useEffect(() => {
    fetchDespesasOnPage(activePage, despFiltro)
      .then(response => {
        setPage(response.data)
      }).catch(error => console.log(error))
  }, [activePage])

  useEffect(() => {
    atualizarPendente();
    atualizarPago();
    atualizarTotal();
  }, [despesas]);

  return (
    <>
      {openDialogUpdate ? <ModalDespesaUpdate despesa={despesaUpdate} openDialogUpdate={openDialogUpdate} setOpenDialogUpdate={setOpenDialogUpdate} handleUpdate={handleUpdate}></ModalDespesaUpdate> : null}
      {openDialogInsert ? <ModalDespesaInsert openDialogInsert={openDialogInsert} setOpenDialogInsert={setOpenDialogInsert} handleInsert={handleInsert}></ModalDespesaInsert> : null}
      <Container fluid>
        <Row>
          <Col md="12">
            <DespesaFilter despesa={despesas} handleFilter={handleFilter} despFiltro={despFiltro} setDespFiltro={setDespFiltro}></DespesaFilter>
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Despesas
                  <div style={{ textAlign: "right" }}>
                    <Button
                      style={{ marginLeft: 10 }}
                      className="btn-fill pull-right"
                      variant="info"
                      onClick={handleDialogInsert}
                    >
                      Nova Despesa
                  </Button>
                  </div>
                </Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <DataTable
                  dicionario={dicionario} handleOpenDialog={handleOpenDialog}
                  handleClickOpen={handleClickOpen} movimentoExcluir={despesaExcluir} open={open}
                  handleClose={handleClose} setOpen={setOpen} setActivePage={setActivePage} setPage={setPage} page={page}>
                </DataTable>
                <Table>
                  <tbody>
                    <tr style={{ width: "100%" }}>
                      <td>
                        <b>Valor pago: {formatPrice(valorPago)} </b>
                      </td>
                      <td>
                        <b>Valor pendente: {formatPrice(valorPendente)} </b>
                      </td>
                      <td style={{ paddingTop: 10 }}>
                        <b>Valor total: {formatPrice(valorTotal)} </b>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Despesas;
