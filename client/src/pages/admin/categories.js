import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Alert from "@material-ui/lab/Alert";

import axios from "axios";
import CategoryForm from "../../components/admin/CategoryForm";
import DeleteCategory from "../../components/admin/DeleteCategory";
import LevelForm from "../../components/admin/LevelForm";
import DeleteLevel from "../../components/admin/DeleteLevel";
import moment from "../../utils/moment";

export default function Categories() {
  const [levels, setLevels] = useState([]);
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    axios.get("/categories").then(res => setCategories(res.data));
    axios.get("/levels").then(res => setLevels(res.data));
  }, []);
  function addCategory(cat) {
    setCategories([cat, ...categories]);
    setMessage("Matière ajoutée avec succés");
    setTimeout(() => {
      setMessage(null);
    }, 6000);
  }
  function handleUpdateCategory(category) {
    const cats = categories.map(cat => {
      if (cat._id == category._id) {
        return category;
      } else {
        return cat;
      }
    });
    setCategories(cats);
    setMessage("Matière modifiée avec succès");
    setTimeout(() => {
      setMessage(null);
    }, 6000);
  }
  function handleDeleteCategory(id) {
    const cats = categories.filter(cat => cat._id !== id);
    setCategories(cats);
    setMessage("Matière supprimée avec succés");
    setTimeout(() => {
      setMessage(null);
    }, 6000);
  }
  function addLevel(level) {
    setLevels([level, ...levels]);
    setMessage("Classe ajoutée avec succès");
    setTimeout(() => {
      setMessage(null);
    }, 6000);
  }
  function handleUpdateLevel(levelUpdated) {
    const levls = levels.map(level => {
      if (level._id == levelUpdated._id) {
        return levelUpdated;
      } else {
        return level;
      }
    });
    setLevels(levls);
    setMessage("Classe modifiée avec succès");
    setTimeout(() => {
      setMessage(null);
    }, 6000);
  }
  function handleDeleteLevel(id) {
    const levelUpdated = levels.filter(level => level._id !== id);
    setLevels(levelUpdated);
    setMessage("Classe supprimée avec succés");
    setTimeout(() => {
      setMessage(null);
    }, 6000);
  }
  return (
    <AdminLayout>
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          {message && (
            <Box mb={2}>
              <Alert className="alert-message">{message}</Alert>
            </Box>
          )}
          <Paper className="table-container">
            <Box
              className="d-flex justify-content-between align-items-center"
              p={2}
              pt={4}
            >
              <Typography variant="h6">Liste des matières</Typography>
              <CategoryForm handleAddCategory={addCategory} />
            </Box>
            <Table>
              <TableHead style={{ backgroundColor: "#f5f5f5" }}>
                <TableRow>
                  <TableCell>Matières</TableCell>
                  <TableCell>Date de création</TableCell>
                  <TableCell>Options</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.map((cat, i) => (
                  <TableRow className="table-row" key={i}>
                    <TableCell>{cat.name}</TableCell>
                    <TableCell>
                      {moment(cat.createdAt).format("dddd, DD MMM YYYY")}
                    </TableCell>
                    <TableCell>
                      <CategoryForm
                        id={cat._id}
                        category_name={cat.name}
                        handleUpdateCategory={handleUpdateCategory}
                      />
                      <DeleteCategory
                        id={cat._id}
                        handleDeleteCategory={handleDeleteCategory}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>

        <Grid item md={6} xs={12}>
          <Paper className="table-container">
            <Box
              className="d-flex justify-content-between align-items-center"
              p={2}
              pt={4}
            >
              <Typography variant="h6">Liste des classes</Typography>
              <LevelForm handleAddLevel={addLevel} />
            </Box>
            <Table>
              <TableHead style={{ backgroundColor: "#f5f5f5" }}>
                <TableRow>
                  <TableCell>Niveaux</TableCell>
                  <TableCell>Date de création</TableCell>
                  <TableCell>Options</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {levels.map((level, i) => (
                  <TableRow className="table-row" key={i}>
                    <TableCell>{level.name}</TableCell>
                    <TableCell>
                      {moment(level.createdAt).format("dddd, DD MMM YYYY")}
                    </TableCell>
                    <TableCell>
                      <LevelForm
                        id={level._id}
                        level_name={level.name}
                        handleUpdateLevel={handleUpdateLevel}
                      />
                      <DeleteLevel
                        id={level._id}
                        handleDeleteLevel={handleDeleteLevel}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>{" "}
        </Grid>
      </Grid>
    </AdminLayout>
  );
}
