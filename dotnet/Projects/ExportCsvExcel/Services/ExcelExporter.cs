using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;

namespace ExportCsvExcel.Services
{
    public class ExcelExporter : IExporter
    {
        public async Task<FileResult> ExportAsync(List<String[]> data)
        {
            ExcelPackage.LicenseContext = LicenseContext.Commercial;

            var memoryStream = new MemoryStream();

            using (var package = new ExcelPackage(memoryStream))
            {
                var worksheet = package.Workbook.Worksheets.Add("Sheet1");

                // Write the data to the worksheet
                for (int i = 0; i < data.Count; i++)
                {
                    for (int j = 0; j < data[i].Length; j++)
                    {
                        worksheet.Cells[i + 1, j + 1].Value = data[i][j];
                    }
                }

                Console.WriteLine("Data written to Excel sheet");

                await package.SaveAsync();
            }
            memoryStream.Position = 0;

            return new FileStreamResult(memoryStream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") { FileDownloadName = "export.xlsx" };
        }
    }
}
