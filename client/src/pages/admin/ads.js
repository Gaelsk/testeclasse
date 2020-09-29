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
import AddAd from "../../components/admin/AddAd";
import DeleteAd from "../../components/admin/DeleteAd";

function Ad() {
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = useState(null);
  const [ads, setAds] = React.useState([]);

  useEffect(() => {
    setLoading(true);
    Axios.get("/ads").then(res => {
      setAds(res.data);
      console.log(res.data)
      setLoading(false);
    });
  }, []);

  function handleAddAd(ad) {
    const data = [ad, ...ads];
    setAds(data);
    setMessage("Publicité créée avec succés");
    setTimeout(() => {
      setMessage(null);
    }, 6000);
  }
  function handleDeleteAd(id) {
    const data = ads.filter(ad => ad._id !== id);
    setAds(data);
    setMessage("Publicité supprimée avec succés");
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
          <Typography variant="h6">Publicités</Typography>
          <AddAd handleAddAd={handleAddAd} />
        </Box>

        <Table>
          <TableHead style={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Contenu</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Options</TableCell>
            </TableRow>
          </TableHead>
          {ads.length}
          <TableBody>
                      {ads.length > 0 && ads.map((ad, i) => (
                        <TableRow className="table-row" key={i}>
                          <TableCell>{ad.title}</TableCell>
                          <TableCell>{ad.content.substr(0, 50)}...</TableCell>
                          <TableCell>
                            {moment(ad.createdAt).format("dddd, DD MMM YYYY")}
                          </TableCell>
                          <TableCell>
                            <DeleteAd id={ad._id} handleDeleteAd={handleDeleteAd} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
        </Table>
        {loading && (
          <>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="course-item-loading" />
            ))}
          </>
        )}
      </Paper>
    </AdminLayout>
  );
}

export default Ad;
