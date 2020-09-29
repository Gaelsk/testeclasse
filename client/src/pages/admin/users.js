import React, { useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";

import Axios from "axios";
import AdminLayout from "../../components/admin/AdminLayout";

import moment from "../../utils/moment";

function Users() {
  const [loading, setLoading] = React.useState(false);

  const [users, setUsers] = React.useState([]);

  useEffect(() => {
    setLoading(true);
    Axios.get("/users").then(res => {
      setUsers(res.data);
      setLoading(false);
    });
  }, []);
  return (
    <AdminLayout>
      <Paper className="table-container">
        <Table>
          <TableHead
            style={{ backgroundColor: "#f5f5f5" }}
            className="bg-light"
          >
            <TableRow>
              <TableCell>Nom d'utilisateur</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Classe</TableCell>
              <TableCell>Date d'enrégistrement </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map(({ _id, username, email, level, createdAt }) => (
              <TableRow className="table-row" key={_id}>
                <TableCell>{username}</TableCell>
                <TableCell>{email}</TableCell>
                <TableCell>{level && level.name}</TableCell>
                <TableCell>
                  {moment(createdAt).format("dddd, DD MMM YYYY")}
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

export default Users;
