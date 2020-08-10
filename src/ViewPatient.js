import React, { Component } from 'react';
import Contract from './contract';

class ViewPatient extends Component {
    constructor(props) {
        super(props);

        this.contract = new Contract();
        this.value = 0;

        this.state = {
            doctorAddress: '',
            doctorName: '',
            doctorEmail: '',
            isValid: false,
            isSending: false,
            tx: null,
            tries: 0,
        };
    }

    async componentWillMount() {
        await this.contract.loadContract();
        // this.contract.addEventListener((v) => {
        //     this.setState({ value: v._value });
        // });
    }

    onChangeHandler(event) {
        event.preventDefault();

        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    async deleteClick(e) {
        e.preventDefault();
    }

    async confirmValue() {
        try {
            console.log(this.state.doctorAddress);
            // const tx = await this.contract.newDoctor(
            //     this.state.doctorAddress,
            //     this.state.doctorName,
            //     this.state.doctorEmail,
            // );
            const tx = await this.contract.getDoctor(this.state.doctorAddress);
            console.log(tx);

            this.setState({
                tx,
                doctorAddress: '',
                doctorName: '',
                doctorEmail: '',
            });
        } catch (err) {
            console.error('Ops, some error happen:', err);
        }
    }

    render() {
        return (
            <div className="container" style={{ marginTop: 10 }}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    <div className="form-group">
                        <label>Address</label>
                        <input
                            type="text"
                            name="doctorAddress"
                            className="form-control"
                            onChange={(event) => this.onChangeHandler(event)}
                            value={this.state.doctorAddress}
                        />
                    </div>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => this.confirmValue()}
                    >
                        Confirm
                    </button>
                </form>
                <table>
                    <tbody>
                        <tr>
                            <td>Address</td>
                            <td>
                                {this.state.isPatient
                                    ? this.state.patient.patientAddress
                                    : ''}
                            </td>
                        </tr>
                        <tr>
                            <td>Age</td>
                            <td>
                                {this.state.isPatient
                                    ? this.state.patient.age
                                    : ''}
                            </td>
                        </tr>
                        <tr>
                            <td>Gender</td>
                            <td>
                                {this.state.isPatient
                                    ? this.state.patient.gender
                                    : ''}
                            </td>
                        </tr>
                        <tr>
                            <td>Total Bilirubin</td>
                            <td>
                                {this.state.isPatient
                                    ? this.state.patient.totalBilirubin
                                    : ''}
                            </td>
                        </tr>
                        <tr>
                            <td>Direct Bilirubin</td>
                            <td>
                                {this.state.isPatient
                                    ? this.state.patient.directBilirubin
                                    : ''}
                            </td>
                        </tr>
                        <tr>
                            <td>Alkaline Phosphotase</td>
                            <td>
                                {this.state.isPatient
                                    ? this.state.patient.alkalinePhosphotase
                                    : ''}
                            </td>
                        </tr>
                        <tr>
                            <td>Alamine Aminotransferase</td>
                            <td>
                                {this.state.isPatient
                                    ? this.state.patient.alamineAminotransferase
                                    : ''}
                            </td>
                        </tr>
                        <tr>
                            <td>Total Proteins</td>
                            <td>
                                {this.state.isPatient
                                    ? this.state.patient.totalProteins
                                    : ''}
                            </td>
                        </tr>
                        <tr>
                            <td>Albumin</td>
                            <td>
                                {this.state.isPatient
                                    ? this.state.patient.albumin
                                    : ''}
                            </td>
                        </tr>
                        <tr>
                            <td>Albumin Globulin Ratio</td>
                            <td>
                                {this.state.isPatient
                                    ? this.state.patient.albuminGlobulinRatio
                                    : ''}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => this.updateClick()}
                >
                    Update
                </button>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => this.deleteClick()}
                >
                    Delete
                </button>
            </div>
        );
    }
}

export default ViewPatient;
