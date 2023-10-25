const SessionExpiredMsg = ({ closeToast }) => {
  return (
    <>
      <p style={{textAlign: "center"}}>Your session has expired. Please log in again to continue using the app.</p>
      <button 
        onClick={closeToast}
        style={{
          cursor: "pointer",
          border: "none",
          padding: "5px 10px",
          borderRadius: "3px",
          position: "relative",
          left: "50%",
          transform: "translateX(-50%)",
          marginTop: "20px"
        }}
      >
        Log in
      </button>
    </>
  )
}

export default SessionExpiredMsg