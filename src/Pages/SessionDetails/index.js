import {
  Button,
  Container,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AddUser from "../../Components/AddUser";
import CustomSelect from "../../Components/CustomSelectField";
import { CustomInput } from "../../Components/CustomTextField";
import SelectImage from "../../Components/DNDSelectImage/SelectImage";
import { LightButton } from "../../Components/Shared/LightButton";
import { ReactComponent as ChevronLeftIcon } from "../../assets/images/chevron-left.svg";
import imagePlaceholder from "../../assets/images/image_placeholder.png";
import { ReactComponent as QuestionMarkIcon } from "../../assets/images/question-mark.svg";
import { createSession } from "../../services/createAxiosClient";
import StyledComponent from "./StyledComponent";
import useModeratorsHook from "./moderatorHook";
import useSpeakersHook from "./speakersHook";
import useViewSession from "./viewSessionHook";

function SessionDetails() {
  const [formData, setFormData] = useState({
    speakers: [],
    moderators: [],
    title: "",
    subtitle: "",
    description: "",
    cover_image: "",
    date: "",
    from: "",
    till: "",
    venue: "",
  });
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const handleSnackbar = () => {
    setSnackbarOpen((prev) => !prev);
  };

  const { session_id } = useParams();
  const navigate = useNavigate();
  const handleViewData = (data) => {
    setFormData(data);
  };
  const {} = useViewSession({
    session_id,
    setData: handleViewData,
  });
  const [addUserDialog, setAddUserDialog] = React.useState({
    open: false,
    type: null,
  });

  const handleAdduser = (open, type) => {
    setAddUserDialog({
      open,
      type: open ? type : null,
    });
  };

  const formDataHandler = ({ key, value }) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const removeSelectedItem = ({ key, id }) => {
    const updatedItems = formData[key].filter((i) => i.id !== id);
    formDataHandler({ key, value: updatedItems });
  };

  const {
    hasMoreItem: speakersHasMore,
    loadMore: loadMoreSpeakers,
    options: speakersOptions,
    searchHandler: speakersSearchHandler,
    resetList: resetSpeakersList,
  } = useSpeakersHook();

  const {
    hasMoreItem: moderatorsHasMore,
    loadMore: loadMoreModerators,
    options: moderatorsOptions,
    searchHandler: moderatorsSearchHandler,
    resetList: resetModeratorsList,
  } = useModeratorsHook();

  const formatSessionData = () => {
    const speakers = formData.speakers.map((i) => i.id);
    const moderators = formData.moderators.map((i) => i.id);
    const file = formData.cover_image;
    const image = new FormData();
    image.append("image", file);
    image.append("name", file.name);
    const data = {
      ...formData,
      cover_image: image,
      speaker_ids: speakers,
      moderator_ids: moderators,
      event_id: 19,
    };
    delete data["venue"];
    return data;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = formatSessionData();
    
    const res = await createSession(data);
    if (res?.status === 200 || res?.status === 201) {
      handleSnackbar();
    }
  };

  const onCloseSnackbar = () => {
    handleSnackbar();
    navigate("/");
  };

  return (
    <StyledComponent>
      <div className="page-bar">
        <div>
          <Button startIcon={<ChevronLeftIcon />} size="small">
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "#9A9A9A",
              }}
            >
              All Sessions
            </Link>
          </Button>
          <Typography variant="h5">{`${
            session_id ? "View" : "New"
          } Sessions`}</Typography>
        </div>
        <div>
          <Button sx={{ bgcolor: "#2E2E2E", borderRadius: 0, color: "white" }}>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "white",
              }}
            >
              Close
            </Link>
          </Button>
          {session_id ? null : (
            <LightButton type="submit" form="create-session-form">
              New
            </LightButton>
          )}
        </div>
        {/* </Link> */}
      </div>
      <Container fixed maxWidth="md">
        <form
          className="form-container"
          onSubmit={onSubmit}
          id="create-session-form"
        >
          <FormControl fullWidth variant="standard" margin="normal">
            <InputLabel shrink htmlFor="Title-input">
              <span>
                Session Title <span className="required">*</span>
              </span>
            </InputLabel>
            <CustomInput
              fullWidth
              id="Title-input"
              placeholder="Start Typing..."
              required
              onChange={(e) =>
                formDataHandler({ key: "title", value: e.target.value })
              }
              value={formData.title}
              readOnly={Boolean(session_id)}
            />
          </FormControl>

          <FormControl fullWidth variant="standard" margin="normal">
            <InputLabel shrink htmlFor="Subtitle-input">
              <span>
                Session Subtitle <span className="required">*</span>
              </span>
            </InputLabel>
            <span
              style={{ textAlign: "end" }}
              title="Unique info about the session, that will be displayed under the title"
            >
              <QuestionMarkIcon />
            </span>
            <CustomInput
              fullWidth
              id="Subtitle-input"
              placeholder="Start Typing..."
              required
              onChange={(e) =>
                formDataHandler({ key: "subtitle", value: e.target.value })
              }
              value={formData.subtitle}
              readOnly={Boolean(session_id)}
            />
          </FormControl>

          <SelectImage
            onChange={(value) => formDataHandler({ key: "cover_image", value })}
            value={formData.cover_image}
            readOnly={Boolean(session_id)}
          />

          <div className="date-time-container">
            <FormControl variant="standard" margin="normal">
              <InputLabel shrink htmlFor="date-input">
                <span>
                  Date <span className="required">*</span>
                </span>
              </InputLabel>
              <CustomInput
                type="date"
                id="date-input"
                required
                onChange={(e) =>
                  formDataHandler({ key: "date", value: e.target.value })
                }
                value={formData.date}
                readOnly={Boolean(session_id)}
              />
            </FormControl>

            <FormControl variant="standard" margin="normal">
              <InputLabel shrink htmlFor="from-input">
                <span>
                  From <span className="required">*</span>
                </span>
              </InputLabel>
              <CustomInput
                type="time"
                id="from-input"
                placeholder="Start Typing..."
                required
                onChange={(e) =>
                  formDataHandler({ key: "from", value: e.target.value })
                }
                value={formData.from}
                readOnly={Boolean(session_id)}
              />
            </FormControl>

            <FormControl variant="standard" margin="normal">
              <InputLabel shrink htmlFor="till-input">
                <span>
                  Till <span className="required">*</span>
                </span>
              </InputLabel>
              <CustomInput
                type="time"
                id="till-input"
                placeholder="Start Typing..."
                required
                onChange={(e) =>
                  formDataHandler({ key: "till", value: e.target.value })
                }
                value={formData.till}
                readOnly={Boolean(session_id)}
              />
            </FormControl>
          </div>

          <FormControl fullWidth variant="standard" margin="normal">
            <InputLabel shrink htmlFor="description-input">
              <span>
                Description <span className="required">*</span>
              </span>
            </InputLabel>

            <CustomInput
              fullWidth
              id="description-input"
              placeholder="Start Typing..."
              required
              rows={4}
              multiline
              onChange={(e) =>
                formDataHandler({ key: "description", value: e.target.value })
              }
              value={formData.description}
              readOnly={Boolean(session_id)}
            />
          </FormControl>
          <Divider sx={{ m: "24px 0 16px 0" }} />
          <CustomSelect
            hasMoreItem={speakersHasMore}
            loadMore={loadMoreSpeakers}
            options={speakersOptions}
            searchHandler={speakersSearchHandler}
            onChange={(value) => formDataHandler({ key: "speakers", value })}
            value={formData.speakers}
            removeItem={(id) => removeSelectedItem({ key: "speakers", id })}
            resetList={resetSpeakersList}
            label="Speakers"
            required
            onAddUser={() => handleAdduser(true, "Speakers")}
            readOnly={Boolean(session_id)}
          />

          <CustomSelect
            hasMoreItem={moderatorsHasMore}
            loadMore={loadMoreModerators}
            options={moderatorsOptions}
            searchHandler={moderatorsSearchHandler}
            onChange={(value) => formDataHandler({ key: "moderators", value })}
            value={formData.moderators}
            removeItem={(id) => removeSelectedItem({ key: "moderators", id })}
            resetList={resetModeratorsList}
            label="Moderators"
            required
            onAddUser={() => handleAdduser(true, "Moderators")}
            readOnly={Boolean(session_id)}
          />
          <Divider sx={{ m: "24px 0 16px 0" }} />

          <FormControl fullWidth variant="standard" margin="normal">
            <InputLabel shrink htmlFor="description-input">
              <span>Description</span>
            </InputLabel>
            <Select
              onChange={(e) =>
                formDataHandler({ key: "venue", value: e.target.value })
              }
              value={formData?.venue?.name || ""}
              id={`venue-input`}
              input={<CustomInput />}
              readOnly={Boolean(session_id)}
            >
              <MenuItem disabled value="">
                none
              </MenuItem>
              {formData.venue && (
                <MenuItem disabled value={formData?.venue?.name}>
                  {formData.venue?.name}
                </MenuItem>
              )}
            </Select>
          </FormControl>
          {formData.venue ? (
            <div className="selected-venue">
              <img
                src={formData.venue?.image || imagePlaceholder}
                alt={formData.venue?.name}
              />
              <div>
                <Typography fontWeight="bold">
                  {formData.venue?.name}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {formData.venue?.venue_type ?? ""}
                </Typography>
              </div>
            </div>
          ) : null}
        </form>
      </Container>

      <AddUser
        open={addUserDialog.open}
        type={addUserDialog.type}
        handleOpen={(open) => handleAdduser(open, null)}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={onCloseSnackbar}
        message="Session has been created successfully"

        // action={action}
      />
    </StyledComponent>
  );
}

export default SessionDetails;
