import { Client, LoomProvider } from 'loom-js';
import BN from 'bn.js';
import Web3 from 'web3';
import Ehr from './contracts/Ehr.json';
import { B64ToUint8Array } from 'loom-js/dist/crypto-utils';

export default class Contract {
    async loadContract() {
        this._createClient();
        this._createWebInstance();
        await this._createContractInstance();
    }

    _createClient() {
        let writeUrl = 'ws://127.0.0.1:46658/websocket';
        let readUrl = 'ws://127.0.0.1:46658/queryws';
        let networkId = 'default';

        this.client = new Client(networkId, writeUrl, readUrl);
    }
    _createWebInstance() {
        this.privateKey = B64ToUint8Array(
            'iA9DHGmcfyZpQyKvFohFRJcgAu3TYlhF2aP9e+XHETOZ0850Q8Lyq6MXHoVDW+QmJqQ8p5ttUJfSXyjJ8daHCA==',
        );
        this.web3 = new Web3(new LoomProvider(this.client, this.privateKey));
    }

    async _createContractInstance() {
        const networkId = await this._getCurrentNetwork();
        this.currentNetwork = Ehr.networks[networkId];
        if (!this.currentNetwork) {
            throw Error('Contract not deployed on DAppChain');
        }
        this.currentUserAddress = await this.web3.eth.getAccounts();
        console.log(this.currentUserAddress[0]);
        const ABI = Ehr.abi;
        this.ehrInstance = new this.web3.eth.Contract(
            ABI,
            this.currentNetwork.address,
            {
                from: this.currentUserAddress[0],
            },
        );
        console.log(this.ehrInstance);
    }

    _getCurrentNetwork() {
        const web3 = new Web3();
        const chainIdHash = web3.utils
            .soliditySha3(this.client.chainId)
            .slice(2) // Removes 0x
            .slice(0, 13); // Produces safe Number less than 9007199254740991
        const chainId = new BN(chainIdHash).toString();
        return chainId;
    }

    async newDoctor(address, name, email) {
        return await this.ehrInstance.methods
            .newDoctor(address, name, email)
            .send({
                from: this.currentUserAddress[0],
            })
            .then((res) => {
                console.log(res);
                window.alert('Doctor successfully created');
            })
            .catch((err) => {
                console.log(err);
                window.alert('An error occured adding a new doctor');
            });
    }

    async newPatient(address, hash, doctorAddress) {
        console.log(doctorAddress);
        return await this.ehrInstance.methods
            .newPatient(address, hash)
            .send({ from: this.currentUserAddress[0] })
            .then((res) => {
                console.log(res);
                window.alert('Patient successfully created');
            })
            .catch((err) => {
                console.log(err);
                window.alert('Error creating patient record');
            });
    }

    async getDoctor(address) {
        return await this.ehrInstance.methods
            .getDoctor(address)
            .call({ from: this.currentUserAddress[0] })
            .catch((err) => {
                console.log(err);
            });
    }

    async getPatient(address) {
        return await this.ehrInstance.methods
            .getPatient(address)
            .call({ from: this.currentUserAddress[0] })
            .catch((err) => {
                console.log(err);
            });
    }

    async deletePatient(address) {
        return await this.ehrInstance.methods
            .destroyPatient(address)
            .send({ from: this.currentUserAddress[0] })
            .then((res) => {
                console.log(res);
                window.alert('Patient successfully deleted');
            })
            .catch((err) => {
                console.log(err);
            });
    }
}
