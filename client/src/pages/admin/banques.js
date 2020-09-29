import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

import moment from "../../utils/moment";

import Axios from "axios";
import AdminLayout from "../../components/admin/AdminLayout";
import AddBanque from "../../components/admin/AddBanque";
import DeleteBanque from "../../components/admin/DeleteBanque";

function Banque() {
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = useState(null);
  const [banques, setBanques] = React.useState([]);

  useEffect(() => {
    setLoading(true);
    Axios.get("/banques").then(res => {
      setBanques(res.data);
      setLoading(false);
    });
  }, []);

  function handleAddBanque(banque) {
    const banks = [banque, ...banques];
    setBanques(banks);
    setMessage("Epreuve ajoutée avec succés");
    setTimeout(() => {
      setMessage(null);
    }, 6000);
  }
  function handleDeleteBanque(id) {
    const data = banques.filter(banque => banque._id !== id);
    setBanques(data);
    setMessage("Epreuve supprimée avec succés");
    setTimeout(() => {
      setMessage(null);
    }, 6000);
  }
  return (
    <AdminLayout>
      <Paper className="table-container">
        {message && (
          <Box mb={2}>
            <Alert className="alert-message">{message}</Alert>
          </Box>
        )}
        <Box
          className="d-flex justify-content-between align-items-center"
          p={2}
          pt={4}
        >
          <Typography variant="h6">Liste des épreuves</Typography>
          <AddBanque handleAddBanque={handleAddBanque} />
        </Box>
        {loading && (
          <>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="course-item-loading" />
            ))}
          </>
        )}
        <Table>
          <TableHead style={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>Banque</TableCell>
              <TableCell>Matière</TableCell>
              <TableCell>Classe</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {banques.map((banque, i) => (
              <TableRow className="table-row" key={i}>
                <TableCell>{banque.name}</TableCell>
                <TableCell>{banque.category.name}</TableCell>
                <TableCell>{banque.level.name}</TableCell>
                <TableCell>
                  {moment(banque.createdAt).format("dddd, DD MMM YYYY")}
                </TableCell>
                <TableCell>
                  <DeleteBanque
                    id={banque._id}
                    handleDeleteBanque={handleDeleteBanque}
                    name={banque.name}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </AdminLayout>
  );
}

export default Banque;
