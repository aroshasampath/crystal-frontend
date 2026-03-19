export default function ProductCart() {
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#f5f5f5"
        }}>
            <div style={{
                padding: "30px",
                borderRadius: "12px",
                backgroundColor: "#ffffff",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                textAlign: "center"
            }}>
                <h1 style={{
                    margin: 0,
                    fontSize: "28px",
                    color: "#333"
                }}>
                    🛒 Product Cart
                </h1>
                <p style={{
                    marginTop: "10px",
                    color: "#777"
                }}>
                    Your selected products will appear here
                </p>
            </div>
        </div>
    );
}