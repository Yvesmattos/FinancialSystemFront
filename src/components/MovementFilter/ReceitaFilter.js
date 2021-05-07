import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { Form, InputGroup } from "react-bootstrap";
import { Col } from "reactstrap";
import { Alert } from "bootstrap";
import { Button } from "react-bootstrap";

function ReceitaFilter({ receita }) {

    const [recAux, setRecAux] = useState([]);

    useEffect(() => {
        setRecAux(receita)
    }, [receita])

    function filtraDados(receita, field) {
        let aux = 0;
        let vAux = new Array();
        receita.map(d => vAux.push(d[field]));
        vAux = vAux.filter((value, index) => vAux.indexOf(value) === index)
        return vAux.map(d =>
            <option key={d} value={d}>{d}</option>);

    }

    return (
        <div>
            <Form noValidate style={{fontWeight: 'bold'}}> 
                <Form.Row>
                    <Form.Group as={Col} controlId="formNome">
                        <Form.Label>Receita</Form.Label>
                        <Form.Control as="select" name="nomeReceita" >
                            <option defaultValue=""></option>
                            {filtraDados(recAux, "nomeReceita")}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formOrigem">
                        <Form.Label>Origem</Form.Label>
                        <Form.Control as="select" name="origem" >
                            <option defaultValue=""></option>
                            {filtraDados(recAux, "origem")}
                        </Form.Control>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="formMeioPagamento">
                        <Form.Label>Meio de pagamento</Form.Label>
                        <Form.Control as="select" name="meioPagamento" >
                            <option defaultValue=""></option>
                            {filtraDados(recAux, "meioPagamento")}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formFormaPagamento">
                        <Form.Label>Forma de pagamento</Form.Label>
                        <Form.Control as="select" name="formaPagamento" >
                            <option defaultValue=""></option>
                            {filtraDados(recAux, "formaPagamento")}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formSituacao">
                        <Form.Label>Situação</Form.Label>
                        <Form.Control as="select" name="situacao" >
                            <option defaultValue="PENDENTE">PENDENTE</option>
                            <option defaultValue="PAGO">PAGO</option>
                            <option defaultValue="PROGRAMADO">PROGRAMADO</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="formMesReferencia">
                        <Form.Label>Mês de referência </Form.Label>
                        <Form.Control as="select" name="mesReferencia" >
                            <option defaultValue=""></option>
                            {filtraDados(recAux, "mesReferencia")}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formDataCredito">
                        <Form.Label>Data de vencimento </Form.Label>
                        <Form.Control type="date" name="dataVencimento" required value={receita.dataVencimento} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formDataPagamento">
                        <Form.Label>Data de pagamento</Form.Label>
                        <Form.Control type="date" name="dataPagamento" value={receita.dataPagamento} />
                    </Form.Group>
                </Form.Row>
                <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                    <Button variant="secondary"  className="btn-fill pull-right" style={{ marginLeft: 30 }} onClick={x=>alert("aeee")}>
                        Aplicar filtro
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default ReceitaFilter;