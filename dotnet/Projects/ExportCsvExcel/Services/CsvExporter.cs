using System.Globalization;
using CsvHelper;
using Microsoft.AspNetCore.Mvc;

namespace ExportCsvExcel.Services
{
    public class CsvExporter : IExporter
    {
        public async Task<FileResult> ExportAsync(List<string[]> data)
        {
            var memoryStream = new MemoryStream();
            var writer = new StreamWriter(memoryStream, leaveOpen: true); // Set leaveOpen to true to keep stream open for later use
            var csv = new CsvWriter(writer, CultureInfo.InvariantCulture);

            // Write the rows
            foreach (var row in data)
            {
                foreach (var field in row)
                {
                    csv.WriteField(field);
                }
                await csv.NextRecordAsync(); // Move to the next record after each row
            }

            await writer.FlushAsync();
            memoryStream.Position = 0; // Ensure the stream is at the start

            return new FileStreamResult(memoryStream, "text/csv") { FileDownloadName = "export.csv" };
    }
    }
}
