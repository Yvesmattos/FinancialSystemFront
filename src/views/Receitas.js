import { fetchReceitas } from "api";
import { formatPrice } from "helpers";
import React, { useEffect, useState } from "react";
import '../layouts/custom.css';
import ModalReceitaUpdate from "./Receita/ModalReceitaUpdate";
import ModalReceitaInsert from "./Receita/ModalReceitaInsert";
// react-bootstrap components
import {
  Button,
  Card,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { deleteReceita } from "api";
import { updateReceita } from "api";
import { insertReceita } from "api";
import { treatCurrencyValues } from "helpers";
import { brazilianDateFormat } from "helpers";
import ReceitaFilter from "components/MovementFilter/ReceitaFilter";
import DataTable from "components/DataTable/DataTable";
import { fetchReceitasOnPage } from "api";

function Receitas() {

  const [receitas, setReceitas] = useState([]);
  const [receitaUpdate, setReceitaUpdate] = useState();
  const [receitaExcluir, setReceitaExcluir] = useState();
  const [open, setOpen] = useState(false);
  const [openDialogUpdate, setOpenDialogUpdate] = useState(false);
  const [openDialogInsert, setOpenDialogInsert] = useState(false);
  const [valorTotal, setValorTotal] = useState(0);
  const [valorPendente, setValorPendente] = useState(0);
  const [valorRecebido, setValorRecebido] = useState(0);
  const [activePage, setActivePage] = useState(0);
  const [page, setPage] = useState({
    first: true,
    last: true,
    number: 0,
    totalElements: 0,
    totalPages: 0,
  });

  const dicionario = {
    receita: "Receita",
    origem: "Origem",
    mesReferencia: "Mês de referência",
    valorReceita: "Valor da Receita",
    valorPago: "Valor Recebido",
    situacao: "Situação"
  }

  const [recFiltro, setRecFiltro] = useState({
    nomeReceita: "",
    origem: "",
    meioPagamento: "",
    formaPagamento: "",
    situacao: "",
    mesReferencia: ""
  })

  const handleOpenDialog = (receita) => {
    let recAux = JSON.parse(JSON.stringify(receita));
    setOpenDialogUpdate(true);
    setReceitaUpdate(recAux);
  };


  const handleClickOpen = (receita) => {
    setReceitaExcluir(receita)
    setOpen(true);
  };

  const handleClose = (props) => {
    deleteReceita(props.id)
      .then(() => fetchReceitas()
        .then(response => {
          setReceitas(response.data);
          fetchReceitasOnPage(page.numberOfElements === 1 ? page.number - 1 : page.number).then(
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

  const handleUpdate = async (receita) => {
    let recAux = JSON.parse(JSON.stringify(receita));
    treatCurrencyValues(recAux, "r");
    brazilianDateFormat(recAux, "r");
    await updateReceita(recAux.id, recAux)
    fetchReceitasOnPage(page.number).then(
      (response) => setPage(response.data)
    );
    const request = await fetchReceitas();
    setReceitas(request.data)
    setOpenDialogUpdate(false);
  }

  const handleInsert = async (receita) => {
    let recAux = JSON.parse(JSON.stringify(receita));
    treatCurrencyValues(recAux, "r");
    brazilianDateFormat(recAux, "r");
    await insertReceita(recAux);
    const request = await fetchReceitas();
    setReceitas(request.data);
    setOpenDialogInsert(false)
    fetchReceitasOnPage(page.number).then(
      (response) => setPage(response.data)
    );
  }

  const atualizarTotal = () => {
    let total = receitas.reduce((acc, val) => acc += val.valorReceita, 0);
    setValorTotal(total);
  }

  const atualizarPendente = () => {
    let total = receitas.filter((receita) => receita.situacao !== "PAGO").reduce((acc, val) => acc += val.valorReceita, 0);
    setValorPendente(total);
  }

  const atualizarRecebido = () => {
    let total = receitas.filter((receita) => receita.situacao === "PAGO").reduce((acc, val) => acc += val.valorPago, 0);
    setValorRecebido(total);
  }


  const applyFilter = (aux) => {
    aux = aux.filter(x =>
      (x.nomeReceita === recFiltro.nomeReceita || recFiltro.nomeReceita === "") &&
      (x.origem === recFiltro.origem || recFiltro.origem === "") &&
      (x.meioPagamento === recFiltro.meioPagamento || recFiltro.meioPagamento === "") &&
      (x.formaPagamento === recFiltro.formaPagamento || recFiltro.formaPagamento === "") &&
      (x.situacao === recFiltro.situacao || recFiltro.situacao === "") &&
      (x.mesReferencia === recFiltro.mesReferencia || recFiltro.mesReferencia === ""))
      return aux;
  }

  const handleFilter = () => {
    fetchReceitasOnPage(activePage)
      .then(response => {
        let aux = response.data.content;

        aux = applyFilter(aux);

        response.data.content = aux;
        setPage(response.data)
      }).catch(error => console.log(error))
  }

  useEffect(() => {
    fetchReceitas()
      .then(response => {
        setReceitas(response.data)
      })
      .catch(error => console.log(error));
  }, [])

  useEffect(() => {
    fetchReceitasOnPage(activePage)
      .then(response => {
        let aux = response.data.content;

        aux = applyFilter(aux);

        response.data.content = aux;  
        setPage(response.data)
      }).catch(error => console.log(error))
  }, [activePage])

  useEffect(() => {
    atualizarPendente();
    atualizarRecebido();
    atualizarTotal();
  }, [receitas]);


  return (
    <>
      {openDialogUpdate ? <ModalReceitaUpdate receita={receitaUpdate} openDialogUpdate={openDialogUpdate} setOpenDialogUpdate={setOpenDialogUpdate} handleUpdate={handleUpdate}></ModalReceitaUpdate> : null}
      {openDialogInsert ? <ModalReceitaInsert openDialogInsert={openDialogInsert} setOpenDialogInsert={setOpenDialogInsert} handleInsert={handleInsert}></ModalReceitaInsert> : null}
      <Container fluid>
        <Row>
          <Col md="12">
            <ReceitaFilter receita={receitas} handleFilter={handleFilter} recFiltro={recFiltro} setRecFiltro={setRecFiltro}></ReceitaFilter>
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Receitas
                  <div style={{ textAlign: "right" }}>
                    <Button
                      style={{ marginLeft: 10 }}
                      className="btn-fill pull-right"
                      variant="info"
                      onClick={handleDialogInsert}
                    >
                      Nova Receita
                  </Button>
                  </div>
                </Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <DataTable
                  dicionario={dicionario} handleOpenDialog={handleOpenDialog}
                  handleClickOpen={handleClickOpen} movimentoExcluir={receitaExcluir} open={open}
                  handleClose={handleClose} setOpen={setOpen} setActivePage={setActivePage} setPage={setPage} page={page}>
                </DataTable>
                <Table>
                  <tbody>
                    <tr style={{ width: "100%" }}>
                      <td>
                        <b>Valor recebido: {formatPrice(valorRecebido)} </b>
                      </td>
                      <td>
                        <b>Valor pendente: {formatPrice(valorPendente)} </b>
                      </td>
                      <td style={{ paddingTop: 10 }}>
                        <b>Valor do mês a receber: {formatPrice(valorTotal)} </b>
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

export default Receitas;
