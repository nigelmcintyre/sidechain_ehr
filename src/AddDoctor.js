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

    onChangeHandler(event) {
        event.preventDefault();

        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    async confirmValue() {
        try {
            console.log(this.state.doctorAddress);
            // const tx = await this.contract.newDoctor(
            //     this.state.doctorAddress,
            //     this.state.doctorName,
            //     this.state.doctorEmail,
            // );
            const tx = await this.contract.getPatient(this.state.doctorAddress);
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
