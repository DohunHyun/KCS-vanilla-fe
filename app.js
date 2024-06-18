const express = require("express");
const communityRoutes = require("./routes/communityRoutes"); 

const app = express();
const port = 3000;

app.use(express.static( `${__dirname}/public`));

app.use(communityRoutes);

app.listen(port, () => {
    console.log(`Community app listening on port ${port}`);
});

