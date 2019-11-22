import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import SubmissionRow from '../Components/SubmissionRow';
import moment from 'moment';
import '../CSS/Home.css'
import '../CSS/SubmissionTable.css';
import '../CSS/bootstrap/css/bootstrap-iso.css';
import AddCircle from '@material-ui/icons/Add';
import Delete from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';


class ApprovalTable extends React.Component {
  constructor(props){
    super(props);
    // this.ticket_numbers = [1, 2];
    this.timesheetErrorRef = React.createRef();
    this.state = {
      timesheet_ticket_numbers: [1],
      expense_ticket_numbers: [1],
      firstDay: moment(),
      timesheet_rows: [['','','','','','','']],
      expense_rows: [['','','','','','','']],
      timesheet_cols: ['','','','','','',''],
      expense_cols: ['','','','','','',''],
      timesheet_projects: [''],
      expense_projects: [''],
      timesheet_error: '',
      expense_error: ''
    };
    this.onCellChange = this.onCellChange.bind(this)
    this.isFloat = this.isFloat.bind(this);
    this.onError = this.onError.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  isFloat(value) {
    return !isNaN(value) &&
        parseFloat(Number(value)) == value &&
        !isNaN(parseFloat(value, 10));
  }

  onError(type, message){
    if (type === 'timesheet'){
      this.setState({timesheet_error: message});
    } else if(type === 'expense'){
      this.setState({expense_error: message});
    }
  }
  onCellChange(type, row, col, value){
    if (type === 'timesheet') {
      if (col === 'project') {
        let timesheet_projects = this.state.timesheet_projects;
        timesheet_projects[row] = value;
        this.setState({timesheet_projects});
        return;
      }
      if (value && !this.isFloat(value)) {
        this.onError("timesheet"," ❌ Please enter a number!");
        return;
      } else {
        this.onError("timesheet", "");
      }
      let timesheet_rows = this.state.timesheet_rows;
      timesheet_rows[row][col] = value;
      this.setState({timesheet_rows});

      let sum = 0.0;
      for (let i = 0; i < timesheet_rows.length; i++) {
        if (timesheet_rows[i][col] !== '') {
          sum += parseFloat(timesheet_rows[i][col]);
        }
      }
      if (sum === 0) {
        sum = '';
      }
      let timesheet_cols = this.state.timesheet_cols;
      timesheet_cols[col] = sum;
      this.setState({timesheet_cols: timesheet_cols});


    } else if (type === 'expense'){
      console.log(row, col, value);
      if (col === 'project') {
        let expense_projects = this.state.expense_projects;
        expense_projects[row] = value;
        this.setState({expense_projects});
        return;
      }
      if (value && !this.isFloat(value)) {
        this.onError("expense", " ❌ Please enter a number!");
        return;
      } else {
        this.onError("expense", "");
      }
      let expense_rows = this.state.expense_rows;
      expense_rows[row][col] = value;
      this.setState({expense_rows});

      console.log(expense_rows);
      let sum = 0.0;
      for (let i = 0; i < expense_rows.length; i++) {
        if (expense_rows[i][col] !== '') {
          sum += parseFloat(expense_rows[i][col]);
        }
      }
      if (sum === 0) {
        sum = '';
      }
      let expense_cols = this.state.expense_cols;
      expense_cols[col] = sum;
      this.setState({expense_cols: expense_cols});
    }
  }

  handleSubmit(type){
    if(type === "timesheet"){
      const { timesheet_ticket_numbers } = this.state
      const newTicketNumber = timesheet_ticket_numbers[timesheet_ticket_numbers.length - 1] + 1
      this.setState({
        timesheet_ticket_numbers: [newTicketNumber],
        timesheet_rows: [['','','','','','','']],
        timesheet_cols: ['','','','','','',''],
      })
      this.onError("timesheet"," ✅ Submit successful!");
      setTimeout(() => {
        this.onError("timesheet","")
      },2000)
    } else if(type == "expense"){

    }
  }

  addRow(option){
    if (option === 'timesheet'){
      let {timesheet_ticket_numbers} = this.state;
      timesheet_ticket_numbers.push(timesheet_ticket_numbers.length + 1);
      this.setState({timesheet_ticket_numbers});

      let {timesheet_rows} = this.state;
      timesheet_rows.push(['','','','','','','']);
      this.setState({timesheet_rows});

      let {timesheet_projects} = this.state;
      timesheet_projects.push("");
      this.setState({timesheet_projects});

    } else if (option === 'expense') {
      let {expense_ticket_numbers} = this.state;
      expense_ticket_numbers.push(expense_ticket_numbers.length + 1);
      this.setState({expense_ticket_numbers});

      let {expense_rows} = this.state;
      expense_rows.push(['','','','','','','']);
      this.setState({expense_rows});

      let {expense_projects} = this.state;
      expense_projects.push("");
      this.setState({expense_projects});
    }
  }

  deleteRow(option){
    if (option === 'timesheet') {
      let {timesheet_ticket_numbers} = this.state;
      timesheet_ticket_numbers.pop();
      this.setState({timesheet_ticket_numbers});

      let {timesheet_rows} = this.state;
      timesheet_rows.pop();
      this.setState({timesheet_rows});
    } else if (option === 'expense') {
      let {expense_ticket_numbers} = this.state;
      expense_ticket_numbers.pop();
      this.setState({expense_ticket_numbers});


      let {expense_rows} = this.state;
      expense_rows.pop();
      this.setState({expense_rows});

    }
  }

  render(){
    // const ticket_numbers = [1];
    const { firstDay } = this.props;
    const timesheetFirstDay = moment(firstDay);
    const expenseFirstDay = moment(firstDay);
    return (
        <div>
          <div className='outer_box'>
            <p className='title'>Time Sheet Approval</p>

            <div class="submissionSection bootstrap-iso">
            <Table bordered>
              <thead>
              <tr>
                <td className="information">Ticket ID</td>
                <td className="information">Input Timesheet</td>
                <td className="date">{timesheetFirstDay.date()}</td>
                <td className="date">{timesheetFirstDay.add(1, 'day').date()}</td>
                <td className="date">{timesheetFirstDay.add(1, 'day').date()}</td>
                <td className="date">{timesheetFirstDay.add(1, 'day').date()}</td>
                <td className="date">{timesheetFirstDay.add(1, 'day').date()}</td>
                <td className="date">{timesheetFirstDay.add(1, 'day').date()}</td>
                <td className="date">{timesheetFirstDay.add(1, 'day').date()}</td>
              </tr>
              </thead>
              <tbody>
              {this.state.timesheet_ticket_numbers.map(ticket_number => (
                  <SubmissionRow onCellChange={this.onCellChange.bind(this, 'timesheet', ticket_number - 1)} ticket_number={ticket_number} key={ticket_number}/>
              ))}
              <tr>
                <td>
                  <IconButton onClick={this.addRow.bind(this,'timesheet')} aria-label="delete" size="small">
                    <AddCircle color='primary' fontSize="inherit" />
                  </IconButton>
                  <IconButton onClick={this.deleteRow.bind(this, 'timesheet')} aria-label="delete" size="small">
                    <Delete color='primary' fontSize="inherit" />
                  </IconButton>
                </td>
                <td>Total Hour</td>
                <td>{this.state.timesheet_cols[0]}</td>
                <td>{this.state.timesheet_cols[1]}</td>
                <td>{this.state.timesheet_cols[2]}</td>
                <td>{this.state.timesheet_cols[3]}</td>
                <td>{this.state.timesheet_cols[4]}</td>
                <td>{this.state.timesheet_cols[5]}</td>
                <td>{this.state.timesheet_cols[6]}</td>
              </tr>
              </tbody>
            </Table>
              <div className='row'>
                <div className='buttons'>
                  <button type="button" className="btn btn-success col">Approve</button>
                  <button type="button" className="btn btn-danger col" >Return</button></div>
              </div>
            <div className="error_message">
              <p> {this.state.timesheet_error}</p>
            </div>
          </div>

          </div>
          <div className='outer_box'>
            <p className='title'>Expense Approval</p>
            <div className="submissionSection bootstrap-iso">
              <Table bordered>
                <thead>
                <tr>
                  <td className="information">Ticket ID</td>
                  <td className="information">Input Expense</td>
                  <td className="date">{expenseFirstDay.date()}</td>
                  <td className="date">{expenseFirstDay.add(1, 'day').date()}</td>
                  <td className="date">{expenseFirstDay.add(1, 'day').date()}</td>
                  <td className="date">{expenseFirstDay.add(1, 'day').date()}</td>
                  <td className="date">{expenseFirstDay.add(1, 'day').date()}</td>
                  <td className="date">{expenseFirstDay.add(1, 'day').date()}</td>
                  <td className="date">{expenseFirstDay.add(1, 'day').date()}</td>
                </tr>
                </thead>
                <tbody>
                {this.state.expense_ticket_numbers.map(ticket_number => (
                    <SubmissionRow onCellChange={this.onCellChange.bind(this, 'expense', ticket_number - 1)} ticket_number={ticket_number} key={ticket_number}/>
                ))}
                <tr>
                  <td>
                    <IconButton onClick={this.addRow.bind(this, 'expense')} aria-label="delete" size="small">
                      <AddCircle color='primary' fontSize="inherit"/>
                    </IconButton>
                    <IconButton onClick={this.deleteRow.bind(this, 'expense')} aria-label="delete" size="small">
                      <Delete color='primary' fontSize="inherit"/>
                    </IconButton>
                  </td>
                  <td>Total Expense</td>
                  <td>{this.state.expense_cols[0]}</td>
                  <td>{this.state.expense_cols[1]}</td>
                  <td>{this.state.expense_cols[2]}</td>
                  <td>{this.state.expense_cols[3]}</td>
                  <td>{this.state.expense_cols[4]}</td>
                  <td>{this.state.expense_cols[5]}</td>
                  <td>{this.state.expense_cols[6]}</td>
                </tr>
                </tbody>
              </Table>
              <div className='row'>
                <div className='buttons'>
                  <button type="button" className="btn btn-success col">Approve</button>
                  <button type="button" className="btn btn-danger col" >Return</button></div>
              </div>
              <div className="error_message">
                <p>{this.state.expense_error}</p>
              </div>
            </div>
          </div>

          <div className='outer_box'>
            <p className='title'>Invoice Approval</p>
            <div className="submissionSection bootstrap-iso">
              <form className="form-inline">
                <div className="form-group row col-sm-6">
                  <label htmlFor="month" className="col-sm-3 col-form-label ">Month</label>
                  <div className="col-sm-3">
                    <input type="text" className="form-control small-input" id="month"/>
                  </div>
                </div>
                <div className="form-group row col-sm-6">
                  <label htmlFor="invoice_no" className="col-sm-4 col-form-label">Invoice Number</label>
                  <div className="col-sm-2">
                    <input type="text" className="form-control small-input" id="invoice_no"/>
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="total_days" className='col-sm-6 col-form-label'>Total Days in the invoice:</label>
                  <input type="text" className="form-control col-sm-6" id="total_dyas"/>
                </div>

                <div className="form-group row">
                  <label htmlFor="total_amount" className='col-sm-6 col-form-label'>Total Amount Submitted:</label>
                  <input type="text" className="form-control col-sm-6" id="total_amount"/>
                </div>

                <div className="form-group row">
                  <label htmlFor="service" className='col-sm-6 col-form-label'>Nature of Services Provided:</label>
                  <input type="text" className="form-control col-sm-6" id="service"/>
                </div>
              </form>

              <div className='row'>
                <div className='buttons'>
                  <button type="button" className="btn btn-success col">Approve</button>
                  <button type="button" className="btn btn-danger col" >Return</button></div>
              </div>
              <div className="error_message">
                <p>{this.state.expense_error}</p>
              </div>
            </div>
          </div>
        </div>


    );
  }
};

ApprovalTable.propTypes = {
  firstDay: PropTypes.instanceOf(moment).isRequired
};
export default ApprovalTable;