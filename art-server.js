const express = require("express");
const supa = require("@supabase/supabase-js");
const app = express();

const supaUrl = "https://sfvihxfzaqgavtycqrui.supabase.co";
const supaAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNmdmloeGZ6YXFnYXZ0eWNxcnVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAxNjc1MDMsImV4cCI6MjA1NTc0MzUwM30.XFmoYT2gEaWYssnKp260crQ3Bsxingxqz8dXiqUbddc";

const supabase = supa.createClient(supaUrl, supaAnonKey);

app.get("/api/eras", async (req, res) => {
  const { data, error } = await supabase.from("eras").select();
  res.send(data);
});

app.get("/api/galleries", async (req, res) => {
  const { data, error } = await supabase.from("galleries").select();
  res.send(data);
});

app.get("/api/galleries/:gallery", async (req, res) => {
  const { data, error } = await supabase
    .from("galleries")
    .select()
    .eq("galleryId", req.params.gallery);
  res.send(data);
});

app.get("/api/galleries/country/:country", async (req, res) => {
  const { data, error } = await supabase
    .from("galleries")
    .select()
    .ilike("galleryCountry", `${req.params.country}%`);
  res.send(data);
});

app.get("/api/artists", async (req, res) => {
  const { data, error } = await supabase.from("artists").select();
  res.send(data);
});

app.get("/api/artists/:artists", async (req, res) => {
  const { data, error } = await supabase
    .from("artists")
    .select()
    .eq("artistId", req.params.artists);
  res.send(data);
});

app.get("/api/artists/search/:lastName", async (req, res) => {
  const { data, error } = await supabase
    .from("artists")
    .select()
    .ilike("lastName", `${req.params.lastName}%`);
  res.send(data);
});

app.get("/api/artists/country/:nationality", async (req, res) => {
  const { data, error } = await supabase
    .from("artists")
    .select()
    .ilike("nationality", `${req.params.nationality}%`);
  res.send(data);
});

// NOT TOO SURE HERE
app.get("/api/paintings", async (req, res) => {
  const { data, error } = await supabase
    .from("paintings")
    .select()
    .order("title", { ascending: true });
  res.send(data);
});

// NOT SURE ABOUT SEARING FOR EITHER TITLE OR YEAR



app.listen(8080, () => {
  console.log("TEEHEE");
});
