// server.js
require("dotenv").config();
const express = require("express");
const supa = require("@supabase/supabase-js");
const { sendResponse } = require("./sendResponse");
const app = express();

const PORT = process.env.PORT || 8080;

const supaUrl = process.env.SUPABASE_URL;
const supaAnonKey = process.env.SUPABASE_ANON_KEY;
const supabase = supa.createClient(supaUrl, supaAnonKey);

app.use(require("./routes/eras")(supabase, sendResponse));
app.use(require("./routes/galleries")(supabase, sendResponse));
app.use(require("./routes/artists")(supabase, sendResponse));
app.use(require("./routes/paintings")(supabase, sendResponse));
app.use(require("./routes/genres")(supabase, sendResponse));
app.use(require("./routes/counts")(supabase, sendResponse));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
