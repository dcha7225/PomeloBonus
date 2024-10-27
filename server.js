require("dotenv").config();
const cors = require("cors");
const express = require("express");

const app = express();

/// middleware
app.use(
    cors({
        //allow all requests
        origin: "*",
    })
);

app.use(express.json()); //parse json bodies in the request object

app.use("/payment", require("./routes/paymentRoutes"));
app.use("/txn", require("./routes/txnRoutes"));
app.use("/summarize", require("./routes/summarizeRoutes"));

app.use((err, req, res, next) => {
    //error handler
    console.log(err.stack);
    console.log(err.name);
    console.log(err.code);

    res.status(500).json({
        message: "Something went wrong",
    });
});
/// end of middleware
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
