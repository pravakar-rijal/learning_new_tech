using Microsoft.AspNetCore.Mvc;

namespace ExportCsvExcel.Services
{
    public interface IExporter
    {
        public Task<FileResult> ExportAsync(List<string[]> data);
    }
}
