import React, { Component } from 'react';
import Contract from './contract';

class AddDoctor extends Component {
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
    clearInput() {
        this.setState({
            doctorAddress: '',
            doctorName: '',
            doctorEmail: '',
        });
    }

    onChangeHandler(event) {
        event.preventDefault();

        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    async confirmValue() {
        if (this.state.doctorAddress) {
            const isPatient = await this.contract.getPatient(
                this.state.doctorAddress,
            );

            console.log(isPatient);

            const isDoctor = await this.contract.getDoctor(
                this.state.doctorAddress,
            );
            console.log(isDoctor);

            if (!isPatient && !isDoctor) {
                let address = this.state.doctorAddress;
                let name = this.state.doctorName;
                let email = this.state.doctorEmail;
                this.clearInput();
                await this.contract.newDoctor(address, name, email);
            } else {
                window.alert('This address already belongs to an account');
                this.clearInput();
            }
        } else {
            window.alert('Please enter doctor details');
            this.clearInput();
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
                        <label>Name</label>
                        <input
                            type="text"
                            name="doctorName"
                            className="form-control"
                            onChange={(event) => this.onChangeHandler(event)}
                            value={this.state.doctorName}
                        />
                        <label>Email</label>
                        <input
                            type="text"
                            name="doctorEmail"
                            className="form-control"
                            onChange={(event) => this.onChangeHandler(event)}
                            value={this.state.doctorEmail}
                        />
                    </div>
                    <button
                        type="button"
                        className="btn btn-primary"
                        name="button"
                        onClick={() => this.confirmValue()}
                    >
                        Confirm
                    </button>
                </form>
            </div>
        );
    }
}

export default AddDoctor;
