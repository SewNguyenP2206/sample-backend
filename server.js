const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ message: 'Hello from sample-backend', version: process.env.APP_VERSION || 'v1' });
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// test auto trigger jenkins Mon Sep 21 11:43:07 +07 2026
// test auto trigger jenkins Mon Sep 21 11:51:40 +07 2026
// test multibranch trigger
// test multibranch trigger
// test multibranch trigger
// test multibranch trigger
// test multibranch trigger
// clean retest 1789984477
// clean retest 1789984580
// clean retest 1789984955
// cXXXXXXXXXXXXXXXX
// test after fixing owner+credentials
// test after fixing owner+credentials
// test after fixing owner+credentials
// debug trigger 1789985374
// debug trigger 1789986134
