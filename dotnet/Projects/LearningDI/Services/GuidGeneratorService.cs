
namespace LearningDI.Services
{
    public class GuidGeneratorService : IGuidGeneratorService
    {
        private readonly Guid _id;

        public GuidGeneratorService()
        {
            _id = Guid.NewGuid();
        }

        public Guid GetGuid()
        {
            return _id;
        }
    }
}
