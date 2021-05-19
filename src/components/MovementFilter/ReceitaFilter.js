import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { Form, InputGroup } from "react-bootstrap";
import { Col } from "reactstrap";
import { Button } from "react-bootstrap";

function ReceitaFilter({ receita, handleFilter, recFiltro, setRecFiltro }) {

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

    const handleChange = x => {
        recFiltro[x.target.name] = x.target.value === "" ? null : x.target.value;
        setRecFiltro(recFiltro);
    }

    const cleanData = () => {
        recFiltro.nomeReceita = null
        recFiltro.origem = null
        recFiltro.meioPagamento = null
        recFiltro.formaPagamento = null
        recFiltro.situacao = "PENDENTE"
        recFiltro.mesReferencia = null
        setRecFiltro[recFiltro]
    }

    return (
        <div>
            <Form noValidate style={{ fontWeight: 'bold' }}>
                <Form.Row>
                    <Form.Group as={Col} controlId="formNome">
                        <Form.Label>Receita</Form.Label>
                        <Form.Control as="select" name="nomeReceita" onChange={handleChange}>
                            <option defaultValue=""></option>
                            {filtraDados(recAux, "nomeReceita")}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formOrigem">
                        <Form.Label>Origem</Form.Label>
                        <Form.Control as="select" name="origem" onChange={handleChange}>
                            <option defaultValue=""></option>
                            {filtraDados(recAux, "origem")}
                        </Form.Control>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="formMeioPagamento">
                        <Form.Label>Meio de pagamento</Form.Label>
                        <Form.Control as="select" name="meioPagamento" onChange={handleChange}>
                            <option defaultValue=""></option>
                            {filtraDados(recAux, "meioPagamento")}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formFormaPagamento">
                        <Form.Label>Forma de pagamento</Form.Label>
                        <Form.Control as="select" name="formaPagamento" onChange={handleChange}>
                            <option defaultValue=""></option>
                            {filtraDados(recAux, "formaPagamento")}
                        </Form.Control>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="formMesReferencia">
                        <Form.Label>Mês de referência </Form.Label>
                        <Form.Control as="select" name="mesReferencia" onChange={handleChange}>
                            <option defaultValue=""></option>
                            {filtraDados(recAux, "mesReferencia")}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formSituacao">
                        <Form.Label>Situação</Form.Label>
                        <Form.Control as="select" name="situacao" onChange={handleChange}>
                            <option defaultValue=""></option>
                            <option defaultValue="PENDENTE">PENDENTE</option>
                            <option defaultValue="PAGO">PAGO</option>
                            <option defaultValue="PROGRAMADO">PROGRAMADO</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                    <Button variant="success" className="btn-fill pull-right" style={{ marginLeft: 30 }} onClick={() => handleFilter()}>
                        Aplicar filtro
                    </Button>
                    <Button variant="danger" type="reset" className="btn-fill pull-right" style={{ marginLeft: 30 }} onClick={() => { cleanData(); handleFilter() }}>
                        Limpar filtro
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default ReceitaFilter;