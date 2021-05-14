import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import Pagination from "components/Pagination/Pagination";
import { formatPrice } from "helpers";
import {
    Button,
    Table,
} from "react-bootstrap";

const DataTable = ({ dicionario, handleOpenDialog, handleClickOpen, movimentoExcluir, open, handleClose, setOpen, setPage, page, onPageChange, setActivePage }) => {

    const changePage = (index) => {
        setActivePage(index);
    }

    return (
        <>
            <Table className="table-hover table-striped tableCenter">
                <thead>
                    <tr>
                        <th className="border-0">{dicionario.despesa ?? dicionario.receita}</th>
                        <th className="border-0">{dicionario.favorecido ?? dicionario.origem}</th>
                        <th className="border-0">{dicionario.dataVencimento ?? dicionario.mesReferencia}</th>
                        <th className="border-0">{dicionario.valorDespesa ?? dicionario.valorReceita}</th>
                        <th className="border-0">{dicionario.valorPago ?? dicionario.valorPago}</th>
                        <th className="border-0">Situação</th>
                    </tr>
                </thead>
                <tbody>
                    {page.content?.map(x => (
                        <tr key={x.id}>
                            <td>{x.nomeDespesa ?? x.nomeReceita}</td>
                            <td>{x.favorecido ?? x.origem}</td>
                            <td>{x.dataVencimento ?? x.mesReferencia}</td>
                            <td>{formatPrice(x.valorDespesa ?? x.valorReceita)}</td>
                            <td>{formatPrice(x.valorPago)}</td>
                            <td>{x.situacao}</td>
                            <td><Button className="btn-fill pull-right" variant="success" onClick={() => handleOpenDialog(x)}>Alterar</Button></td>
                            <td><Button className="btn-fill pull-right" variant="danger" onClick={() => handleClickOpen(x)}>Excluir</Button>
                                <Dialog
                                    key={movimentoExcluir !== undefined ? movimentoExcluir.id : null}
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
                                        <Button onClick={() => handleClose(movimentoExcluir)} color="primary" autoFocus>
                                            Sim
                              </Button>
                                    </DialogActions>
                                </Dialog>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination page={page} onPageChange={changePage}></Pagination>
        </>
    )
}

export default DataTable;