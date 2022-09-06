import React, { useRef, useState } from "react";

const ModalComponent = (props) => {
    const [validInput, setValidInput] = useState(false);
    const [clientName, setClientName] = useState();
    const [totalAmount, setTotalAmount] = useState();
    const totalAmountRef = useRef();
    const clientNameRef = useRef();

    const amountInputHandler = (e) => {
        setTotalAmount(e.target.value);
        setValidInput(e.target.value && clientName);
    };
    const nameInputHandler = (e) => {
        setClientName(e.target.value);
        setValidInput(e.target.value && totalAmount);
    };
    const resetInputs = () => {
        totalAmountRef.current.value = null;
        clientNameRef.current.value = null;
        setValidInput(false);
    };
    const saveHandler = async () => {
        resetInputs();
        props.addNewTransaction(clientName, totalAmount);
    };

    return <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
    >
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                        Nueva Transacción
                    </h5>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="inputName" className="form-label">
                                Nombre
                            </label>
                            <input
                                className="form-control"
                                id="inputName"
                                aria-describedby="Ingresa el nombre"
                                onChange={nameInputHandler}
                                ref={clientNameRef}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputAmount" className="form-label">
                                Monto
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="inputAmount"
                                aria-describedby="Ingresa el monto"
                                onChange={amountInputHandler}
                                ref={totalAmountRef}
                            />
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                    >
                        Cerrar
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={saveHandler}
                        data-bs-dismiss="modal"
                        disabled={!validInput}
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    </div>
};
export default ModalComponent;