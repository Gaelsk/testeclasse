import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import Box from "@material-ui/core/Box";
import { TableHead, TableCell } from "@material-ui/core";
import AddCourse from "../../components/admin/AddCourse";
//icons
import View from "@material-ui/icons/Visibility";
/*import DownloadIcon from "@material-ui/icons/CloudDownload";
import Star from "@material-ui/icons/RateReview";*/
//redux
import { connect } from "react-redux";
import { getCourses, addCourse } from "../../redux/actions/course";
import DeleteCourse from "../../components/course/DeleteCourse";
import AdminLayout from "../../components/admin/AdminLayout";
import Btn from "../../components/utils/Btn";

function Dashboard({ getCourses, courses, loading, addCourse }) {
  const [message, setMessage] = useState(null);
  useEffect(() => {
    getCourses();
    //setCourses()
  }, []);
  function handleAddCourse(course) {
    addCourse(course);
    setMessage("Cours ajouté avec succés");
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
          <Typography variant="h6">Liste des cours</Typography>
          <AddCourse handleAddCourse={handleAddCourse} />
        </Box>
        <Table>
          <TableHead
            style={{ backgroundColor: "#f5f5f5" }}
            className="bg-light"
          >
            <TableRow>
              <TableCell>Titre</TableCell>
              <TableCell>Matière</TableCell>
              <TableCell>Classe</TableCell>
              <TableCell>Format</TableCell>
              <TableCell>Téléchargements</TableCell>
              <TableCell>Options </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {courses.map(
              (
                { _id, title, url, format, category, level, rating, downloadCount },
                i
              ) => (
                <TableRow className="table-row" key={i}>
                  <TableCell>{title}</TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{level.name}</TableCell>
                  <TableCell>{format}</TableCell>
                  <TableCell>
                    <span>{downloadCount}</span>
                    {/*rating && (
                      <div className="d-flex align-items-center feature align-items-center">
                        {Array.from({ length: Math.ceil(rating) }).map(
                          (_, i) => (
                            <Star key={i} color="primary" />
                          )
                        )}
                        {Array.from({
                          length: 5 - Math.ceil(rating)
                        }).map((_, i) => (
                          <Star key={i} />
                        ))}
                      </div>
                        )*/}
                  </TableCell>
                  <Link to={`/cours/${title}`}>
                    <Btn tip="Voir le cours">
                      <View size={12} />
                    </Btn>
                  </Link>
                  <DeleteCourse url={url} id={_id} />
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
        {loading && (
          <>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="course-item-loading" />
            ))}
          </>
        )}
        {/*courses.length === 0 && (
                <>
                  <Typography>Aucun cours n'est disponible</Typography>
                  <AddCourse />
                </>
              )*/}
      </Paper>
    </AdminLayout>
  );
}

const mapStateToProps = state => ({
  courses: state.course.courses,
  loading: state.course.loading
});

const mapDispatchToProps = {
  getCourses,
  addCourse
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
