import React, { useEffect, useState } from "react";
import ModalComponent from "./ModalComponent";

const apiUrl = "http://192.168.122.168:8080";

const TransactionComponent = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState([]);

    const getTransactions = async () => {
        setIsLoading(true);
        fetch(apiUrl+'/api/v1/transaction')
            .then(async response => {
                const data = await response.json();
                if (!response.ok) console.error('There was an error!', response.body);
                else setTransactions(data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
        setIsLoading(false);
    };
    useEffect(() => {
        getTransactions();
    }, []);

    const addNewTransaction = (clientName, totalAmount) => {
        setIsLoading(true);
        const requestBody = { clientName, totalAmount };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        };
        fetch(apiUrl+'/api/v1/transaction', requestOptions)
            .then(async response => {
                if (!response.ok) console.error('There was an error!', response.body);
                else setTimeout(getTransactions, 200);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
        setIsLoading(false);
    };
    return <React.Fragment>
        <div className="row text-center">
            <div className="col-3"></div>
            <div className="col-6">
                <h2>Transacciones</h2>
            </div>
            <div className="col-3"></div>
        </div>
        <div className="row">
            <div className="col-3"></div>
            <div className="col-6">
                <button
                    type="button"
                    className="btn btn-success"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                >
                    Nueva
                </button>
            </div>
            <div className="col-3"> </div>
        </div>
        <div className="row">
            <div className="col-3"></div>
            <div className="col-6">
                {isLoading && (
                    <div className="spinner-border text-secondary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                )}
                {!isLoading && (
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Nombre del Cliente</th>
                                <th scope="col">Monto</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((trans, id) => {
                                return (
                                    <tr key={id}>
                                        <td>{trans.clientName}</td>
                                        <td>${trans.totalAmount}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
            <div className="col-3"></div>
        </div>
        <ModalComponent addNewTransaction={addNewTransaction} />

    </React.Fragment>
};
export default TransactionComponent;