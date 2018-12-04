import * as React from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import { Flex, Text } from "./styled";
import DayPicker from "./DayPicker";
import Select from 'react-select';
import axios from "axios";
import Helmet from "react-helmet";
import moment from "moment";

const Checkbox = props => <input type="checkbox" {...props} />;

class SingleSelect extends React.Component<any> {

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


export class Picker extends React.Component<any> {
  state = {
    open: false,
    options: [],
    isLoading: false,
    value: -1,
  };

  handleClickOpen = async () => {
    this.setState({ open: true, isLoading: true });
    const data = (await this.props.fetch() || []); // TODO 임시 에러 처리
    this.setState({ isLoading: false, options: this.compute(data) });
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

export class TextfieldDialog extends React.Component<any, any> {
  state = {
    open: false,
    value: {},
  };

  componentDidMount() {
    if (this.props.value) {
      this.setState({ value: this.props.value });
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true, value: this.props.value || {} });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSelect = () => {
    const { value } = this.state;

    // 하나도 입력된 적이 없을 때 에러
    if (JSON.stringify(value) === "{}") { // TODO 좀더 디테일한 에러 핸들링 필요
      alert(`Value can't be empty`);
      return;
    }

    // 필요한 필드가 다 채워지지 않았을 때
    if (Object.keys(value).length !== this.props.fields.length) {
      alert(`Value can't be empty`);
      return;
    }

    // 필드별 에러헨들링
    const fieldsArray = Object.entries(value); // [["price": 1000], [...],]
    for (const [field, value] of fieldsArray) {
      const isError = this.props.errorHandler[this.props.fields.indexOf(field)] || (x => true); // undefined일 경우

      if (isError(value)) {
        alert(`Invalid value at ${field} field`);
        return;
      }
    };

    this.setState({ open: false, value: {} });
    this.props.onClose(value);
  };

  handleChange = (key) => (e) => {
    const { value } = e.target;
    this.setState(prev => ({
      ...prev,
      value: {
        ...prev.value,
        [key]: value
      }
    })
    )
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
          <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>
          <DialogContent style={{ width: "600px", height: "max-content" }}>
            {this.props.fields.map((field, i) =>
              <TextField
                style={{ marginBottom: "16px" }}
                key={i}
                margin="dense"
                value={this.state.value[field] || ""}
                label={field}
                type={this.props.types[i]}
                placeholder={this.props.placeholders[i]}
                onChange={this.handleChange(field)}
                fullWidth />
            )}
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

export class DatePicker extends React.Component<any, any> {

  state = {
    open: false,
    value: null,
    startTime: "16:30",
    duration: 4,
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
      value: null,
      startTime: "16:30",
      duration: 4
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSelect = () => {
    if (!this.state.value) {
      alert("Select day");
      return;
    }

    const [hour, minute] = this.state.startTime.split(":");
    const day: any = this.state.value;
    const date = moment(day).subtract(12, "h").add(parseInt(hour), "h").add(parseInt(minute), "m").format("YYYY-MM-DD HH:mm:ss");

    this.props.onClose({ to: { date, time: this.state.duration } });
    this.handleClose();
  }

  handleChange = (day: any): any => {
    if (this.props.excludes.some(x => moment(day).isSame(x, "day"))) {
      return;
    }
    this.setState({
      value: day,
    });
  }

  handleStartTimeChange = (e) => {
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
          <DialogTitle id="form-dialog-title">SCHEDULE</DialogTitle>
          <DialogContent style={{ width: "320px", height: "max-content" }}>
            <div>
              <DayPicker
                disabledDays={this.props.excludes.map(x => new Date(x))}
                showOutsideDays
                selectedDays={this.state.value}
                onDayClick={this.handleChange}
              />
              <TextField
                style={{ marginBottom: "16px", display: "flex" }}
                label="Start time"
                type="time"
                variant="outlined"
                defaultValue={this.state.startTime}
                onChange={this.handleStartTimeChange}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300,
                }}
              />
              <Select
                onChange={this.handleDurationChange}
                defaultValue={timeOption[3]}
                isSearchable
                name="duration"
                menuPosition="fixed"
                options={timeOption}
              />
            </div>
            <Helmet>
              <style>{`
                .DayPicker-wrapper {
                  display: block;
                }
                .DayPicker-wrapper, .DayPicker-Day {
                  margin-bottom: 16px;
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

/*

export class SchedulePicker extends React.Component<any> {

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
            <Flex flexDirection="column">
              <Text ml={1} mb={1} mt={2}>
                Duraction
              </Text>
            </Flex>
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
