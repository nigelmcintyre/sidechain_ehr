import React, { Component } from 'react';
import Contract from './contract';
import { ipfs } from './ipfsConfig';
import { get_address, set_address } from './actions';
import { connect } from 'react-redux';
import store from './index';

class UpdatePatient extends Component {
    constructor(props) {
        super(props);

        this.contract = new Contract();
        this.value = 0;

        this.state = {
            patient: '',
            age: '',
            gender: '',
            totalBilirubin: '',
            directBilirubin: '',
            alkalinePhosphotase: '',
            alamineAminotransferase: '',
            totalProteins: '',
            albumin: '',
            albuminGlobulinRatio: '',
        };
    }

    async componentWillMount() {
        await this.contract.loadContract();
        await this.populateFields();
    }

    async populateFields() {
        const patient = await store.getState();
        this.setState({
            age: patient.patientAddressReducer.age,
            gender: patient.patientAddressReducer.gender,
            totalBilirubin: patient.patientAddressReducer.totalBilirubin,
            directBilirubin: patient.patientAddressReducer.directBilirubin,
            alkalinePhosphotase:
                patient.patientAddressReducer.alkalinePhosphotase,
            alamineAminotransferase:
                patient.patientAddressReducer.alamineAminotransferase,
            totalProteins: patient.patientAddressReducer.totalProteins,
            albumin: patient.patientAddressReducer.albumin,
            albuminGlobulinRatio:
                patient.patientAddressReducer.albuminGlobulinRatio,
        });
    }

    onChangeHandler(event) {
        event.preventDefault();

        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    async confirmValue() {
        let patientHash = '';
        let file = '';

        console.log('submitting file to IPFS');
        const data = JSON.stringify({
            patientAddress: this.props.patientAddress.patientAddress,
            age: this.state.age,
            gender: this.state.gender,
            totalBilirubin: this.state.totalBilirubin,
            directBilirubin: this.state.directBilirubin,
            alkalinePhosphotase: this.state.alkalinePhosphotase,
            alamineAminotransferase: this.state.alamineAminotransferase,
            totalProteins: this.state.totalProteins,
            albumin: this.state.albumin,
            albuminGlobulinRatio: this.state.albuminGlobulinRatio,
        });
        await ipfs
            .add(data)
            .then((res) => {
                patientHash = res.path;
                console.log('Patient uploaded to IPFS');
            })
            .catch((err) => {
                console.log(err);
            });

        try {
            const tx = await this.contract.updatePatient(
                this.props.patientAddress.patientAddress,
                patientHash,
            );
            console.log(tx);
            this.props.history.push('/viewPatient');
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
                        <p>{this.props.patientAddress.patientAddress}</p>
                        <label>Name</label>
                        <label>Age</label>
                        <input
                            type="text"
                            name="age"
                            className="form-control"
                            onChange={(event) => this.onChangeHandler(event)}
                            placeholder="Enter patient's age"
                            value={this.state.age}
                        />
                        <label>Gender</label>
                        <input
                            type="text"
                            name="gender"
                            className="form-control"
                            onChange={(event) => this.onChangeHandler(event)}
                            placeholder="Enter patient's gender"
                            value={this.state.gender}
                        />
                        <label>Total Bilirubin</label>
                        <input
                            type="text"
                            name="totalBilirubin"
                            className="form-control"
                            onChange={(event) => this.onChangeHandler(event)}
                            placeholder="Enter patients total bilirubin"
                            value={this.state.totalBilirubin}
                        />
                        <label>Direct Bilirubin</label>
                        <input
                            type="text"
                            name="directBilirubin"
                            className="form-control"
                            onChange={(event) => this.onChangeHandler(event)}
                            placeholder="Enter patients direct bilirubin"
                            value={this.state.directBilirubin}
                        />
                        <label>Alkaline Phosphotase</label>
                        <input
                            type="text"
                            name="alkalinePhosphotase"
                            className="form-control"
                            onChange={(event) => this.onChangeHandler(event)}
                            placeholder="Enter patients alkaline photophotase"
                            value={this.state.alkalinePhosphotase}
                        />
                        <label>Alamine Aminotransferase</label>
                        <input
                            type="text"
                            name="alamineAminotransferase"
                            className="form-control"
                            onChange={(event) => this.onChangeHandler(event)}
                            placeholder="Enter patients alamine aminotransferase"
                            value={this.state.alamineAminotransferase}
                        />
                        <label>Total Proteins</label>
                        <input
                            type="text"
                            name="totalProteins"
                            className="form-control"
                            onChange={(event) => this.onChangeHandler(event)}
                            placeholder="Enter patients total proteins"
                            value={this.state.totalProteins}
                        />
                        <label>Albumin</label>
                        <input
                            type="text"
                            name="albumin"
                            className="form-control"
                            onChange={(event) => this.onChangeHandler(event)}
                            placeholder="Enter patients albumin"
                            value={this.state.albumin}
                        />
                        <label>Albumin Globulin Ratio</label>
                        <input
                            type="text"
                            name="albuminGlobulinRatio"
                            className="form-control"
                            onChange={(event) => this.onChangeHandler(event)}
                            placeholder="Enter patients total albumin globulin ratio"
                            value={this.state.albuminGlobulinRatio}
                        />
                        <label>Doctor Account Address</label>
                        <input
                            type="text"
                            name="doctorAddress"
                            className="form-control"
                            onChange={(event) => this.onChangeHandler(event)}
                            placeholder="Enter doctor's account address"
                            value={this.state.doctorAddress}
                        />
                        <label>Doctor Private Key</label>
                        <input
                            type="text"
                            name="doctorKey"
                            className="form-control"
                            onChange={(event) => this.onChangeHandler(event)}
                            placeholder="Enter doctor's private key"
                            value={this.state.doctorKey}
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
export default connect(mapStateToProps, mapDispatchToProps())(UpdatePatient);
