import React, { useEffect, useState } from "react";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from "@material-ui/core";
import { Form, InputGroup } from "react-bootstrap";
import { Col } from "reactstrap";
import { Button } from "react-bootstrap";
import CurrencyInput from 'react-currency-input-field';


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




function ModalReceitaInsert({ openDialogInsert, setOpenDialogInsert, handleInsert }) {

    const [receita, setReceita] = useState({
        nomeReceita: "",
        origem: "",
        mesReferencia: "",
        dataCredito: "",
        valorReceita: "",
        formaPagamento: "",
        meioPagamento: "",
        valorPago: "",
        situacao: "PENDENTE",
        userId: 1,
    });

    function changeField(event) {

        receita[event.target.name] = event.target.value;
        setReceita(receita => JSON.parse(JSON.stringify(receita)));
    }

    const changeMoneyValue = (value, name) => {
        receita[name] = value;
        setReceita(receita => JSON.parse(JSON.stringify(receita)));
    }


    const handleCloseDialog = () => {
        setOpenDialogInsert(false);
    };
    const classes = useStyles();

    return (
        <Modal
            className={classes.modal}
            open={openDialogInsert}
            onClose={handleCloseDialog}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }
            }
        >
            <Fade in={openDialogInsert}>
                <div className={classes.paper}>
                    <Form noValidate validated={true}>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formId">
                                <Form.Label>Id</Form.Label>
                                <Form.Control type="number" disabled={true} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formNome">
                                <Form.Label>Receita <span style={{color: "red"}}><sup>(*)</sup></span></Form.Label>
                                <Form.Control type="text" name="nomeReceita" required value={receita.nomeReceita} onChange={changeField} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formOrigem">
                                <Form.Label>Origem <span style={{color: "red"}}><sup>(*)</sup></span></Form.Label>
                                <Form.Control type="text" required name="origem" value={receita.origem} onChange={changeField} />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formMeioPagamento">
                                <Form.Label>Meio de pagamento <span style={{color: "red"}}><sup>(*)</sup></span></Form.Label>
                                <Form.Control type="text" name="meioPagamento" required value={receita.meioPagamento} onChange={changeField} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formFormaPagamento">
                                <Form.Label>Forma de pagamento <span style={{color: "red"}}><sup>(*)</sup></span></Form.Label>
                                <Form.Control type="text" name="formaPagamento" required value={receita.formaPagamento} onChange={changeField} />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formMesReferencia">
                                <Form.Label>Mês de referência <span style={{color: "red"}}><sup>(*)</sup></span></Form.Label>
                                <Form.Control type="text" name="mesReferencia" maxLength="7" required value={receita.mesReferencia} onChange={changeField} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formDataCredito">
                                <Form.Label>Data de crédito</Form.Label>
                                <Form.Control type="text" name="dataCredito" type="date" value={receita.dataCredito} onChange={changeField} />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formValorReceita">
                                <Form.Label>Valor da receita <span style={{color: "red"}}><sup>(*)</sup></span></Form.Label>
                                <InputGroup>
                                    <CurrencyInput
                                        required
                                        className="form-control"
                                        id="input-example"
                                        name="valorReceita"
                                        style={{ borderLeft: 1, borderRight: 1, borderColor: receita.valorReceita != null && receita.valorReceita != undefined && receita.valorReceita != "" ? "#28a745" : "#dc3545", borderStyle: 'solid' }}
                                        value={receita.valorReceita != undefined ? receita.valorReceita : 0.0}
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
                                <Form.Label>Valor recebido</Form.Label>
                                <InputGroup>
                                    <CurrencyInput
                                        className="form-control border-former-group"
                                        id="input-example"
                                        name="valorPago"
                                        style={{ borderLeft: 1, borderRight: 1, borderColor: '#28a745', borderStyle: 'solid' }}
                                        value={receita.valorPago != undefined ? receita.valorPago : 0.0}
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
                                <Form.Control as="select" name="situacao" onChange={changeField}>
                                    <option defaultValue="PENDENTE">PENDENTE</option>
                                    <option defaultValue="PAGO">PAGO</option>
                                    <option defaultValue="PROGRAMADO">PROGRAMADO</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <div style={{ textAlign: 'center' }}>
                            <Button variant="danger" onClick={handleCloseDialog}>
                                Cancelar
                            </Button>
                            <Button variant="primary" style={{ marginLeft: 30 }} onClick={() => (handleInsert(receita))}>
                                Cadastrar
                            </Button>
                        </div>
                    </Form>
                </div>
            </Fade>
        </Modal >
    );
}


export default ModalReceitaInsert;