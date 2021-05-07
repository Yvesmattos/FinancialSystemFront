import React, { useEffect, useState } from "react";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from "@material-ui/core";
import { Form, InputGroup } from "react-bootstrap";
import { Col } from "reactstrap";
import { Button } from "react-bootstrap";
import CurrencyInput from 'react-currency-input-field';
import { americanDateFormat } from "helpers";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #000',
        borderRadius: 10,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));




function ModalDespesaUpdate({ despesa, openDialogUpdate, setOpenDialogUpdate, handleUpdate }) {


    const [despAux, setDespAux] = useState(JSON.parse(JSON.stringify(despesa)));

    function changeField(event) {
        despAux[event.target.name] = event.target.value;

        setDespAux(despAux => JSON.parse(JSON.stringify(despAux)));
    }

    const changeMoneyValue = (value, name) => {
        despAux[name] = value;
        setDespAux(despAux => JSON.parse(JSON.stringify(despAux)));
    }

    const handleCloseDialog = () => {
        setOpenDialogUpdate(false);
    };
    const classes = useStyles();

    return (
        <Modal
            key={despAux.id}
            className={classes.modal}
            open={openDialogUpdate}
            onClose={handleCloseDialog}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }
            }
        >
            <Fade in={openDialogUpdate}>
                <div className={classes.paper}>
                    <Form noValidate validated={true}>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formId">
                                <Form.Label>Id</Form.Label>
                                <Form.Control type="number" defaultValue={despAux.id} disabled={true} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formNome">
                                <Form.Label>Despesa <span style={{ color: "red" }}><sup>(*)</sup></span></Form.Label>
                                <Form.Control type="text" required name="nomeDespesa" value={despAux.nomeDespesa} onChange={changeField} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formOrigem">
                                <Form.Label>Favorecido <span style={{ color: "red" }}><sup>(*)</sup></span></Form.Label>
                                <Form.Control type="text" required name="favorecido" value={despAux.favorecido} onChange={changeField} />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formMeioPagamento">
                                <Form.Label>Meio de pagamento <span style={{ color: "red" }}><sup>(*)</sup></span></Form.Label>
                                <Form.Control type="text" required name="meioPagamento" value={despAux.meioPagamento} onChange={changeField} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formFormaPagamento">
                                <Form.Label>Forma de pagamento <span style={{ color: "red" }}><sup>(*)</sup></span></Form.Label>
                                <Form.Control type="text" required name="formaPagamento" value={despAux.formaPagamento} onChange={changeField} />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formMesReferencia">
                                <Form.Label>Mês de referência <span style={{ color: "red" }}><sup>(*)</sup></span></Form.Label>
                                <Form.Control type="text" placeholder="mm/aaaa" maxLength="7" required name="mesReferencia" value={despAux.mesReferencia} onChange={changeField} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formDataVencimento">
                                <Form.Label>Vencimento <span style={{ color: "red" }}><sup>(*)</sup></span></Form.Label>
                            <Form.Control type="date" name="dataVencimento" required value={americanDateFormat(despAux.dataVencimento)} onChange={changeField} />
                            </Form.Group>
                        <Form.Group as={Col} controlId="formDataCredito">
                            <Form.Label>Data de pagamento</Form.Label>
                            <Form.Control name="dataPagamento" type="date" value={americanDateFormat(despAux.dataPagamento != undefined ? despAux.dataPagamento : undefined)} onChange={changeField} />
                        </Form.Group>
                        </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formValorDespesa">
                            <Form.Label>Valor da despesa <span style={{ color: "red" }}><sup>(*)</sup></span></Form.Label>
                            <InputGroup>
                                <CurrencyInput
                                    required
                                    className="form-control"
                                    id="input-example"
                                    name="valorDespesa"
                                    style={{ borderLeft: 1, borderRight: 1, borderColor: despesa.valorDespesa != null && despesa.valorDespesa != undefined && despesa.valorDespesa != "" ? "#28a745" : "#dc3545", borderStyle: 'solid' }}
                                    value={despAux.valorDespesa != null || despAux.valorDespesa != undefined ? despAux.valorDespesa : 0.0}
                                    decimalsLimit={2}
                                    prefix="R$ "
                                    decimalScale={2}
                                    groupSeparator="."
                                    decimalSeparator=","
                                    onValueChange={(value, nome) => changeMoneyValue(value, nome)}
                                />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formValorPago">
                            <Form.Label>Valor pago</Form.Label>
                            <InputGroup>
                                <CurrencyInput
                                    className="form-control border-former-group"
                                    id="input-example"
                                    name="valorPago"
                                    style={{ borderLeft: 1, borderRight: 1, borderColor: '#28a745', borderStyle: 'solid' }}
                                    value={despAux.valorPago != null || despAux.valorPago != undefined ? despAux.valorPago === 0 ? despAux.valorDespesa: despAux.valorPago : 0.0}
                                    decimalsLimit={2}
                                    decimalScale={2}
                                    prefix="R$ "
                                    groupSeparator="."
                                    decimalSeparator=","
                                    onValueChange={(value, nome) => changeMoneyValue(value, nome)}
                                />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formSituacao">
                            <Form.Label>Situação</Form.Label>
                            <Form.Control as="select" name="situacao" value={despAux.situacao} onChange={changeField}>
                                <option value="PENDENTE">PENDENTE</option>
                                <option value="PAGO">PAGO</option>
                                <option value="PROGRAMADO">PROGRAMADO</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <div style={{ textAlign: 'center' }}>
                        <Button variant="danger" onClick={handleCloseDialog}>
                            Cancelar
                            </Button>
                        <Button variant="primary" style={{ marginLeft: 30 }} onClick={() => handleUpdate(despAux)}>

                            Salvar alterações
                            </Button>
                    </div>
                    </Form>
                </div>
            </Fade>
        </Modal >
    );
}


export default ModalDespesaUpdate;