import * as React from "react";

export const Dialog = {};
/*
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import { Flex, Text } from "./styled";
import Select from 'react-select';
import axios from "axios";

const Checkbox = props => <input type="checkbox" {...props} />;

class SingleSelect extends React.Component {

  render() {
    const { isLoading, options, onChange, defaultValue } = this.props;
    return (
      <>
        <Select
          isLoading={isLoading}
          onChange={onChange}
          defaultValue={defaultValue}
          isClearable
          isSearchable
          name={this.props.name}
          menuPosition="fixed"
          options={options}
        />
      </>
    );
  }
}


export class Picker extends React.Component {
  state = {
    open: false,
    options: [],
    isLoading: false,
    value: -1,
  };

  handleClickOpen = async () => {
    this.setState({ open: true, isLoading: true });
    const data = await axios.get(`http://localhost:3030/api/v1/${this.props.type}/get?visible=true`);
    this.setState({ isLoading: false, options: this.compute(data.data.result) });
  };

  compute = arr => {
    return arr.map(x => ({ value: x.id, label: `${x.id} ${x.name}` }));
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSelect = () => {
    const { value } = this.state;
    if (value === -1) {
      alert(`Select ${this.props.type}`);
      return;
    }
    this.setState({ open: false, value: -1 });
    this.props.onClose(value);
  };

  handleChange = (e) => this.setState({ value: (e ? e.value : -1) })

  render() {
    const Opener = this.props.component;
    return (
      <>
        <Opener onClick={this.handleClickOpen} />
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          PaperProps={{ style: { overflow: "visible" } }} >
          <DialogTitle id="form-dialog-title">{this.props.type}</DialogTitle>
          <DialogContent style={{ width: "600px", height: "max-content" }}>
            <SingleSelect
              defaultValue={this.state.value}
              isLoading={this.state.isLoading} name={this.props.type}
              options={this.state.options} onChange={this.handleChange} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSelect} color="primary">
              Select
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}


export class EditDialog extends React.Component {
  state = {
    open: false,
    value: {},
  };

  handleClickOpen = () => {
    const { data } = this.props;
    this.setState({ open: true });
    this.setState({
      value: {
        ...data.reduce((acc, n) => ({ ...acc, [n.field]: n.value }), {})
      }
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSelect = () => {
    const { value } = this.state;
    this.setState({ open: false, value: -1 });
    this.props.onClose(value);
  }

  handleChange = (type) => e => {
    this.setState(prev => ({
      ...prev,
      value: {
        ...prev.value,
        [type]: e.value
      }
    }));
  }

  handleChangeTextField = (type) => e => {
    e.persist();
    this.setState(prev => ({
      ...prev,
      value: {
        ...prev.value,
        [type]: e.target.value,
      }
    }));
  }

  render() {
    const Opener = this.props.component;
    const { data } = this.props;
    return (
      <>
        <Opener onClick={this.handleClickOpen} />
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          PaperProps={{ style: { overflow: "visible" } }} >
          <DialogTitle id="form-dialog-title">{this.props.type}</DialogTitle>
          <DialogContent style={{ width: "600px", height: "max-content" }}>
            {data.map((s) => {
              return s.type === "selector" ?
                <SingleSelect
                  style={{ marginBottom: "16px", zIndex: 9000 }}
                  key={s.field}
                  name={s.field}
                  options={s.options}
                  defaultValue={s.value}
                  onChange={this.handleChange(s.field)}
                />
                : s.type === "input" ?
                  <TextField
                    style={{ marginBottom: "16px" }}
                    key={s.field}
                    variant="outlined"
                    margin="dense"
                    label={s.field}
                    onChange={this.handleChangeTextField(s.field)}
                    fullWidth />
                  : null;
            })}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSelect} color="primary">
              Select
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

const timeOption = [
  { value: 1, label: "30min" },
  { value: 2, label: "1hr" },
  { value: 3, label: "1hr 30min" },
  { value: 4, label: "2hr" },
  { value: 5, label: "2hr 30min" },
  { value: 6, label: "3hr" },
  { value: 7, label: "3hr 30min" },
  { value: 8, label: "4hr" },
  { value: 9, label: "4hr 30min" },
  { value: 10, label: "5hr" },
  { value: 11, label: "5hr 30min" },
  { value: 12, label: "6hr" },
  { value: 13, label: "6hr 30min" },
  { value: 14, label: "7hr" },
];
export class SchedulePicker extends React.Component {

  state = {
    open: false,
    value: null,
    startTime: "16:30",
    duration: 4,
    excludes: [],
  };

  handleClickOpen = () => {
    this.setState({ open: true });
    this.setState({ excludes: this.props.excludes });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSelect = () => {
    const { value, startTime, duration } = this.state;
    this.setState({ open: false, value: null, startTime: "16:30", duration: 4, excludes: [] });
    if (value) {
      const [hour, min] = startTime.split(":");
      const date = moment(value).add((parseInt(hour) - 12), "hours").add(min, "minutes").format();
      this.props.onClose({ date, time: duration });
    } else {
      // TODO: Throw error here
      console.log("ERROR");
    }
  }

  handleChange = (day, { selected }) => {
    this.setState({
      value: selected ? undefined : day,
    });
  }

  handleStartTimeChange = (e) => {
    e.persist();
    this.setState({ startTime: e.target.value });

  }

  handleDurationChange = (e) => {
    this.setState({ duration: e.value });
  }

  render() {
    const Opener = this.props.component;
    return (
      <>
        <Opener onClick={this.handleClickOpen} />
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          PaperProps={{ style: { overflow: "visible" } }} >
          <DialogTitle id="form-dialog-title">NEW SCHEDULE</DialogTitle>
          <DialogContent style={{ width: "max-content", height: "max-content" }}>
            <DayPicker
              disabledDays={this.state.excludes.map(x => new Date(x))}
              showOutsideDays
              selectedDays={this.state.value}
              onDayClick={this.handleChange}
            />
            <TextField
              label="Start time"
              type="time"
              defaultValue="16:30"
              onChange={this.handleStartTimeChange}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300,
              }}
            />
            <Col>
              <Text ml={1} mb={1} mt={2}>
                Duraction
              </Text>
              <Select
                onChange={this.handleDurationChange}
                defaultValue={timeOption[3]}
                isSearchable
                name="duration"
                menuPosition="fixed"
                options={timeOption}
              />
            </Col>
            <Helmet>
              <style>{`
                .DayPicker-wrapper, .DayPicker-Day {
                  outline: none;
                }
                .DayPicker-Day--disabled {
                  background-color:rgba(74, 144, 226, 0.5);
                  color: white;
                }
              `}</style>
            </Helmet>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSelect} color="primary">
              Select
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}
*/
