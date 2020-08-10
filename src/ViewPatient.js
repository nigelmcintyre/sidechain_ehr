import React, { Component } from 'react';
import Contract from './contract';
import { set_address, get_address } from './actions';
import { connect } from 'react-redux';

class ViewPatient extends Component {
    constructor(props) {
        super(props);

        this.contract = new Contract();
        this.value = 0;

        this.state = {
            patientAddress: '',
            patient: '',
            retrievedAddress: '',
            age: '',
            gender: '',
            totalBilirubin: '',
            directBilirubin: '',
            alkalinePhosphotase: '',
            alamineAminotransferase: '',
            totalProteins: '',
            albumin: '',
            albuminGlobulinRatio: '',
            isPatient: false,
            deletePatientAddress: '',
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

    async updateClick() {
        // Add patient address to redux state object
        if (this.state.patient) {
            this.props.set_address(this.state.patient);
            // Open update patient page
            this.props.history.push('/updatePatient');
        } else {
            window.alert('Please search for a patient');
        }
    }

    async deleteClick() {
        if (this.state.patientAddress) {
            // Checking if address belongs to a doctor account
            const isDoctor = await this.contract.getDoctor(
                this.state.patientAddress,
            );
            // If address doesnt belong to a doctor
            if (!isDoctor) {
                // Getting patient details from blockchain
                const isPatient = await this.contract.getPatient(
                    this.state.patientAddress,
                );
                // If patient exists
                if (isPatient) {
                    // Clear input
                    this.setState({ patientAddress: '' });
                    // Delete patient from blockchain
                    await this.contract.deletePatient(isPatient[0]);
                } else {
                    this.setState({ patientAddress: '' });
                    window.alert('Patient does not exist');
                }
            } else {
                window.alert('Address belongs to a Doctor account');
            }

            // Allows for patient to be deleted if submit has been clicked
        } else if (this.state.patient.patientAddress) {
            this.contract.deletePatient(this.state.patient.patientAddress);
            this.setState({
                patient: '',
            });
        } else {
            window.alert('Please enter a patient account address');
        }
    }

    async confirmValue() {
        this.setState({
            isPatient: false,
        });
        // If address input field is not empty
        if (this.state.patientAddress) {
            // Retrieving patient from blockchain
            try {
                const tx = await this.contract.getPatient(
                    this.state.patientAddress,
                );
                this.state.patient = tx;
            } catch (err) {
                console.log(err);
            }

            // Retrieving patient reccord from IPFS
            if (this.state.patient) {
                const result = await fetch(
                    `https://ipfs.infura.io/ipfs/${this.state.patient[1]}`,
                ).catch((error) => {
                    window.alert('Error retrieving patient reccord from IPFS');
                    console.log(error);
                });
                const IPFSpatient = await result.json();
                this.setState({
                    patient: IPFSpatient,
                    patientAddress: '',
                    isPatient: true,
                });
            } else {
                this.setState({ patientAddress: '' });
                window.alert('No patient account with that address');
            }
        } else {
            window.alert('Please enter a patient account address');
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
                            name="patientAddress"
                            className="form-control"
                            onChange={(event) => this.onChangeHandler(event)}
                            value={this.state.patientAddress}
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

const mapStateToProps = (state) => {
    return {
        patientAddress: state.patientAddressReducer,
    };
};

const mapDispatchToProps = () => {
    return { set_address, get_address };
};
export default connect(mapStateToProps, mapDispatchToProps())(ViewPatient);
