import { fetchReceitas } from "api";
import { formatPrice } from "helpers";
import React, { useEffect, useState } from "react";
import '../layouts/custom.css';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


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
import ModalReceitaUpdate from "./Receita/ModalReceitaUpdate";
import ModalReceitaInsert from "./Receita/ModalReceitaInsert";
import { updateReceita } from "api";
import { insertReceita } from "api";
import { treatCurrencyValues } from "helpers";
import { brazilianDateFormat } from "helpers";
import ReceitaFilter from "components/MovementFilter/ReceitaFilter";

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


  const handleOpenDialog = (receita) => {
    setOpenDialogUpdate(true);
    setReceitaUpdate(receita);
  };

  const handleDialogInsert = () => {
    setOpenDialogInsert(true);
  }

  const handleClickOpen = (receita) => {
    setReceitaExcluir(receita)
    setOpen(true);
  };
  const handleClose = (props) => {
    deleteReceita(props.id)
      .then(() => fetchReceitas()
        .then(response => setReceitas(response.data))
        .catch(e => console.log(e))
      )
      .catch(e => console.log(e));
    setOpen(false);
  };

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

  const handleUpdate = async (receita) => {
    let recAux = JSON.parse(JSON.stringify(receita));

    treatCurrencyValues(recAux, "r");
    brazilianDateFormat(recAux, "r");


    await updateReceita(recAux.id, recAux)
    const request = await fetchReceitas();
    setReceitas(request.data)
    setOpenDialogUpdate(false);
  }

  const handleInsert = async (receita) => {
    let recAux = JSON.parse(JSON.stringify(receita));

    treatCurrencyValues(recAux, "r");
    brazilianDateFormat(recAux, "r");


    await insertReceita(recAux)
    const request = await fetchReceitas();
    setReceitas(request.data);
    setOpenDialogInsert(false)
  }

  useEffect(() => {
    fetchReceitas()
      .then(response => setReceitas(response.data))
  }, [])

  useEffect(() => {
    atualizarTotal();
    atualizarRecebido();
    atualizarPendente();
  }, [receitas]);

  return (

    <>
      {openDialogUpdate ? <ModalReceitaUpdate receita={receitaUpdate} openDialogUpdate={openDialogUpdate} setOpenDialogUpdate={setOpenDialogUpdate} handleUpdate={handleUpdate}></ModalReceitaUpdate> : null}
      {openDialogInsert ? <ModalReceitaInsert openDialogInsert={openDialogInsert} setOpenDialogInsert={setOpenDialogInsert} handleInsert={handleInsert}></ModalReceitaInsert> : null}
      <Container fluid>
        <Row>
          <Col md="12">
            <ReceitaFilter receita={receitas}></ReceitaFilter>
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
                <Table className="table-hover table-striped tableCenter">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Receita</th>
                      <th className="border-0">Origem</th>
                      <th className="border-0">Mês referência</th>
                      <th className="border-0">Data de crédito</th>
                      <th className="border-0">Valor da receita</th>
                      <th className="border-0">Valor recebido</th>
                      <th className="border-0">Situação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {receitas.map(receita => (
                      <tr key={receita.id}>
                        <td>{receita.id}</td>
                        <td>{receita.nomeReceita}</td>
                        <td>{receita.origem}</td>
                        <td>{receita.mesReferencia ? receita.mesReferencia : "-"}</td>
                        <td>{receita.dataCredito ? receita.dataCredito : "-"}</td>
                        <td>{formatPrice(receita.valorReceita)}</td>
                        <td>{formatPrice(receita.valorPago)}</td>
                        <td>{receita.situacao}</td>
                        <td><Button className="btn-fill pull-right" variant="success" onClick={() => handleOpenDialog(receita)} >Alterar</Button>
                        </td>
                        <td><Button className="btn-fill pull-right" variant="danger" onClick={() => handleClickOpen(receita)}>Excluir</Button>

                          <Dialog
                            key={receitaExcluir !== undefined ? receitaExcluir.id : null}
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title">{"Confirmação de exclusão"}</DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-description">
                                Você confirma a exclusão da receita?
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={() => setOpen(false)} color="primary">
                                Não
                              </Button>
                              <Button onClick={() => handleClose(receitaExcluir)} color="primary" autoFocus>
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
