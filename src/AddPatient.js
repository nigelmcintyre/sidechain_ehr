import React, { Component } from 'react';
import Contract from './contract';
import { ipfs } from './ipfsConfig';

class AddPatient extends Component {
    constructor(props) {
        super(props);

        this.contract = new Contract();
        this.value = 0;

        this.state = {
            patientAddress: '',
            age: '',
            gender: '',
            totalBilirubin: '',
            directBilirubin: '',
            alkalinePhosphotase: '',
            alamineAminotransferase: '',
            totalProteins: '',
            albumin: '',
            albuminGlobulinRatio: '',

            doctorAddress: '',
            doctorKey: '',
        };
    }

    async componentWillMount() {
        await this.contract.loadContract();
        // this.contract.addEventListener((v) => {
        //     this.setState({ value: v._value });
        // });
    }

    clearInput() {
        this.setState({
            patientAddress: '',
            age: '',
            gender: '',
            totalBilirubin: '',
            directBilirubin: '',
            alkalinePhosphotase: '',
            alamineAminotransferase: '',
            totalProteins: '',
            albumin: '',
            albuminGlobulinRatio: '',

            doctorAddress: '',
            doctorKey: '',
        });
    }

    onChangeHandler(event) {
        event.preventDefault();

        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    async confirmValue() {
        let file = '';
        let patientHash = '';
        if (this.state.patientAddress) {
            // Checking if address belongs to a patient account
            const isPatient = await this.contract.getPatient(
                this.state.patientAddress,
            );
            console.log('patient:' + isPatient);
            // Checking if address belongs to doctor account
            const isDoctor = await this.contract.getDoctor(
                this.state.patientAddress,
            );
            console.log('doctor:' + isDoctor);

            // If address doesn't belong to an account

            console.log('submitting file to IPFS');
            let address = this.state.patientAddress;
            let doctorAddress = this.state.doctorAddress;
            let doctorKey = this.state.doctorKey;

            const data = JSON.stringify({
                patientAddress: this.state.patientAddress,
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
            // Adding patient record to IPFS
            await ipfs.add(data).then((res) => {
                patientHash = res.path;
                console.log(patientHash);
                console.log('Patient uploaded to IPFS');
            });

            this.clearInput();
            // Adding patient record to blockchain
            console.log('Adding patient to blockchain');
            await this.contract.newPatient(address, patientHash, doctorAddress);
        } else {
            window.alert('Please enter patient details');
            this.clearInput();
        }
        this.clearInput();
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
                        <label>Patient Address</label>
                        <input
                            type="text"
                            name="patientAddress"
                            className="form-control"
                            onChange={(event) => this.onChangeHandler(event)}
                            placeholder="Enter patient's account address"
                            value={this.state.patientAddress}
                        />
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

export default AddPatient;
