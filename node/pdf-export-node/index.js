const express = require("express");
const puppeteer = require("puppeteer");
const port = 8000;
const app = express();

app.use(express.text({ limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.post("/pdf", async (req, res) => {
  let htmlContent;
  const contentType = req.headers["content-type"];

  if (contentType?.includes("application/json")) {
    htmlContent = req.body.html;
  } else {
    htmlContent = req.body;
  }

  if (!htmlContent) {
    res.status(400).end("Invalid HTML content");
  }

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
    });

    const newPage = await browser.newPage();
    await newPage.setContent(htmlContent, {
      waitUntil: "networkidle0",
    });

    const pdfBuffer = await newPage.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "20mm", right: "20mm", bottom: "20mm", left: "20mm" },
    });

    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'application;filename="converted-pdf.pdf"'
    );

    res.status(200).end(pdfBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).end("Error in generating the pdf");
  }
});

app.listen(port, () => {
  console.log(`Server is listening on the port ${port}...`);
});
