import React, { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Col } from "reactstrap";
import { Alert } from "bootstrap";
import { Button } from "react-bootstrap";

function DespesaFilter({ despesa, handleFilter, despFiltro, setDespFiltro }) {

    const [despAux, setDespAux] = useState([]);

    useEffect(() => {
        setDespAux(despesa)
    }, [despesa])

    function filtraDados(despesa, field) {
        let aux = 0;
        let vAux = new Array();
        despesa.map(d => vAux.push(d[field]));
        vAux = vAux.filter((value, index) => vAux.indexOf(value) === index)
        return vAux.map(d =>
            <option key={d} value={d}>{d}</option>);
    }

    const handleChange = x => {
        despFiltro[x.target.name] = x.target.value;
        setDespFiltro(despFiltro);
    }

    const cleanData = () => {
        despFiltro.nomeDespesa = ""
        despFiltro.favorecido = ""
        despFiltro.meioPagamento = ""
        despFiltro.formaPagamento = ""
        despFiltro.situacao = ""
        despFiltro.mesReferencia = ""
        setDespFiltro[despFiltro]
    }

    return (
        <div>
            <Form noValidate style={{ fontWeight: 'bold' }}>
                <Form.Row>
                    <Form.Group as={Col} controlId="formNome">
                        <Form.Label>Despesa</Form.Label>
                        <Form.Control as="select" name="nomeDespesa" onChange={handleChange}>
                            <option defaultValue=""></option>
                            {filtraDados(despAux, "nomeDespesa")}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formFavorecido">
                        <Form.Label>Favorecido</Form.Label>
                        <Form.Control as="select" name="favorecido" onChange={handleChange}>
                            <option defaultValue=""></option>
                            {filtraDados(despAux, "favorecido")}
                        </Form.Control>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="formMeioPagamento">
                        <Form.Label>Meio de pagamento</Form.Label>
                        <Form.Control as="select" name="meioPagamento" onChange={handleChange}>
                            <option defaultValue=""></option>
                            {filtraDados(despAux, "meioPagamento")}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formFormaPagamento">
                        <Form.Label>Forma de pagamento</Form.Label>
                        <Form.Control as="select" name="formaPagamento" onChange={handleChange}>
                            <option defaultValue=""></option>
                            {filtraDados(despAux, "formaPagamento")}
                        </Form.Control>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="formMesReferencia">
                        <Form.Label>Mês de referência </Form.Label>
                        <Form.Control as="select" name="mesReferencia" onChange={handleChange}>
                            <option defaultValue=""></option>
                            {filtraDados(despAux, "mesReferencia")}
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
                    <Button variant="success" className="btn-fill pull-right" style={{ marginLeft: 30 }} onClick={() => {handleFilter(); console.log(despFiltro)}}>
                        Aplicar filtro
                    </Button>
                    <Button variant="danger" type="reset" className="btn-fill pull-right" style={{ marginLeft: 30 }} onClick={() => { cleanData(); handleFilter(); console.log(despFiltro) }}>
                        Limpar filtro
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default DespesaFilter;