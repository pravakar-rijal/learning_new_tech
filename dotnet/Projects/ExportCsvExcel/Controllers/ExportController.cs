using System.Text.Json;
using ExportCsvExcel.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace ExportCsvExcel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExportController : ControllerBase
    {
        private readonly CsvExporter _csvExporter;
        private readonly ExcelExporter _excelExporter;

        public ExportController()
        {
            _csvExporter = new CsvExporter();
            _excelExporter = new ExcelExporter();
        }
       
        [HttpPost("csv")]
        public async Task<IActionResult> ExportCsv([FromBody] JsonElement jsonData)
        {
            try
            {
                // Deserialize using Newtonsoft.Json
                var data = JsonConvert.DeserializeObject<List<string[]>>(jsonData.ToString());

                if (data == null)
                {
                    return BadRequest("Send appropriate data");
                }

                // Export to CSV
                var result = await _csvExporter.ExportAsync(data);
                return result;
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("excel")]
        public async Task<IActionResult> ExportExcel([FromBody] JsonElement jsonData)
        {
            try
            {
                // Deserialize to List<string[]>
                var data = JsonConvert.DeserializeObject<List<string[]>>(jsonData.ToString());
               
                if (data == null)
                {
                    return BadRequest("Send appropriate data");
                }
                
                // Export to Excel
                var result = await _excelExporter.ExportAsync(data);
                return result;
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
