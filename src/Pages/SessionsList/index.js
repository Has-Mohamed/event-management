import {
  Box,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { LightButton } from "../../Components/Shared/LightButton";
import { ReactComponent as ChevronRightIcon } from "../../assets/images/Chevron-right20.svg";
import { ReactComponent as EditIcon } from "../../assets/images/Edit24.svg";
import { ReactComponent as CalendarIcon } from "../../assets/images/calendar.svg";
import { ReactComponent as ChevronIcon } from "../../assets/images/chevron-down24.svg";
import clockIcon from "../../assets/images/clock-time20.png";
import placeHolderImage from "../../assets/images/image_placeholder.png";
import { ReactComponent as PlusIcon } from "../../assets/images/plus.svg";
import { getAllSessions } from "../../services/createAxiosClient";
import StyledComponent from "./StyledComponent";

const LIMIT = 10;
function SessionsList() {
  const [page, setPage] = React.useState(1);
  const [allSession, setAllSession] = React.useState({});

  const sessionsList = allSession?.sessions ?? [];
  const getAllSession = async ({
    event_id = 19,
    offset = 0,
    limit = LIMIT,
  }) => {
    const res = await getAllSessions({ event_id, offset, limit });
    if (res.status === 200 || res?.status === 201) {
      // const users = [...allSession.sessions, ...res.data.sessions];
      // const data = newList ? res.data : { ...res.data, users };
      setAllSession(res.data);
    }
  };

  useEffect(() => {
    getAllSession({});

    return () => {};
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    getAllSession({
      offset: LIMIT * (newPage - 1),
    });
  };

  const tableHeaders = ["Session Name", "Date", "Time", "Venue", ""];
  return (
    <StyledComponent>
      <div className="page-bar">
        <Typography variant="h5">All Sessions</Typography>
        <Link to="/new-session">
          <LightButton startIcon={<PlusIcon />}>New Session</LightButton>
        </Link>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {tableHeaders.map((text) => (
                <TableCell key={text}>
                  <Box component="span" sx={{ mr: 1 }}>
                    {text}
                  </Box>
                  {text !== "" && <ChevronIcon className="table-cell-icon" />}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sessionsList.map((session, index) => (
              <TableRow key={index}>
                <TableCell width={600}>
                  <img
                    src={session.cover_image || placeHolderImage}
                    className="profile-image table-cell-icon"
                    alt={session.title}
                  />
                  <span>{session.title}</span>
                </TableCell>
                <TableCell>
                  <CalendarIcon className="table-cell-icon" />
                  <span>{session.date}</span>
                </TableCell>
                <TableCell>
                  <img src={clockIcon} alt="time" className="table-cell-icon" />
                  <span>{`${session.from} - ${session.till}`}</span>
                </TableCell>
                <TableCell>
                  <span>{session.venue?.name}</span>
                </TableCell>
                <TableCell>
                  <Link
                    style={{ padding: 8 }}
                    to={`/view-session/${session.id}`}
                  >
                    <EditIcon />
                  </Link>
                  <Link
                    style={{ padding: 8 }}
                    to={`/view-session/${session.id}`}
                  >
                    <ChevronRightIcon />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="pagenation-container">
          <Typography variant="caption">{`Showing ${allSession?.number} entires of ${allSession?.count}`}</Typography>
          <Pagination
            component="div"
            count={Math.ceil(allSession?.count / LIMIT) || 0}
            page={page}
            onChange={handleChangePage}
            variant="outlined"
            shape="rounded"
            // siblingCount={1}
          />
        </div>
      </TableContainer>
    </StyledComponent>
  );
}

export default SessionsList;
