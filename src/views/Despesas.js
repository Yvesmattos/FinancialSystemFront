import { fetchDespesas } from "api";
import { formatPrice } from "helpers";
import React, { useEffect, useState } from "react";
import '../layouts/custom.css';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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
import { treatCurrencyValues } from "helpers";
import { insertDespesa } from "api";
import { brazilianDateFormat } from "helpers";
import DespesaFilter from "components/MovementFilter/DespesaFilter";

function Despesas() {

  const [despesas, setDespesas] = useState([]);
  const [despesaExcluir, setDespesaExcluir] = useState();
  const [despesaUpdate, setDespesaUpdate] = useState();
  const [openDialogUpdate, setOpenDialogUpdate] = useState(false);
  const [openDialogInsert, setOpenDialogInsert] = useState(false);
  const [valorTotal, setValorTotal] = useState(0);
  const [valorPendente, setValorPendente] = useState(0);
  const [valorPago, setValorPago] = useState(0);

  const [open, setOpen] = useState(false);

  const handleOpenDialog = (despesa) => {
    let despAux = JSON.parse(JSON.stringify(despesa));

    setOpenDialogUpdate(true);
    setDespesaUpdate(despAux);
  };

  const handleDialogInsert = () => {
    setOpenDialogInsert(true);
  }

  const handleClickOpen = (despesa) => {
    setDespesaExcluir(despesa)
    setOpen(true);
  };

  const handleUpdate = async (despesa) => {
    let despAux = JSON.parse(JSON.stringify(despesa));

    treatCurrencyValues(despAux, "d");
    brazilianDateFormat(despAux, "d");

    await updateDespesa(despAux.id, despAux)
    const request = await fetchDespesas();
    setDespesas(request.data)
    setOpenDialogUpdate(false);
  }


  const handleClose = (props) => {
    deleteDespesa(props.id)
      .then(() => fetchDespesas()
        .then(response => setDespesas(response.data))
        .catch(e => console.log(e))
      )
      .catch(e => console.log(e));
    setOpen(false);
  };

  const handleInsert = async (despesa) => {
    let despAux = JSON.parse(JSON.stringify(despesa));

    treatCurrencyValues(despAux, "d");
    brazilianDateFormat(despAux, "d");

    await insertDespesa(despAux);
    const request = await fetchDespesas();
    setDespesas(request.data);
    setOpenDialogInsert(false)
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

  useEffect(() => {
    fetchDespesas()
      .then(response => setDespesas(response.data))
      .catch(error => console.log(error));
  }, [])

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
            <DespesaFilter despesa={despesas}></DespesaFilter>
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
                <Table className="table-hover table-striped tableCenter">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Despesa</th>
                      <th className="border-0">Favorecido</th>
                      <th className="border-0">Data de Vencimento</th>
                      <th className="border-0">Valor da despesa</th>
                      <th className="border-0">Valor pago</th>
                      <th className="border-0">Situação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {despesas.map(despesa => (
                      <tr key={despesa.id}>
                        <td>{despesa.id}</td>
                        <td>{despesa.nomeDespesa}</td>
                        <td>{despesa.favorecido}</td>
                        <td>{despesa.dataVencimento}</td>
                        <td>{formatPrice(despesa.valorDespesa)}</td>
                        <td>{formatPrice(despesa.valorPago)}</td>
                        <td>{despesa.situacao}</td>
                        <td><Button className="btn-fill pull-right" variant="success" onClick={() => handleOpenDialog(despesa)}>Alterar</Button></td>
                        <td><Button className="btn-fill pull-right" variant="danger" onClick={() => handleClickOpen(despesa)}>Excluir</Button>
                          <Dialog
                            key={despesaExcluir !== undefined ? despesaExcluir.id : null}
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title">{"Confirmação de exclusão"}</DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-description">
                                Você confirma a exclusão da despesa?
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={() => setOpen(false)} color="primary">
                                Não
                              </Button>
                              <Button onClick={() => handleClose(despesaExcluir)} color="primary" autoFocus>
                                Sim
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
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
