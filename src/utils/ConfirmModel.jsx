import Modal from "react-modal";

const customStyles = {
  content: {
    width: "500px",
    height: "200px",
    margin: "auto",
    background: "#ffffff",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    padding: "20px",
    textAlign: "center",
  },
  overlay: {
    background: "rgba(0, 0, 0, 0.895)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: "1000",
  },
};
const ConfirmationModal = ({ message, isOpen, onClose, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <h2 style={{ fontSize: "22px", marginBottom: "40px", color: "#333" }}>
        {message}
      </h2>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <button
          style={{
            background: "#007bff",
            color: "#fff",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
            margin: "0 5px",
          }}
          onClick={onConfirm}
        >
          Confirm
        </button>
        <button
          style={{
            background: "#f50000",
            color: "#fff",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
            margin: "0 5px",
          }}
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
