using Models;

namespace BusinessLogicLayer.Interfaces
{
    public interface IStatusManager
    {
        public Task<List<Status>> GetStatuses();

    }
}
