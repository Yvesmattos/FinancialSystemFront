import React from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function MinhaConta() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Edit Profile</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Empresa</label>
                        <Form.Control
                          defaultValue="Mattos Company."
                          disabled
                          placeholder="Empresa"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="3">
                      <Form.Group>
                        <label>Nome de Usuário</label>
                        <Form.Control
                          disabled
                          defaultValue="YvesMattos"
                          placeholder="Nome de Usuário"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                          Email
                        </label>
                        <Form.Control
                          disabled
                          defaultValue="yvesmattos@gmail.com"
                          placeholder="Email"
                          type="email"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Nome</label>
                        <Form.Control
                          disabled
                          defaultValue="Yves"
                          placeholder="1º nome"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Sobrenome</label>
                        <Form.Control
                          disabled
                          defaultValue="Mattos"
                          placeholder="Sobrenome"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Endereço</label>
                        <Form.Control
                          disabled
                          defaultValue="Rua Arsênico 69"
                          placeholder="Endereço"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>Cidade</label>
                        <Form.Control
                          disabled
                          defaultValue="São João de Meriti  "
                          placeholder="Cidade"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label>País</label>
                        <Form.Control
                          disabled
                          defaultValue="Brasil"
                          placeholder="País"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>CEP</label>
                        <Form.Control
                          disabled
                          defaultValue="25550-450"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <div className="card-image">
                <img
                  alt=""
                  src={
                    require("assets/img/photo-1431578500526-4d9613015464.jpeg")
                      .default
                  }
                ></img>
              </div>
              <Card.Body>
                <div className="author">
                  <img
                    alt=""
                    className="avatar border-gray"
                    src={require("assets/img/faces/face-3.jpg").default}
                  ></img>
                  <h5 className="title" style={{ color: '#1DC7EA' }}>Yves Mattos</h5>
                  <p className="description"><b>@mattos</b></p>
                </div>
                <p className="description text-center">
                  "Sometimes darkness <br></br>
                  can show you the light"<br></br>
                </p>
              </Card.Body>
              <hr></hr>
              <div className="button-container mr-auto ml-auto">
                <Button
                  className="btn-simple btn-icon"
                  href="https://www.facebook.com/yves.mattos/"
                  variant="link"
                >
                  <i className="fab fa-facebook-square"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="https://www.instagram.com/yves_mattos/"
                  variant="link"
                >
                  <i className="fab fa-instagram"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="https://github.com/Yvesmattos"
                  variant="link"
                >
                  <i className="fab fa-github"></i>
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default MinhaConta;
